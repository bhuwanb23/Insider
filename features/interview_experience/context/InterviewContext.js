import React, { createContext, useContext, useState } from 'react';
import { cleanForJsonParse, parseJsonResponse, validators } from '../../../utils/jsonParser';

const InterviewContext = createContext();

export function useInterview() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}

// Robust utility to clean non-JSON artifacts from OpenRouter response
// function cleanForJsonParse(str) {
//   let cleaned = str;
//   // Remove // comments
//   cleaned = cleaned.replace(/\/\/.*$/gm, '');
//   // Remove /* ... */ comments
//   cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
//   // Remove parenthetical notes after URLs or values (e.g., "url": "..." (Note: ...))
//   cleaned = cleaned.replace(/"\s*\([^)]*\)\s*"/g, '"');
//   cleaned = cleaned.replace(/\s*\([^)]*\)\s*(,|\n|$)/g, '$1');
//   // Remove trailing commas before closing brackets/braces
//   cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
//   // Remove newlines between JSON keys/values
//   cleaned = cleaned.replace(/(\r\n|\n|\r)/gm, '');
//   // Extract only the JSON part (from first { to last })
//   const firstBrace = cleaned.indexOf('{');
//   const lastBrace = cleaned.lastIndexOf('}');
//   if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
//     cleaned = cleaned.substring(firstBrace, lastBrace + 1);
//   } else {
//     throw new Error('No JSON object found in response');
//   }
//   return cleaned;
// }

// Validate the shape of the parsed data
function isValidInterviewExperience(obj) {
  if (!obj || typeof obj !== 'object') {
    console.error('[Interview] Invalid data: Object is null or not an object');
    return false;
  }

  const requiredFields = [
    'journey',
    'candidateExperiences',
    'technicalQuestions',
    'roleSpecificQuestions',
    'behavioralQuestions',
    'questionStats',
    'mockInterviewTips'
  ];

  const missingFields = requiredFields.filter(field => !obj[field]);
  
  if (missingFields.length > 0) {
    console.error('[Interview] Missing required fields:', missingFields);
    return false;
  }

  return true;
}

export function InterviewProvider({ children }) {
  const [interviewData, setInterviewData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const setParsedInterviewData = (dataOrRaw) => {
    setIsLoading(true);
    try {
      let data = dataOrRaw;
      
      if (typeof dataOrRaw === 'string') {
        if (!dataOrRaw.trim()) {
          throw new Error('Empty response received from server');
        }

        if (__DEV__) {
          console.log('[Interview] Raw API response:', dataOrRaw);
        }

        const cleaned = cleanForJsonParse(dataOrRaw);
        
        if (__DEV__) {
          console.log('[Interview] Cleaned for JSON parse:', cleaned);
        }

        try {
          data = JSON.parse(cleaned);
        } catch (parseError) {
          throw new Error(`JSON parse error: ${parseError.message}`);
        }

        if (__DEV__) {
          console.log('[Interview] Parsed object:', data);
        }
      }

      if (!data) {
        throw new Error('No data received from server');
      }

      if (!isValidInterviewExperience(data)) {
        throw new Error('Data received is not in the expected format');
      }

      setInterviewData(data);
      setError(null);
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
    setParsedInterviewData
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
} 