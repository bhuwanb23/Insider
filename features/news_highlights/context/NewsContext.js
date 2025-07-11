import React, { createContext, useContext, useState, useCallback } from 'react';
import { newsData as initialNewsData } from '../constants/sampleData';

function parseNewsResponse(content) {
  try {
    if (typeof content === 'object' && content !== null) {
      return content;
    }
    // Remove triple backticks if present
    const match = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    let jsonStr = match ? match[1] : content;
    jsonStr = jsonStr.trim();
    if ((jsonStr.startsWith('"') && jsonStr.endsWith('"')) ||
        (jsonStr.startsWith("'") && jsonStr.endsWith("'"))) {
      jsonStr = jsonStr.slice(1, -1);
    }
    const parsedData = JSON.parse(jsonStr);
    console.log('Successfully parsed news response');
    return parsedData;
  } catch (error) {
    console.error('Error parsing news response:', error, content);
    return null;
  }
}

const NewsContext = createContext(null);

export function useNews() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}

export function NewsProvider({ children, rawData }) {
  console.log('[NewsProvider] received rawData:', rawData);
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (rawData?.newsData?.raw) {
      const parsed = parseNewsResponse(rawData.newsData.raw);
      if (parsed) {
        setNewsData(parsed);
        setError(null);
      } else {
        setNewsData(null);
        setError('Failed to parse news data');
      }
    } else {
      setNewsData(null);
      setError('No news data available');
    }
  }, [rawData]);

  const updateNewsData = useCallback((rawContent) => {
    if (!rawContent) return;
    const parsedData = parseNewsResponse(rawContent);
    if (parsedData) {
      setNewsData(parsedData);
    }
  }, []);

  const refreshNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app, you would fetch from an API here
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewsData(initialNewsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    newsData,
    loading,
    error,
    refreshNews,
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}