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

  // Allow direct setting of parsed data
  const setParsedCompanyData = (data) => {
    setCompanyData(data);
    setError(null);
  };

  const value = {
    loading,
    error,
    companyData,
    setParsedCompanyData
  };

  return (
    <CoreCompanyDetailsContext.Provider value={value}>
      {children}
    </CoreCompanyDetailsContext.Provider>
  );
} 