import React, { createContext, useContext } from 'react';
import { interviewData } from '../constants/sampleData';

const InterviewContext = createContext();

export function useInterview() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}

export function InterviewProvider({ children }) {
  const value = {
    interviewData
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
} 