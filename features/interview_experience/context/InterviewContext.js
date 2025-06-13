import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompanyInterviewExperience } from '../../../api/api';

const InterviewContext = createContext();

export function useInterview() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}

// Robust custom parsing function for Interview Experience JSON
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

// Validate the shape of the parsed data
function isValidInterviewExperience(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid data: Expected a non-null object');
  }

  const requiredFields = {
    journey: 'object',
    candidateExperiences: 'array',
    technicalQuestions: 'array',
    roleSpecificQuestions: 'array',
    behavioralQuestions: 'array',
    questionStats: 'object',
    mockInterviewTips: ['array', 'object']
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
}

// Optionally flatten or map the API data if needed (customize as required)
function flattenInterviewData(apiData) {
  if (!apiData) return {};
  return apiData; // If you need to map/flatten, do it here
}

export function InterviewProvider({ children }) {
  const [interviewData, setInterviewData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanyData = async (companyName) => {
    if (!companyName?.trim()) {
      setError('Company name is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`[Interview] Fetching data for: ${companyName}`);
      const { raw } = await getCompanyInterviewExperience(companyName);
      
      let data = null;
      if (raw) {
        data = robustCleanAndParseJson(raw, 'InterviewExperience');
        console.log(`[Interview] API response parsed successfully.`);
      }

      if (!data) {
        throw new Error('No data received from server after parsing');
      }

      const flatData = flattenInterviewData(data);

      if (isValidInterviewExperience(flatData)) {
        setInterviewData(flatData);
        console.log('[Interview] Data successfully set to state and validated.');
      }
    } catch (error) {
      console.error('[Interview] Error in fetchCompanyData:', error);
      setError(
        'Unable to process the response from the server. ' +
        (error.message ? `Error: ${error.message}` : '') +
        ' Please try again.'
      );
      setInterviewData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setInterviewData(null);
    setError(null);
    setIsLoading(false);
  };

  const setParsedInterviewData = (dataOrRaw) => {
    setIsLoading(true);
    try {
      let data = dataOrRaw;
      
      if (typeof dataOrRaw === 'string') {
        if (!dataOrRaw.trim()) {
          setInterviewData(null);
          setError('No data received from server');
          setIsLoading(false);
          return;
        }

        if (__DEV__) {
          console.log('[Interview] Raw API response (from setParsedInterviewData):', dataOrRaw);
        }
        
        data = robustCleanAndParseJson(dataOrRaw, 'InterviewExperience');
        console.log(`[Interview] Raw API response parsed successfully (from setParsedInterviewData).`);

        if (__DEV__) {
          console.log('[Interview] Parsed object (from setParsedInterviewData):', data);
        }
      }

      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        setInterviewData(null);
        setError('No data available.');
        setIsLoading(false);
        return;
      }

      const flatData = flattenInterviewData(data);

      if (isValidInterviewExperience(flatData)) {
        setInterviewData(flatData);
        setError(null);
        console.log('[Interview] Data successfully set to state and validated (from setParsedInterviewData).');
      }
    } catch (e) {
      setInterviewData(null);
      setError(
        'Unable to process the response from the server. ' +
        (e.message ? `Error: ${e.message}` : '') +
        ' Please try again or contact support.'
      );
      if (__DEV__) {
        console.error('[Interview] Error processing data:', e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    interviewData,
    error,
    isLoading,
    fetchCompanyData,
    setParsedInterviewData,
    clearData
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
} 