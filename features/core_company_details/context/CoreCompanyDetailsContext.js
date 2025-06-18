import React, { createContext, useContext, useState } from 'react';
import { getCoreCompanyDetailsPrompt } from '../../../api/prompts';

// Function to parse core company details from raw response
const parseCoreCompanyDetails = (rawResponse) => {
  if (!rawResponse) return null;
  
  try {
    // If response is already a parsed object
    if (typeof rawResponse === 'object' && !Array.isArray(rawResponse)) {
      return rawResponse;
    }

    // If response is a string, try to parse it
    let jsonStr = rawResponse;
    if (typeof rawResponse === 'string') {
      // First try to extract JSON from markdown code blocks
      const codeBlockMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        jsonStr = codeBlockMatch[1];
      }

      // First attempt: Try parsing as is
      try {
        const parsedData = JSON.parse(jsonStr);
        console.log('Successfully parsed core company details on first attempt');
        return parsedData;
      } catch (firstError) {
        console.error('First parse attempt failed:', firstError);
        
        // Second attempt: Basic cleaning
        try {
          jsonStr = jsonStr
            .trim()
            // Remove bad control characters
            .replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, ' ')
            // Fix common JSON formatting issues
            .replace(/,(\s*[}\]])/g, '$1')
            // Fix unescaped quotes in URLs
            .replace(/(https?:\/\/[^"'\s]+)"/g, '$1\\"')
            // Remove any trailing commas before closing brackets
            .replace(/,(\s*[}\]])/g, '$1');

          const parsedData = JSON.parse(jsonStr);
          console.log('Successfully parsed core company details after basic cleaning');
          return parsedData;
        } catch (secondError) {
          console.error('Second parse attempt failed:', secondError);
          
          // Third attempt: Aggressive cleaning
          try {
            jsonStr = jsonStr
              // Remove any invalid image URLs
              .replace(/"image":\s*"[^"]*?(?:signdate|indic|p_key)[^"]*"/g, '"image": ""')
              // Fix unescaped quotes
              .replace(/(?<!\\)"/g, '\\"')
              .replace(/\\\\"/g, '\\"')
              // Remove any non-printable characters
              .replace(/[^\x20-\x7E]/g, '')
              // Fix any remaining common JSON syntax issues
              .replace(/,\s*([\]}])/g, '$1')
              .replace(/([{[]\s*),/g, '$1');

            const parsedData = JSON.parse(jsonStr);
            console.log('Successfully parsed core company details after aggressive cleaning');
            return parsedData;
          } catch (finalError) {
            console.error('Final parse attempt failed:', finalError);
            console.error('Raw response:', rawResponse);
            throw finalError;
          }
        }
      }
    }

    return null;
  } catch (err) {
    console.error('Error parsing core company details:', err);
    console.error('Warning: Raw response:', rawResponse);
    return null;
  }
};

const CoreCompanyDetailsContext = createContext();

export function useCoreCompanyDetails() {
  const context = useContext(CoreCompanyDetailsContext);
  if (!context) {
    throw new Error('useCoreCompanyDetails must be used within a CoreCompanyDetailsProvider');
  }
  return context;
}

export function CoreCompanyDetailsProvider({ children, parsedData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  // Try to parse the data when it's provided
  React.useEffect(() => {
    if (parsedData) {
      const parsed = parseCoreCompanyDetails(parsedData);
      if (parsed) {
        setCompanyData(parsed);
        setError(null);
      } else {
        setError('Failed to parse company data');
      }
    }
  }, [parsedData]);

  const clearData = () => {
    console.log('Clearing core company details data');
    setCompanyData(null);
    setError(null);
  };

  const fetchCompanyData = async (companyName, rawData = null) => {
    if (!companyName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (rawData) {
        const parsed = parseCoreCompanyDetails(rawData);
        if (parsed) {
          setCompanyData(parsed);
        } else {
          throw new Error('Failed to parse company data');
        }
      } else {
        setError('No data provided');
      }
    } catch (err) {
      setError(err.message || 'Failed to process company details');
      setCompanyData(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    companyData,
    fetchCompanyData,
    clearData,
  };

  return (
    <CoreCompanyDetailsContext.Provider value={value}>
      {children}
    </CoreCompanyDetailsContext.Provider>
  );
}