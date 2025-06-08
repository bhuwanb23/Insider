import React, { createContext, useContext, useState, useEffect } from 'react';
import { cleanForJsonParse } from '../../../utils/jsonParser';

const JobHiringContext = createContext();

// Optionally flatten or map the API data if needed (customize as required)
function flattenJobHiringData(apiData) {
  if (!apiData) return {};
  return apiData; // If you need to map/flatten, do it here
}

export function useJobHiring() {
  const context = useContext(JobHiringContext);
  if (!context) {
    throw new Error('useJobHiring must be used within a JobHiringProvider');
  }
  return context;
}

export function JobHiringProvider({ children, apiResponse }) {
  const [jobHiringData, setJobHiringData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiResponse) {
      setJobHiringData(null);
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
      const flatData = flattenJobHiringData(data);
      if (!flatData || (typeof flatData === 'object' && Object.keys(flatData).length === 0)) {
        setJobHiringData(null);
        setError('No data available.');
      } else {
        setJobHiringData(flatData);
        setError(null);
      }
    } catch (e) {
      setJobHiringData(null);
      setError('Unable to process the response from the server. ' + (e.message ? `Error: ${e.message}` : '') + ' Please try again.');
    } finally {
      setLoading(false);
    }
  }, [apiResponse]);

  const value = {
    jobHiringData,
    loading,
    error
  };

  return (
    <JobHiringContext.Provider value={value}>
      {children}
    </JobHiringContext.Provider>
  );
} 