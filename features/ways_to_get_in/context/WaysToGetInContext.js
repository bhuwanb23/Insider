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
      const response = await getCompanyWaysToGetIn(companyName);
      
      console.log('Response received:', response);
      
      // Validate the data structure
      if (validateData(response)) {
        setWaysData(response);
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
        fetchCompanyData,
        clearData
      }}
    >
      {children}
    </WaysToGetInContext.Provider>
  );
}; 