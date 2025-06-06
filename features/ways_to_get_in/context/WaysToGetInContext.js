import React, { createContext, useContext, useState } from 'react';
import { getCompanyWaysToGetIn } from '../../../api/api';
import { cleanForJsonParse, parseJsonResponse, validators } from '../../../utils/jsonParser';

const WaysToGetInContext = createContext();

export const useWaysToGetIn = () => {
  const context = useContext(WaysToGetInContext);
  if (!context) {
    throw new Error('useWaysToGetIn must be used within a WaysToGetInProvider');
  }
  return context;
};

export const WaysToGetInProvider = ({ children }) => {
  const [waysData, setWaysData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateData = (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: Object is null or not an object');
    }

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
      console.error('[WaysToGetIn] Missing required fields:', missingFields);
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
      console.log(`[WaysToGetIn] Fetching data for: ${companyName}`);
      const { parsed, raw } = await getCompanyWaysToGetIn(companyName);
      
      let data = parsed;
      if (!data && raw) {
        try {
          const cleaned = cleanForJsonParse(raw);
          if (__DEV__) {
            console.log('[WaysToGetIn] Cleaned response:', cleaned);
          }
          data = JSON.parse(cleaned);
        } catch (parseError) {
          console.error('[WaysToGetIn] Parse error:', parseError);
          throw new Error(`Failed to parse response: ${parseError.message}`);
        }
      }

      if (!data) {
        throw new Error('No data received from server');
      }

      // Validate the data structure
      if (validateData(data)) {
        setWaysData(data);
        console.log('[WaysToGetIn] Data successfully set to state');
      }
    } catch (error) {
      console.error('[WaysToGetIn] Error in fetchCompanyData:', error);
      setError(
        'Unable to process the response from the server. ' +
        (error.message ? `Error: ${error.message}` : '') +
        ' Please try again.'
      );
      setWaysData(null);
    } finally {
      setLoading(false);
    }
  };

  // Allow direct setting of parsed data
  const setParsedWaysData = (dataOrRaw) => {
    setLoading(true);
    try {
      let data = dataOrRaw;
      
      if (typeof dataOrRaw === 'string') {
        if (!dataOrRaw.trim()) {
          throw new Error('Empty response received from server');
        }

        if (__DEV__) {
          console.log('[WaysToGetIn] Raw API response:', dataOrRaw);
        }

        const cleaned = cleanForJsonParse(dataOrRaw);
        
        if (__DEV__) {
          console.log('[WaysToGetIn] Cleaned for JSON parse:', cleaned);
        }

        try {
          data = JSON.parse(cleaned);
        } catch (parseError) {
          throw new Error(`JSON parse error: ${parseError.message}`);
        }

        if (__DEV__) {
          console.log('[WaysToGetIn] Parsed object:', data);
        }
      }

      if (!data) {
        throw new Error('No data received from server');
      }

      if (validateData(data)) {
        setWaysData(data);
        setError(null);
      }
    } catch (e) {
      setWaysData(null);
      setError(
        'Unable to process the response from the server. ' +
        (e.message ? `Error: ${e.message}` : '') +
        ' Please try again.'
      );
      if (__DEV__) {
        console.error('[WaysToGetIn] Error processing data:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <WaysToGetInContext.Provider 
      value={{
        waysData,
        loading,
        error,
        setParsedWaysData,
        fetchCompanyData
      }}
    >
      {children}
    </WaysToGetInContext.Provider>
  );
}; 