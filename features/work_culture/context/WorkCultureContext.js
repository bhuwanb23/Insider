import React, { createContext, useContext } from 'react';
import { workCultureData } from '../data/workCultureData';

const WorkCultureContext = createContext();

export function WorkCultureProvider({ children }) {
  return (
    <WorkCultureContext.Provider value={workCultureData}>
      {children}
    </WorkCultureContext.Provider>
  );
}

export function useWorkCulture() {
  const context = useContext(WorkCultureContext);
  if (!context) {
    throw new Error('useWorkCulture must be used within a WorkCultureProvider');
  }
  return context;
} 