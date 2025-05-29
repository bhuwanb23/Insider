import React, { createContext, useContext } from 'react';
import { jobHiringData } from '../constants/sampleData';

const JobHiringContext = createContext();

export function useJobHiring() {
  const context = useContext(JobHiringContext);
  if (!context) {
    throw new Error('useJobHiring must be used within a JobHiringProvider');
  }
  return context;
}

export function JobHiringProvider({ children }) {
  const value = {
    jobHiringData
  };

  return (
    <JobHiringContext.Provider value={value}>
      {children}
    </JobHiringContext.Provider>
  );
} 