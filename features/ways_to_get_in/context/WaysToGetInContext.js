import React, { createContext, useContext, useState } from 'react';
import { getCompanyWaysToGetIn } from '../../../api/api';

const WaysToGetInContext = createContext();

// Robust custom parsing function for Ways To Get In JSON
const robustCleanAndParseJson = (jsonString, contextName) => {
  let cleaned = jsonString;

  try {
    // Step 1: Basic Pre-processing cleanup
    cleaned = cleaned.replace(/```json\n?|```\n?/g, ''); // Remove markdown code block indicators
    cleaned = cleaned.replace(/^﻿/, ''); // Remove BOM and other invisible characters
    cleaned = cleaned.trim(); // Trim whitespace

    // Step 2: Replace non-JSON compliant values (from previous fix)
    cleaned = cleaned.replace(/None/g, 'null');
    cleaned = cleaned.replace(/True/g, 'true');
    cleaned = cleaned.replace(/False/g, 'false');
    cleaned = cleaned.replace(/undefined/g, 'null');
    cleaned = cleaned.replace(/\bNaN\b/g, 'null');

    // Step 3: Handle improperly escaped double quotes within string values.
    // Temporarily replace already escaped double quotes so they are not affected by the next regex.
    const tempEscapedQuote = '__ESCAPED_QUOTE__';
    cleaned = cleaned.replace(/\\"/g, tempEscapedQuote);

    // Now, escape any unescaped double quotes that are inside string values.
    // This regex looks for a double quote not preceded by a backslash.
    cleaned = cleaned.replace(/(?<!\\)\"/g, '\\"');

    // Restore the temporarily replaced escaped double quotes.
    cleaned = cleaned.replace(new RegExp(tempEscapedQuote, 'g'), '\\"');

    // Step 4: Ensure numeric-like strings with special characters (like %) are treated as strings.
    // This regex looks for unquoted numbers or percentages that are part of a JSON value.
    cleaned = cleaned.replace(/([:,\[\{]\s*)([-+]?\d+\.?\d*%?)([,\]\}"\s])/g, (match, p1, p2, p3) => {
      // Check if the matched value is a number with a percentage or a standalone hyphen/plus
      // and is not already enclosed in quotes.
      if ((p2.includes('%') || (p2.startsWith('-') && p2.length > 1 && isNaN(p2))) && !p2.startsWith('"')) {
        return `${p1}"${p2}"${p3}`;
      }
      return match;
    });

    // Step 5: Remove extra commas, invalid characters.
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas
    cleaned = cleaned.replace(/[`'"`]/g, '"'); // Normalize all quote-like characters to standard double quotes
    cleaned = cleaned.replace(/[\\u0000-\\u001F\\u007F-\\u009F]/g, ''); // Remove control characters

    if (__DEV__) {
      console.log(`[${contextName}] Cleaned for JSON parse:`, cleaned);
    }

    const parsedData = JSON.parse(cleaned);
    return parsedData;

  } catch (parseError) {
    console.error(`Failed to parse ${contextName} API response as JSON:`, parseError);
    console.error('Cleaned response content error:', cleaned);
    throw new Error(`Failed to parse response for ${contextName}: ${parseError.message}`);
  }
};

export const useWaysToGetIn = () => {
  const context = useContext(WaysToGetInContext);
  if (!context) {
    throw new Error('useWaysToGetIn must be used within a WaysToGetInProvider');
  }
  return context;
};

export const WaysToGetInProvider = ({ children }) => {
  const [waysData, setWaysData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateData = (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      campusRecruitment: 'object',
      jobPortals: 'object'
    };

    const optionalFields = {
      referrals: 'object',
      hackathons: 'object',
      coldOutreach: 'object',
      internshipConversion: 'object',
      contractRoles: 'object'
    };

    // Validate required fields
    Object.entries(requiredFields).forEach(([field, expectedType]) => {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }

      const types = Array.isArray(expectedType) ? expectedType : [expectedType];
      const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
      if (!types.includes(valueType)) {
        throw new Error(`Invalid type for ${field}: expected ${types.join(' or ')}, got ${valueType}`);
      }
    });

    // Validate optional fields if present
    Object.entries(optionalFields).forEach(([field, expectedType]) => {
      if (field in data) {
        const types = Array.isArray(expectedType) ? expectedType : [expectedType];
        const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
        if (!types.includes(valueType)) {
          throw new Error(`Invalid type for optional field ${field}: expected ${types.join(' or ')}, got ${valueType}`);
        }
      }
    });

    // Validate campusRecruitment structure
    const campusFields = ['title', 'description', 'icon', 'badge', 'details', 'tips'];
    campusFields.forEach(field => {
      if (!(data.campusRecruitment && field in data.campusRecruitment)) {
        throw new Error(`Missing required field in campusRecruitment: ${field}`);
      }
    });

    // Validate jobPortals structure
    const jobPortalFields = ['title', 'description', 'icon', 'platforms', 'tips'];
    jobPortalFields.forEach(field => {
      if (!(data.jobPortals && field in data.jobPortals)) {
        throw new Error(`Missing required field in jobPortals: ${field}`);
      }
    });

    return true;
  };

  const fetchCompanyData = async (companyName) => {
    if (!companyName?.trim()) {
      setError('Company name is required');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log(`[WaysToGetIn] Fetching data for: ${companyName}`);
      // getCompanyWaysToGetIn now returns raw data for Ways to Get In
      const { raw } = await getCompanyWaysToGetIn(companyName);
      
      let data = null;
      if (raw) {
        data = robustCleanAndParseJson(raw, 'WaysToGetIn');
        console.log(`[WaysToGetIn] API response parsed successfully.`);
      }

      if (!data) {
        throw new Error('No data received from server after parsing');
      }

      // Validate the data structure
      if (validateData(data)) {
        setWaysData(data);
        console.log('[WaysToGetIn] Data successfully set to state and validated.');
      }
    } catch (error) {
      console.error('[WaysToGetIn] Error in fetchCompanyData:', error);
      setError(
        'Unable to process the response from the server. ' +
        (error.message ? `Error: ${error.message}` : '') +
        ' Please try again.'
      );
      setWaysData(null);
    } finally {
      setLoading(false);
    }
  };

  // Allow direct setting of parsed data
  const setParsedWaysData = (dataOrRaw) => {
    setLoading(true);
    try {
      let data = dataOrRaw;
      
      if (typeof dataOrRaw === 'string') {
        if (!dataOrRaw.trim()) {
          setWaysData(null);
          setError('No data received from server');
          setLoading(false);
          return;
        }

        if (__DEV__) {
          console.log('[WaysToGetIn] Raw API response:', dataOrRaw);
        }

        data = robustCleanAndParseJson(dataOrRaw, 'WaysToGetIn');
        console.log(`[WaysToGetIn] Raw API response parsed successfully (from setParsedWaysData).`);

        if (__DEV__) {
          console.log('[WaysToGetIn] Parsed object:', data);
        }
      }

      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        setWaysData(null);
        setError('No data available.');
        setLoading(false);
        return;
      }

      if (!validateData(data)) {
        throw new Error('Data received is not in the expected format or missing required fields.');
      }

      setWaysData(data);
        setError(null);
      console.log('[WaysToGetIn] Data successfully set to state and validated (from setParsedWaysData).');
    } catch (e) {
      setWaysData(null);
      setError(
        'Unable to process the response from the server. ' +
        (e.message ? `Error: ${e.message}` : '') +
        ' Please try again or contact support.'
      );
      if (__DEV__) {
        console.error('[WaysToGetIn] Error processing data:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear data function
  const clearData = () => {
    setWaysData(null);
    setError(null);
    setLoading(false);
  };

  const value = {
        waysData,
        loading,
        error,
    fetchCompanyData,
        setParsedWaysData,
    clearData,
  };

  return (
    <WaysToGetInContext.Provider value={value}>
      {children}
    </WaysToGetInContext.Provider>
  );
}; 