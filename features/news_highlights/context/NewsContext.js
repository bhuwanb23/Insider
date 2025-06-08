import React, { createContext, useContext, useState, useEffect } from 'react';
import { cleanForJsonParse } from '../../../utils/jsonParser';

const NewsContext = createContext(null);

export function useNews() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}

// Optionally flatten or map the API data if needed (customize as required)
function flattenNewsData(apiData) {
  if (!apiData) return {};
  return apiData; // If you need to map/flatten, do it here
}

export function NewsProvider({ children, apiResponse }) {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiResponse) {
      setNewsData(null);
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
      const flatData = flattenNewsData(data);
      if (!flatData || (typeof flatData === 'object' && Object.keys(flatData).length === 0)) {
        setNewsData(null);
        setError('No data available.');
      } else {
        setNewsData(flatData);
        setError(null);
      }
    } catch (e) {
      setNewsData(null);
      setError('Unable to process the response from the server. ' + (e.message ? `Error: ${e.message}` : '') + ' Please try again.');
    } finally {
      setLoading(false);
    }
  }, [apiResponse]);

  const value = {
    newsData,
    loading,
    error
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
} 