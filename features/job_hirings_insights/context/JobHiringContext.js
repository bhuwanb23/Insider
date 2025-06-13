import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompanyJobHiringInsights } from '../../../api/api';

const JobHiringContext = createContext();

// Robust custom parsing function for Job Hiring Insights JSON
const robustCleanAndParseJson = (jsonString, contextName) => {
  let cleaned = jsonString;

  try {
    // Step 1: Basic Pre-processing cleanup
    cleaned = cleaned.replace(/```json\n?|```\n?/g, ''); // Remove markdown code block indicators
    cleaned = cleaned.replace(/^\uFEFF/, ''); // Remove BOM and other invisible characters
    cleaned = cleaned.trim(); // Trim whitespace

    // Step 2: Replace non-JSON compliant values (from previous fix)
    cleaned = cleaned.replace(/\bNone\b/g, 'null');
    cleaned = cleaned.replace(/\bTrue\b/g, 'true');
    cleaned = cleaned.replace(/\bFalse\b/g, 'false');
    cleaned = cleaned.replace(/\bundefined\b/g, 'null');
    cleaned = cleaned.replace(/\bNaN\b/g, 'null');

    // Step 3: Handle improperly escaped double quotes within string values.
    // Temporarily replace already escaped double quotes so they are not affected by the next regex.
    const tempEscapedQuote = '__ESCAPED_QUOTE__';
    cleaned = cleaned.replace(/\\"/g, tempEscapedQuote);

    // Now, escape any unescaped double quotes that are inside string values.
    // This regex looks for a double quote not preceded by a backslash.
    cleaned = cleaned.replace(/(?<!\\)"/g, '\"');

    // Restore the temporarily replaced escaped double quotes.
    cleaned = cleaned.replace(new RegExp(tempEscapedQuote, 'g'), '\"');

    // Step 4: Ensure numeric-like strings with special characters (like %) are treated as strings.
    // This regex looks for unquoted numbers or percentages that are part of a JSON value.
    cleaned = cleaned.replace(/([:\[{,]\s*)([-+]?\d+\.?\d*%?)([,\]}])/g, (match, p1, p2, p3) => {
      // Check if the matched value is a number with a percentage or a standalone hyphen/plus
      // and is not already enclosed in quotes.
      if ((p2.includes('%') || (p2.startsWith('-') && p2.length > 1 && isNaN(p2))) && !p2.startsWith('\"')) {
        return `${p1}"${p2}"${p3}`;
      }
      return match;
    });

    // Step 5: Remove extra commas, invalid characters.
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas
    cleaned = cleaned.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remove control characters

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

// Optionally flatten or map the API data if needed (customize as required)
function flattenJobHiringData(apiData) {
  if (!apiData) return {};
  return apiData; // If you need to map/flatten, do it here
}

export function useJobHiring() {
  const context = useContext(JobHiringContext);
  if (!context) {
    throw new Error('useJobHiring must be used within a JobHiringProvider');
  }
  return context;
}

export function JobHiringProvider({ children }) {
  const [jobHiringData, setJobHiringData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateData = (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      commonRoles: 'array',
      internshipConversion: 'object',
      hiringChannels: 'array',
      jobTrends: 'object',
      hiringTimeline: 'object',
      hiringProcess: 'object',
      resumeTips: 'array'
    };

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
      console.log(`[JobHiring] Fetching data for: ${companyName}`);
      const { raw } = await getCompanyJobHiringInsights(companyName);
      
      let data = null;
      if (raw) {
        data = robustCleanAndParseJson(raw, 'JobHiring');
        console.log(`[JobHiring] API response parsed successfully.`);
      }

      if (!data) {
        throw new Error('No data received from server after parsing');
      }

      const flatData = flattenJobHiringData(data);

      if (validateData(flatData)) {
        setJobHiringData(flatData);
        console.log('[JobHiring] Data successfully set to state and validated.');
      }
    } catch (error) {
      console.error('[JobHiring] Error in fetchCompanyData:', error);
      setError(
        'Unable to process the response from the server. ' +
        (error.message ? `Error: ${error.message}` : '') +
        ' Please try again.'
      );
      setJobHiringData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setJobHiringData(null);
    setError(null);
    setLoading(false);
  };

  const setParsedJobHiringData = (dataOrRaw) => {
    setLoading(true);
    try {
      let data = dataOrRaw;
      
      if (typeof dataOrRaw === 'string') {
        if (!dataOrRaw.trim()) {
          setJobHiringData(null);
          setError('No data received from server');
          setLoading(false);
          return;
        }

        if (__DEV__) {
          console.log('[JobHiring] Raw API response (from setParsedJobHiringData):', dataOrRaw);
        }
        
        data = robustCleanAndParseJson(dataOrRaw, 'JobHiring');
        console.log(`[JobHiring] Raw API response parsed successfully (from setParsedJobHiringData).`);

        if (__DEV__) {
          console.log('[JobHiring] Parsed object (from setParsedJobHiringData):', data);
        }
      }

      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        setJobHiringData(null);
        setError('No data available.');
        setLoading(false);
        return;
      }

      const flatData = flattenJobHiringData(data);

      if (validateData(flatData)) {
        setJobHiringData(flatData);
        setError(null);
        console.log('[JobHiring] Data successfully set to state and validated (from setParsedJobHiringData).');
      }
    } catch (e) {
      setJobHiringData(null);
      setError(
        'Unable to process the response from the server. ' +
        (e.message ? `Error: ${e.message}` : '') +
        ' Please try again.'
      );
      if (__DEV__) {
        console.error('[JobHiring] Error processing data:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobHiringContext.Provider 
      value={{
        jobHiringData,
        loading,
        error,
        fetchCompanyData,
        setParsedJobHiringData,
        clearData
      }}
    >
      {children}
    </JobHiringContext.Provider>
  );
} 