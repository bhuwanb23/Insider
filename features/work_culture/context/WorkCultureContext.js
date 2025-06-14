import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompanyCulture } from '../../../api/api';

const WorkCultureContext = createContext();

// Robust custom parsing function for Work Culture JSON
const robustCleanAndParseJson = (jsonString, contextName) => {
  let cleaned = jsonString;

  try {
    // Step 1: Pre-processing cleanup
    cleaned = cleaned.replace(/```json\n?|```\n?/g, ''); // Remove markdown code block indicators
    cleaned = cleaned.replace(/^\uFEFF/, ''); // Remove BOM and other invisible characters
    cleaned = cleaned.replace(/[`'"`]/g, '"'); // Normalize all quote-like characters to standard double quotes

    // Step 2: Robustly handle content within double-quoted strings:
    // Escape newlines and aggressively escape all internal double quotes.
    cleaned = cleaned.replace(/"(.*?)"/g, function(match, content) {
      content = content
        .replace(/\n/g, '\\n') // Escape newlines
        .replace(/\r/g, '\\r') // Escape carriage returns
        .replace(/\t/g, '\\t') // Escape tabs
        .replace(/\f/g, '\\f') // Escape form feeds
        .replace(/\\b/g, '') // Remove escaped word boundaries (if any)
        .replace(/\b/g, '') // Remove word boundaries (if any)
        .replace(/`/g, '') // Remove backticks within strings (if any)
        .replace(/\\(?=[^"\\])/g, '\\\\') // Escape backslashes not followed by quotes or other backslashes
        .replace(/"/g, '\"'); // Aggressively escape all internal double quotes
      return '"' + content + '"';
    });

    // Step 3: Remove template literals and their backticks
    cleaned = cleaned.replace(/`[^`]*`/g, function(match) {
      return '"' + match.slice(1, -1).replace(/"/g, '\"') + '"';
    });

    // Step 4: Remove all other newlines and carriage returns (should only be outside strings now).
    cleaned = cleaned.replace(/([^\\])(\r\n|\n|\r)/gm, '$1');

    // Step 5: Remove various non-JSON compliant elements and artifacts.
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas before } or ]
    cleaned = cleaned.replace(/"\s*\([^)]*\)\s*"/g, '"'); // Remove content in parentheses within quotes
    cleaned = cleaned.replace(/\s*\([^)]*\)\s*(,|$)/g, '$1'); // Remove content in parentheses outside quotes
    cleaned = cleaned.replace(/"{3,}/g, '"'); // Remove invalid triple quotes.
    cleaned = cleaned.replace(/,\s*,+/g, ','); // Remove double commas.
    cleaned = cleaned.replace(/\bNone\b/g, 'null'); // Replace non-JSON compliant 'None' with 'null'.
    cleaned = cleaned.replace(/\bTrue\b/g, 'true');
    cleaned = cleaned.replace(/\bFalse\b/g, 'false');
    cleaned = cleaned.replace(/\bundefined\b/g, 'null');
    cleaned = cleaned.replace(/\bNaN\b/g, 'null');
    cleaned = cleaned.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remove any invalid control characters.

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

// Flatten nested API response to expected structure (customize as needed)
function flattenWorkCultureData(apiData) {
  if (!apiData) return {};
  return {
    coreValues: apiData.cultureOverview?.coreValues,
    culturalVibe: apiData.cultureOverview?.culturalVibe,
    employeeEmpowerment: apiData.cultureOverview?.employeeEmpowerment,
    leadershipStyle: apiData.cultureOverview?.leadershipStyle,
    workLifeBalance: apiData.workLifeBalance,
    remoteWork: apiData.remoteWork,
    teamCollaboration: apiData.teamCollaboration,
    mentalHealth: apiData.mentalHealth,
    diversity: apiData.diversity,
    employeeStories: apiData.employeeStories
  };
}

export const useWorkCulture = () => {
  const context = useContext(WorkCultureContext);
  if (!context) {
    throw new Error('useWorkCulture must be used within a WorkCultureProvider');
  }
  return context;
};

export function WorkCultureProvider({ children }) {
  const [workCultureData, setWorkCultureData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateData = (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      cultureOverview: 'object',
      workLifeBalance: 'object',
      remoteWork: 'object',
      teamCollaboration: 'object',
      mentalHealth: 'object',
      diversity: 'object',
      employeeStories: 'array'
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
      console.log(`[WorkCulture] Fetching data for: ${companyName}`);
      const { raw } = await getCompanyCulture(companyName);
      
      let data = null;
      if (raw) {
        data = robustCleanAndParseJson(raw, 'WorkCulture');
        console.log(`[WorkCulture] API response parsed successfully.`);
      }

      if (!data) {
        throw new Error('No data received from server after parsing');
      }

      const flatData = flattenWorkCultureData(data);

      if (validateData(flatData)) {
        setWorkCultureData(flatData);
        console.log('[WorkCulture] Data successfully set to state and validated.');
      }
    } catch (error) {
      console.error('[WorkCulture] Error in fetchCompanyData:', error);
      setError(
        'Unable to process the response from the server. ' +
        (error.message ? `Error: ${error.message}` : '') +
        ' Please try again.'
      );
      setWorkCultureData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setWorkCultureData(null);
    setError(null);
    setLoading(false);
  };

  const setParsedWorkCultureData = (dataOrRaw) => {
    setLoading(true);
    try {
      let data = dataOrRaw;
      
      if (typeof dataOrRaw === 'string') {
        if (!dataOrRaw.trim()) {
          setWorkCultureData(null);
          setError('No data received from server');
          setLoading(false);
          return;
        }

        if (__DEV__) {
          console.log('[WorkCulture] Raw API response (from setParsedWorkCultureData):', dataOrRaw);
        }
        
        data = robustCleanAndParseJson(dataOrRaw, 'WorkCulture');
        console.log(`[WorkCulture] Raw API response parsed successfully (from setParsedWorkCultureData).`);

        if (__DEV__) {
          console.log('[WorkCulture] Parsed object (from setParsedWorkCultureData):', data);
        }
      }

      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        setWorkCultureData(null);
        setError('No data available.');
        setLoading(false);
        return;
      }

      const flatData = flattenWorkCultureData(data);

      if (validateData(flatData)) {
        setWorkCultureData(flatData);
        setError(null);
        console.log('[WorkCulture] Data successfully set to state and validated (from setParsedWorkCultureData).');
      }
    } catch (e) {
      setWorkCultureData(null);
      setError(
        'Unable to process the response from the server. ' +
        (e.message ? `Error: ${e.message}` : '') +
        ' Please try again.'
      );
      if (__DEV__) {
        console.error('[WorkCulture] Error processing data:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    workCultureData,
    loading,
    error,
    fetchCompanyData,
    setParsedCultureData: setParsedWorkCultureData,
    clearData
  };

  return (
    <WorkCultureContext.Provider value={value}>
      {children}
    </WorkCultureContext.Provider>
  );
};