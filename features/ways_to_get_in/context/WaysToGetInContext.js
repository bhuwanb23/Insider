import React, { createContext, useContext, useState } from 'react';
import { getCompanyWaysToGetIn } from '../../../api/api';

const WaysToGetInContext = createContext();

export const useWaysToGetIn = () => {
  const context = useContext(WaysToGetInContext);
  if (!context) {
    throw new Error('useWaysToGetIn must be used within a WaysToGetInProvider');
  }
  return context;
};

// Utility to clean non-JSON artifacts from OpenRouter response
function cleanForJsonParse(str) {
  // Remove parenthetical notes after URLs or values (e.g., "url": "..." (Note: ...))
  let cleaned = str.replace(/"\s*\([^)]*\)\s*"/g, '"');
  cleaned = cleaned.replace(/\s*\([^)]*\)\s*(,|\n|$)/g, '$1');
  // Remove any trailing commas before closing brackets/braces
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
  // Remove // comments
  cleaned = cleaned.replace(/\/\/.*$/gm, '');
  // Remove /* */ comments
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  return cleaned;
}

export const WaysToGetInProvider = ({ children }) => {
  const [waysData, setWaysData] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const fetchCompanyData = async (companyName) => {
    if (!companyName?.trim()) {
      setError('Company name is required');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching data for: ${companyName}`);
      const { parsed, raw } = await getCompanyWaysToGetIn(companyName);
      let data = parsed;
      if (!data && raw) {
        // Try to parse raw if not already parsed
        try {
          data = JSON.parse(cleanForJsonParse(raw));
        } catch (e) {
          setError('Unable to process the response from the server. Please try again.');
          setWaysData(null);
          setLoading(false);
          return;
        }
      }
      // Validate the data structure
      if (validateData(data)) {
        setWaysData(data);
        console.log('Data successfully set to state');
      }
    } catch (error) {
      console.error('Error in fetchCompanyData:', error);
      // Provide user-friendly error messages
      if (error.message.includes('Invalid JSON')) {
        setError('Unable to process the response from the server. Please try again.');
      } else if (error.message.includes('Missing required fields')) {
        setError('Incomplete data received. Please try again.');
      } else {
        setError(`Failed to fetch company data: ${error.message}`);
      }
      setWaysData(null);
    } finally {
      setLoading(false);
    }
  };

  // Allow direct setting of parsed data
  const setParsedWaysData = (dataOrRaw) => {
    let data = dataOrRaw;
    if (typeof dataOrRaw === 'string') {
      try {
        data = JSON.parse(cleanForJsonParse(dataOrRaw));
      } catch (e) {
        setWaysData(null);
        setError('Unable to process the response from the server. Please try again.');
        return;
      }
    }
    setWaysData(data);
    setError(null);
  };

  return (
    <WaysToGetInContext.Provider 
      value={{
        waysData,
        loading,
        error,
        setParsedWaysData
      }}
    >
      {children}
    </WaysToGetInContext.Provider>
  );
}; 