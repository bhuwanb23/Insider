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
      if (typeof content === 'object' && content !== null) {
        setWorkCultureData(content);
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
      const parsedData = JSON.parse(jsonStr);
      setWorkCultureData(parsedData);
      return parsedData;
    } catch (error) {
      console.error('Error parsing work culture data:', error, content);
      setWorkCultureData(null);
      setError('Failed to parse work culture data');
      return null;
    }
  };

  // Initialize data if rawData is provided
  React.useEffect(() => {
    if (rawData?.cultureData?.raw) {
      try {
        console.log('[WorkCultureProvider] rawData to parse:', rawData.cultureData.raw);
        parseWorkCultureData(rawData.cultureData.raw);
      } catch (err) {
        setError('Failed to parse work culture data');
        setWorkCultureData(null);
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