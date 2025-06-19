import React, { createContext, useContext, useState } from 'react';
import { getCoreCompanyDetailsPrompt } from '../../../api/prompts';

// Function to parse core company details from raw response
const parseCoreCompanyDetails = (rawResponse) => {
  if (!rawResponse) return null;
  // If already an object, return as is
  if (typeof rawResponse === 'object' && !Array.isArray(rawResponse)) {
    return rawResponse;
  }
  let jsonStr = rawResponse;
  // Try direct parse
  try {
    return JSON.parse(jsonStr);
  } catch (e1) {
    // Try extracting from code block
    const codeBlockMatch = typeof jsonStr === 'string' && jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      jsonStr = codeBlockMatch[1];
      try {
        return JSON.parse(jsonStr);
      } catch (e2) {
        // Try minimal cleaning
        try {
          jsonStr = jsonStr
            .replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, ' ')
            .replace(/,([\s*[}\]])/g, '$1');
          // Fix: quote numbers with commas or dashes that are not already quoted
          jsonStr = jsonStr.replace(/(:\s*)(-?\d[\d,\-]*\d)(?=\s*[,}\]])/g, (match, p1, p2) => {
            // If p2 contains a comma or dash, quote it
            if (p2.match(/[,-]/)) {
              return `${p1}"${p2}"`;
            }
            return match;
          });
          return JSON.parse(jsonStr);
        } catch (e3) {
          console.error('All parse attempts failed:', e1, e2, e3);
          return null;
        }
      }
    } else {
      // Try minimal cleaning on original string
      try {
        jsonStr = jsonStr
          .replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, ' ')
          .replace(/,([\s*[}\]])/g, '$1');
        // Fix: quote numbers with commas or dashes that are not already quoted
        jsonStr = jsonStr.replace(/(:\s*)(-?\d[\d,\-]*\d)(?=\s*[,}\]])/g, (match, p1, p2) => {
          if (p2.match(/[,-]/)) {
            return `${p1}"${p2}"`;
          }
          return match;
        });
        return JSON.parse(jsonStr);
      } catch (e4) {
        console.error('All parse attempts failed:', e1, e4);
        return null;
      }
    }
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