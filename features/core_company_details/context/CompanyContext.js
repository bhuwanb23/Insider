import React, { createContext, useContext, useState } from 'react';
import { sampleCompanyData } from '../constants/sampleData';

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [companyData, setCompanyData] = useState(sampleCompanyData);

  const updateCompanyData = (newData) => {
    setCompanyData(newData);
  };

  return (
    <CompanyContext.Provider value={{ companyData, updateCompanyData }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
} 