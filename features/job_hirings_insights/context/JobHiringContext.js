import React, { createContext, useContext, useState } from 'react';

const JobHiringContext = createContext();

export function useJobHiring() {
  const context = useContext(JobHiringContext);
  if (!context) {
    throw new Error('useJobHiring must be used within a JobHiringProvider');
  }
  return context;
}

function parseJobHiringData(rawData) {
  try {
    if (!rawData?.jobHiringData?.raw) {
      throw new Error('No job hiring data available');
    }
    const content = rawData.jobHiringData.raw;
    if (typeof content === 'object' && content !== null) {
      return content;
    }
    // Extract JSON from between triple backticks if present
    const match = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    let jsonStr = match ? match[1] : content;
    jsonStr = jsonStr.trim();
    if ((jsonStr.startsWith('"') && jsonStr.endsWith('"')) ||
        (jsonStr.startsWith("'") && jsonStr.endsWith("'"))) {
      jsonStr = jsonStr.slice(1, -1);
    }
    // Try to parse the JSON string
    const parsedData = JSON.parse(jsonStr);
    console.log('Successfully parsed job hiring data');
    return parsedData;
  } catch (error) {
    console.error('Error parsing job hiring data:', error, rawData);
    throw new Error('Failed to parse job hiring data');
  }
}

export function JobHiringProvider({ children, rawData }) {
  console.log('[JobHiringProvider] received rawData:', rawData);
  const [jobHiringData, setJobHiringData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (rawData) {
      try {
        console.log('[JobHiringProvider] rawData to parse:', rawData.jobHiringData?.raw);
        const parsedData = parseJobHiringData(rawData);
        console.log('[JobHiringProvider] parsed jobHiringData:', parsedData);
        setJobHiringData(parsedData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('[JobHiringProvider] Error parsing job hiring data:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [rawData]);

  const updateJobHiringData = React.useCallback((newRawData) => {
    try {
      const parsedData = parseJobHiringData(newRawData);
      setJobHiringData(parsedData);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const value = {
    jobHiringData,
    loading,
    error,
    updateJobHiringData
  };

  return (
    <JobHiringContext.Provider value={value}>
      {children}
    </JobHiringContext.Provider>
  );
}