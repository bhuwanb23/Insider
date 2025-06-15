import React, { createContext, useContext, useState } from 'react';
import { getCoreCompanyDetailsPrompt } from '../../../api/prompts';

// Function to parse core company details from raw response
const parseCoreCompanyDetails = (rawResponse) => {
  if (!rawResponse) return null;
  
  try {
    // If response is already parsed
    if (typeof rawResponse === 'object' && !Array.isArray(rawResponse)) {
      return rawResponse;
    }

    // If response is a string, try to extract JSON
    let jsonStr = rawResponse;
    if (typeof rawResponse === 'string') {
      // Remove triple backticks if present
      const match = rawResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (match && match[1]) {
        jsonStr = match[1];
      }
      // Remove any leading/trailing whitespace
      jsonStr = jsonStr.trim();
      // Remove bad control characters (e.g., tabs)
      jsonStr = jsonStr.replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, ' ');
      // Fix common unterminated quote in URLs (e.g., ...azure/)") to ...azure/")")
      jsonStr = jsonStr.replace(/(https?:[^"\s]+)\)/g, '$1")');
      // Remove leading/trailing quotes if present
      if ((jsonStr.startsWith('"') && jsonStr.endsWith('"')) ||
          (jsonStr.startsWith("'") && jsonStr.endsWith("'"))) {
        jsonStr = jsonStr.slice(1, -1);
      }
    }

    // Parse the JSON string
    const parsedData = JSON.parse(jsonStr);
    console.log('Successfully parsed core company details');
    return parsedData;
  } catch (err) {
    console.error('Error parsing core company details:', err, rawResponse);
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
  console.log('[CoreCompanyDetailsProvider] received parsedData:', parsedData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState(parsedData || null);

  const clearData = () => {
    console.log('Clearing core company details data');
    setCompanyData(null);
    setError(null);
  };

  // fetchCompanyData can be used to update companyData if needed, but no parsing here
  const fetchCompanyData = async (companyName, newParsedData = null) => {
    if (!companyName) return;
    setLoading(true);
    setError(null);
    try {
      if (newParsedData) {
        setCompanyData(newParsedData);
      } else {
        setError('No data provided');
      }
    } catch (err) {
      setError(err.message || 'Failed to process company details');
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