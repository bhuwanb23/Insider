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
    // Extract JSON from between triple backticks if present
    const jsonMatch = content.match(/```(.*?)```/s);
    const jsonStr = jsonMatch ? jsonMatch[1] : content;

    // Try to parse the JSON string
    const parsedData = JSON.parse(jsonStr);
    console.log('Successfully parsed job hiring data');
    return parsedData;
  } catch (error) {
    console.error('Error parsing job hiring data:', error);
    throw new Error('Failed to parse job hiring data');
  }
}

export function JobHiringProvider({ children, rawData }) {
  const [jobHiringData, setJobHiringData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (rawData) {
      try {
        const parsedData = parseJobHiringData(rawData);
        setJobHiringData(parsedData);
        setError(null);
      } catch (err) {
        setError(err.message);
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