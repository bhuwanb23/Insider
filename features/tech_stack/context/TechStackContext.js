import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompanyTechStack } from '../../../api/api';

const TechStackContext = createContext();

// Robust custom parsing function for Tech Stack JSON
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

function flattenTechStackData(apiData) {
  if (!apiData) return {};
  return apiData;
}

export function TechStackProvider({ children }) {
  const [techStack, setTechStack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateData = (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data: Expected a non-null object');
    }

    const requiredFields = {
      frontend: 'object',
      backend: 'object',
      cloud: 'object',
      database: 'object',
      analytics: 'object',
      team: ['array', 'object']
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
      console.log(`[TechStack] Fetching data for: ${companyName}`);
      const { raw } = await getCompanyTechStack(companyName);
      
      let data = null;
      if (raw) {
        data = robustCleanAndParseJson(raw, 'TechStack');
        console.log(`[TechStack] API response parsed successfully.`);
      }

      if (!data) {
        throw new Error('No data received from server after parsing');
      }

      const flatData = flattenTechStackData(data);

      if (validateData(flatData)) {
        setTechStack(flatData);
        console.log('[TechStack] Data successfully set to state and validated.');
      }
    } catch (error) {
      console.error('[TechStack] Error in fetchCompanyData:', error);
      setError(
        'Unable to process the response from the server. ' +
        (error.message ? `Error: ${error.message}` : '') +
        ' Please try again.'
      );
      setTechStack(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setTechStack(null);
    setError(null);
    setLoading(false);
  };

  const setParsedTechStackData = (dataOrRaw) => {
    setLoading(true);
    try {
      let data = dataOrRaw;
      
      if (typeof dataOrRaw === 'string') {
        if (!dataOrRaw.trim()) {
          setTechStack(null);
          setError('No data received from server');
          setLoading(false);
          return;
        }

        if (__DEV__) {
          console.log('[TechStack] Raw API response (from setParsedTechStackData):', dataOrRaw);
        }
        
        data = robustCleanAndParseJson(dataOrRaw, 'TechStack');
        console.log(`[TechStack] Raw API response parsed successfully (from setParsedTechStackData).`);

        if (__DEV__) {
          console.log('[TechStack] Parsed object (from setParsedTechStackData):', data);
        }
      }

      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        setTechStack(null);
        setError('No data available.');
        setLoading(false);
        return;
      }

      const flatData = flattenTechStackData(data);

      if (validateData(flatData)) {
        setTechStack(flatData);
        setError(null);
        console.log('[TechStack] Data successfully set to state and validated (from setParsedTechStackData).');
      }
    } catch (e) {
      setTechStack(null);
      setError(
        'Unable to process the response from the server. ' +
        (e.message ? `Error: ${e.message}` : '') +
        ' Please try again.'
      );
      if (__DEV__) {
        console.error('[TechStack] Error processing data:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const value = {
    techStack,
    selectedCategory,
    setSelectedCategory,
    loading,
    error,
    fetchCompanyData,
    setParsedTechStackData,
    clearData
  };

  return (
    <TechStackContext.Provider value={value}>
      {children}
    </TechStackContext.Provider>
  );
}

export function useTechStack() {
  const context = useContext(TechStackContext);
  if (!context) {
    throw new Error('useTechStack must be used within a TechStackProvider');
  }
  return context;
} 