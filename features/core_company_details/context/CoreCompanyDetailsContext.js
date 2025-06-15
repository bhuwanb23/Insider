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
      // Try to extract JSON from triple backticks if present
      const match = rawResponse.match(/```([\s\S]*?)```/);
      if (match && match[1]) {
        jsonStr = match[1];
      }
    }

    // Parse the JSON string
    const parsedData = JSON.parse(jsonStr);
    console.log('Successfully parsed core company details');
    return parsedData;
  } catch (err) {
    console.error('Error parsing core company details:', err);
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

export function CoreCompanyDetailsProvider({ children, rawData }) {
  console.log('[CoreCompanyDetailsProvider] received rawData:', rawData);
  console.log('[CoreCompanyDetailsProvider] coreData:', rawData?.coreData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const clearData = () => {
    console.log('Clearing core company details data');
    setCompanyData(null);
    setError(null);
  };

  const fetchCompanyData = async (companyName, apiResponse = null) => {
    if (!companyName) return;

    console.log('[CoreCompanyDetailsProvider] Setting core company details for:', companyName);
    setLoading(true);
    setError(null);

    try {
      if (apiResponse) {
        console.log('[CoreCompanyDetailsProvider] Processing API response for:', companyName, apiResponse);
        const rawData = apiResponse.raw || apiResponse;
        console.log('[CoreCompanyDetailsProvider] rawData to parse:', rawData);
        const parsedData = parseCoreCompanyDetails(rawData);
        console.log('[CoreCompanyDetailsProvider] parsedData:', parsedData);
        if (parsedData) {
          setCompanyData(parsedData);
          console.log('[CoreCompanyDetailsProvider] set companyData:', parsedData);
        } else {
          throw new Error('Failed to parse company details');
        }
      } else {
        console.error('[CoreCompanyDetailsProvider] No API response provided');
        setError('Failed to fetch company details');
      }
    } catch (err) {
      console.error('[CoreCompanyDetailsProvider] Error processing company details:', err);
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