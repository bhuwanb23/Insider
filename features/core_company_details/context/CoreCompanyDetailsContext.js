import React, { createContext, useContext, useState } from 'react';
import { getCoreCompanyDetailsPrompt } from '../../../api/prompts';

const CoreCompanyDetailsContext = createContext();

export function useCoreCompanyDetails() {
  const context = useContext(CoreCompanyDetailsContext);
  if (!context) {
    throw new Error('useCoreCompanyDetails must be used within a CoreCompanyDetailsProvider');
  }
  return context;
}

export function CoreCompanyDetailsProvider({ children }) {
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

    console.log('Setting core company details for:', companyName);
    setLoading(true);
    setError(null);

    try {
      if (apiResponse) {
        console.log('Using provided API response:', apiResponse);
        setCompanyData(apiResponse);
      } else {
        console.error('No API response provided');
        setError('Failed to fetch company details');
      }
    } catch (err) {
      console.error('Error setting company details:', err);
      setError(err.message || 'Failed to fetch company details');
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