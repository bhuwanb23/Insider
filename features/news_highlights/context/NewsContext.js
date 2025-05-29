import React, { createContext, useContext, useState, useCallback } from 'react';
import { newsData as initialNewsData } from '../constants/sampleData';

const NewsContext = createContext(null);

export function useNews() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}

export function NewsProvider({ children }) {
  const [newsData, setNewsData] = useState(initialNewsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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