import React, { createContext, useContext, useState, useEffect } from 'react';
import { interviewData as sampleInterviewData } from '../constants/sampleData';

const InterviewContext = createContext();

export function useInterview() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}

// Function to parse interview data from API response
const parseInterviewData = (content) => {
  try {
    // Check if content is already an object
    if (typeof content === 'object' && content !== null) {
      return content;
    }
    
    // Extract JSON from between triple backticks if present
    const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : content;
    
    // Parse the JSON string
    const parsedData = JSON.parse(jsonStr);
    console.log('Successfully parsed interview data');
    return parsedData;
  } catch (error) {
    console.error('Error parsing interview data:', error);
    return null;
  }
};

export function InterviewProvider({ children, rawData }) {
  console.log('[InterviewProvider] received rawData:', rawData);
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (rawData?.interviewData?.raw) {
      try {
        console.log('[InterviewProvider] rawData to parse:', rawData.interviewData.raw);
        const parsed = parseInterviewData(rawData.interviewData.raw);
        console.log('[InterviewProvider] parsed interviewData:', parsed);
        setInterviewData(parsed);
      } catch (err) {
        setError('Failed to parse interview data');
        console.error('[InterviewProvider] Error parsing interview data:', err);
      }
    } else {
      setInterviewData(null);
      setError('No interview data available');
      console.warn('[InterviewProvider] No interview data available in rawData');
    }
    setLoading(false);
  }, [rawData]);

  // Function to update interview data with new raw content
  const updateInterviewData = (rawContent) => {
    if (!rawContent) return;
    
    setLoading(true);
    try {
      const parsedData = parseInterviewData(rawContent);
      if (parsedData) {
        setInterviewData(parsedData);
        setError(null);
      } else {
        setError('Failed to parse interview data');
      }
    } catch (err) {
      console.error('Error updating interview data:', err);
      setError('Error updating interview data');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    interviewData,
    loading,
    error,
    updateInterviewData
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
}