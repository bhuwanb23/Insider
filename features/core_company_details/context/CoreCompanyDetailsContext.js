import React, { createContext, useContext, useState } from 'react';
import { cleanForJsonParse, parseJsonResponse, validators } from '../../../utils/jsonParser';

const CoreCompanyDetailsContext = createContext();

export function useCoreCompanyDetails() {
  const context = useContext(CoreCompanyDetailsContext);
  if (!context) {
    throw new Error('useCoreCompanyDetails must be used within a CoreCompanyDetailsProvider');
  }
  return context;
}

// // Robust utility to clean non-JSON artifacts from OpenRouter response
// function cleanForJsonParse(str) {
//   let cleaned = str;
//   // Remove // comments
//   cleaned = cleaned.replace(/\/\/.*$/gm, '');
//   // Remove /* ... */ comments
//   cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
//   // Remove parenthetical notes after URLs or values (e.g., "url": "..." (Note: ...))
//   cleaned = cleaned.replace(/"\s*\([^)]*\)\s*"/g, '"');
//   cleaned = cleaned.replace(/\s*\([^)]*\)\s*(,|\n|$)/g, '$1');
//   // Remove trailing commas before closing brackets/braces
//   cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
//   // Remove newlines between JSON keys/values
//   cleaned = cleaned.replace(/(\r\n|\n|\r)/gm, '');
//   // Extract only the JSON part (from first { to last })
//   const firstBrace = cleaned.indexOf('{');
//   const lastBrace = cleaned.lastIndexOf('}');
//   if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
//     cleaned = cleaned.substring(firstBrace, lastBrace + 1);
//   } else {
//     throw new Error('No JSON object found in response');
//   }
//   return cleaned;
// }

// Validate the shape of the parsed data
function isValidCoreCompanyDetails(obj) {
  if (!obj || typeof obj !== 'object') {
    console.error('[CoreCompanyDetails] Invalid data: Object is null or not an object');
    return false;
  }

  const requiredFields = [
    'name',
    'description',
    'founded',
    'headquarters',
    'size',
    'industry',
    'website',
    'socialMedia',
    'keyPeople',
    'funding',
    'acquisitions',
    'products',
    'awards',
    'certifications',
    'partnerships',
    'competitors',
    'recentNews'
  ];

  const missingFields = requiredFields.filter(field => !obj[field]);
  
  if (missingFields.length > 0) {
    console.error('[CoreCompanyDetails] Missing required fields:', missingFields);
    return false;
  }

  return true;
}

// Flatten nested API response to expected flat structure
function flattenCoreCompanyDetails(apiData) {
  if (!apiData) return {};
  return {
    name: apiData.basicIdentity?.name,
    description: apiData.overview?.description,
    founded: apiData.basicIdentity?.foundedYear || apiData.legalDetails?.legalStructure?.incorporationDate,
    headquarters: apiData.basicIdentity?.headquarters,
    size: apiData.basicIdentity?.employees?.global,
    industry: apiData.basicIdentity?.industry,
    website: apiData.contact?.website,
    socialMedia: apiData.contact?.socialMedia,
    keyPeople: apiData.basicIdentity?.keyPeople,
    funding: apiData.legalDetails?.fundingHistory,
    acquisitions: apiData.acquisitions || [],
    products: apiData.products || [],
    awards: apiData.recognition?.workplace,
    certifications: apiData.certifications || [],
    partnerships: apiData.partnerships || [],
    competitors: apiData.competitors || [],
    recentNews: apiData.recentNews || []
  };
}

export function CoreCompanyDetailsProvider({ children }) {
  const [companyData, setCompanyData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const setParsedCompanyData = (dataOrRaw) => {
    setIsLoading(true);
    try {
      let data = dataOrRaw;
      
      if (typeof dataOrRaw === 'string') {
        if (!dataOrRaw.trim()) {
          setCompanyData(null);
          setError('No data received from server');
          setIsLoading(false);
          return;
        }

        if (__DEV__) {
          console.log('[CoreCompanyDetails] Raw API response:', dataOrRaw);
        }

        const cleaned = cleanForJsonParse(dataOrRaw);
        
        if (__DEV__) {
          console.log('[CoreCompanyDetails] Cleaned for JSON parse:', cleaned);
        }

        try {
          data = JSON.parse(cleaned);
        } catch (parseError) {
          throw new Error(`JSON parse error: ${parseError.message}`);
        }

        if (__DEV__) {
          console.log('[CoreCompanyDetails] Parsed object:', data);
        }
      }

      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        setCompanyData(null);
        setError('No data available.');
        setIsLoading(false);
        return;
      }

      // Flatten the data to match expected structure
      const flatData = flattenCoreCompanyDetails(data);

      if (!isValidCoreCompanyDetails(flatData)) {
        throw new Error('Data received is not in the expected format');
      }

      setCompanyData(flatData);
      setError(null);
    } catch (e) {
      setCompanyData(null);
      setError(
        'Unable to process the response from the server. ' +
        (e.message ? `Error: ${e.message}` : '') +
        ' Please try again or contact support.'
      );
      if (__DEV__) {
        console.error('[CoreCompanyDetails] Error processing data:', e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    companyData,
    error,
    isLoading,
    setParsedCompanyData
  };

  return (
    <CoreCompanyDetailsContext.Provider value={value}>
      {children}
    </CoreCompanyDetailsContext.Provider>
  );
} 