import React, { createContext, useContext, useState, useEffect } from 'react';
import { cleanForJsonParse } from '../../../utils/jsonParser';

const TechStackContext = createContext();

function flattenTechStackData(apiData) {
  if (!apiData) return {};
  return apiData;
}

export function TechStackProvider({ children, apiResponse }) {
  const [techStack, setTechStack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiResponse) {
      setTechStack(null);
      setError('No data available.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      let data = apiResponse;
      if (typeof apiResponse === 'string') {
        const cleaned = cleanForJsonParse(apiResponse);
        data = JSON.parse(cleaned);
      }
      const flatData = flattenTechStackData(data);
      if (!flatData || (typeof flatData === 'object' && Object.keys(flatData).length === 0)) {
        setTechStack(null);
        setError('No data available.');
      } else {
        setTechStack(flatData);
        setError(null);
      }
    } catch (e) {
      setTechStack(null);
      setError('Unable to process the response from the server. ' + (e.message ? `Error: ${e.message}` : '') + ' Please try again.');
    } finally {
      setLoading(false);
    }
  }, [apiResponse]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const value = {
    techStack,
    selectedCategory,
    setSelectedCategory,
    loading,
    error
  };

  return (
    <TechStackContext.Provider value={value}>
      {children}
    </TechStackContext.Provider>
  );
}

export function useTechStack() {
  const context = useContext(TechStackContext);
  if (!context) {
    throw new Error('useTechStack must be used within a TechStackProvider');
  }
  return context;
} 