import React, { createContext, useContext, useState, useCallback } from 'react';
import { newsData as initialNewsData } from '../constants/sampleData';

function parseNewsResponse(content) {
  try {
    const match = content.match(/```([\s\S]*?)```/);
    if (!match) {
      console.error('Could not find JSON between triple backticks');
      return null;
    }
    const jsonStr = match[1];
    const parsedData = JSON.parse(jsonStr);
    console.log('Successfully parsed news response');
    return parsedData;
  } catch (error) {
    console.error('Error parsing news response:', error);
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
  const [newsData, setNewsData] = useState(rawData ? parseNewsResponse(rawData.newsData?.raw) || initialNewsData : initialNewsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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