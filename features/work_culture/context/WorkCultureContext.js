import React, { createContext, useContext, useState } from 'react';

const WorkCultureContext = createContext();

export function WorkCultureProvider({ children, rawData }) {
  console.log('[WorkCultureProvider] received rawData:', rawData);
  const [workCultureData, setWorkCultureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse the raw API response data
  const parseWorkCultureData = (content) => {
    try {
      // Extract JSON from between triple backticks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[1];
        const parsedData = JSON.parse(jsonStr);
        console.log('Successfully parsed work culture data');
        setWorkCultureData(parsedData);
        return parsedData;
      }
      console.log('No JSON content found in the expected format');
      throw new Error('No JSON content found in the expected format');
    } catch (error) {
      console.error('Error parsing work culture data:', error);
      return null;
    }
  };

  // Initialize data if rawData is provided
  React.useEffect(() => {
    if (rawData?.cultureData?.raw) {
      try {
        console.log('[WorkCultureProvider] rawData to parse:', rawData.cultureData.raw);
        const parsed = parseWorkCultureData(rawData.cultureData.raw);
        console.log('[WorkCultureProvider] parsed workCultureData:', parsed);
        setWorkCultureData(parsed);
      } catch (err) {
        setError('Failed to parse work culture data');
        console.error('[WorkCultureProvider] Error parsing work culture data:', err);
      }
    } else {
      setWorkCultureData(null);
      setError('No work culture data available');
      console.warn('[WorkCultureProvider] No work culture data available in rawData');
    }
    setLoading(false);
  }, [rawData]);

  const contextValue = {
    workCultureData,
    parseWorkCultureData,
    setWorkCultureData
  };

  return (
    <WorkCultureContext.Provider value={contextValue}>
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