import React, { createContext, useContext, useState } from 'react';
import { getCompanyWaysToGetIn } from '../../../api/api';

// Function to parse and extract JSON from API response
const parseWaysToGetInData = (rawData) => {
    try {
      if (typeof rawData === 'object' && rawData !== null) {
        console.log('Successfully parsed ways to get in data (already parsed object)');
        return rawData;
      }
      // Try to find JSON between triple backticks
      const match = rawData.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      let jsonStr = match ? match[1] : rawData;
      jsonStr = jsonStr.trim();
      if ((jsonStr.startsWith('"') && jsonStr.endsWith('"')) ||
          (jsonStr.startsWith("'") && jsonStr.endsWith("'"))) {
        jsonStr = jsonStr.slice(1, -1);
      }
      const parsedData = JSON.parse(jsonStr);
      console.log('Successfully parsed ways to get in data');
      return parsedData;
    } catch (error) {
      console.error('Error parsing ways to get in data:', error, rawData);
      throw new Error('Failed to parse response data');
    }
  };

const WaysToGetInContext = createContext();

export const useWaysToGetIn = () => {
  const context = useContext(WaysToGetInContext);
  if (!context) {
    throw new Error('useWaysToGetIn must be used within a WaysToGetInProvider');
  }
  return context;
};

export function WaysToGetInProvider({ children, rawData }) {
  console.log('[WaysToGetInProvider] received rawData:', rawData);
  const [waysData, setWaysData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validateData = (data) => {
    const requiredFields = [
      'campusRecruitment',
      'jobPortals',
      'referrals',
      'hackathons',
      'coldOutreach',
      'internshipConversion',
      'contractRoles'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Invalid data structure: Missing required fields: ${missingFields.join(', ')}`);
    }

    return true;
  };

  React.useEffect(() => {
    if (rawData?.waysData?.raw) {
      try {
        console.log('[WaysToGetInProvider] rawData to parse:', rawData.waysData.raw);
        const parsed = parseWaysToGetInData(rawData.waysData.raw);
        console.log('[WaysToGetInProvider] parsed waysData:', parsed);
        setWaysData(parsed);
      } catch (err) {
        setError('Failed to parse ways to get in data');
        console.error('[WaysToGetInProvider] Error parsing ways to get in data:', err);
      }
    } else {
      setWaysData(null);
      setError('No ways to get in data available');
      console.warn('[WaysToGetInProvider] No ways to get in data available in rawData');
    }
    setLoading(false);
  }, [rawData]);

  const updateWaysData = (newRawContent) => {
    setLoading(true);
    setError(null);
    
    try {
      const parsedData = parseWaysToGetInData(newRawContent);
      if (validateData(parsedData)) {
        setWaysData(parsedData);
      }
    } catch (error) {
      console.error('Error updating ways to get in data:', error);
      setError('Failed to process ways to get in data');
      setWaysData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setWaysData(null);
    setError(null);
  };

  return (
    <WaysToGetInContext.Provider 
      value={{
        waysData,
        loading,
        error,
        updateWaysData,
        clearData
      }}
    >
      {children}
    </WaysToGetInContext.Provider>
  );
}