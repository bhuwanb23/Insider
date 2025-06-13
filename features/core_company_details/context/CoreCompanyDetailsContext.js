import React, { createContext, useContext, useState } from 'react';
import { getCoreCompanyDetails } from '../../../api/api';

const CoreCompanyDetailsContext = createContext();

export function useCoreCompanyDetails() {
  const context = useContext(CoreCompanyDetailsContext);
  if (!context) {
    throw new Error('useCoreCompanyDetails must be used within a CoreCompanyDetailsProvider');
  }
  return context;
}

// Robust custom parsing function for Core Company Details JSON
const robustCleanAndParseJson = (jsonString, contextName) => {
  let cleaned = jsonString;

  try {
    // Step 1: Basic Pre-processing cleanup
    cleaned = cleaned.replace(/```json\n?|```\n?/g, ''); // Remove markdown code block indicators
    cleaned = cleaned.replace(/^\uFEFF/, ''); // Remove BOM and other invisible characters
    cleaned = cleaned.trim(); // Trim whitespace

    // Step 2: Replace non-JSON compliant values (from previous fix)
    cleaned = cleaned.replace(/\bNone\b/g, 'null');
    cleaned = cleaned.replace(/\bTrue\b/g, 'true');
    cleaned = cleaned.replace(/\bFalse\b/g, 'false');
    cleaned = cleaned.replace(/\bundefined\b/g, 'null');
    cleaned = cleaned.replace(/\bNaN\b/g, 'null');

    // Step 3: Handle improperly escaped double quotes within string values
    // This regex looks for a double quote that is not preceded by a backslash
    // and is inside what looks like a JSON string (between two other double quotes).
    // This is a common issue with LLM outputs where internal quotes are not escaped.
    cleaned = cleaned.replace(/\"([^"\\]*)\"/g, (match, p1) => {
      // Check if p1 contains any unescaped double quotes, and if so, escape them
      if (p1.includes('"') && !p1.includes('\"')) {
        return '"' + p1.replace(/"/g, '\\"') + '"';
      }
      return match;
    });

    if (__DEV__) {
      console.log(`[${contextName}] Cleaned for JSON parse (simplified):`, cleaned);
    }

    // Step 4: Add a fallback for common malformed JSON issues (e.g., trailing commas, extra commas)
    // This is a more aggressive cleanup, use with caution if strict JSON is required.
    // However, for LLM outputs, it can be beneficial.
    try {
      // Attempt to parse with stricter rules first
      const parsedData = JSON.parse(cleaned);
      return parsedData;
    } catch (strictParseError) {
      if (__DEV__) {
        console.warn(`[${contextName}] Strict JSON parse failed. Attempting tolerant parse. Error:`, strictParseError.message);
      }
      // If strict parse fails, try a more tolerant approach
      // This might involve more complex regex or a JSON linter if available,
      // but for now, let's focus on the most common issue of unescaped quotes.
      // This part might need refinement based on recurring error patterns.
      // For now, if the error is still 'Unexpected character: s', the above regex should fix it.
      // If it's another error, we might need more specific regex or a more robust parser.
      throw strictParseError; // Re-throw if tolerant parse is not implemented or fails.
    }

  } catch (parseError) {
    console.error(`Failed to parse ${contextName} API response as JSON:`, parseError);
    console.error('Cleaned response content error:', cleaned);
    throw new Error(`Failed to parse response for ${contextName}: ${parseError.message}`);
  }
};

// Validate the shape of the parsed data
function isValidCoreCompanyDetails(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid data: Expected a non-null object');
  }

  const requiredFields = {
    name: 'string',
    description: 'string',
    founded: ['string', 'number'],
    headquarters: 'string',
    size: ['string', 'number'],
    industry: 'string',
    website: 'string',
    socialMedia: 'object',
    keyPeople: 'array',
    funding: ['object', 'array'],
    acquisitions: 'array',
    products: 'array',
    awards: ['array', 'object'],
    certifications: 'array',
    partnerships: 'array',
    competitors: 'array',
    recentNews: 'array'
  };

  Object.entries(requiredFields).forEach(([field, expectedType]) => {
    if (!(field in data)) {
      throw new Error(`Missing required field: ${field}`);
    }

    const types = Array.isArray(expectedType) ? expectedType : [expectedType];
    const valueType = Array.isArray(data[field]) ? 'array' : typeof data[field];
    if (!types.includes(valueType)) {
      throw new Error(`Invalid type for ${field}: expected ${types.join(' or ')}, got ${valueType}`);
  }
  });

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

        data = robustCleanAndParseJson(dataOrRaw, 'CoreCompanyDetails');
        console.log(`[CoreCompanyDetails] Raw API response parsed successfully (from setParsedCompanyData).`);

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
        throw new Error('Data received is not in the expected format or missing required fields.');
      }

      setCompanyData(flatData);
      setError(null);
      console.log('[CoreCompanyDetails] Data successfully set to state and validated (from setParsedCompanyData).');
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

  const clearData = () => {
    setCompanyData(null);
    setError(null);
    setIsLoading(false);
  };

  // Add fetchCompanyData to retrieve data from API
  const fetchCompanyData = async (companyName) => {
    if (!companyName?.trim()) {
      setError('Company name is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`[CoreCompanyDetails] Fetching data for: ${companyName}`);
      const { raw } = await getCoreCompanyDetails(companyName);
      
      let data = null;
      if (raw) {
        console.log(`[CoreCompanyDetails] Raw response received:`, raw);
        data = robustCleanAndParseJson(raw, 'CoreCompanyDetails');
        console.log(`[CoreCompanyDetails] API response parsed successfully. Parsed data:`, data);
      }

      if (!data) {
        throw new Error('No data received from server after parsing');
      }

      // Flatten the data to match expected structure
      const flatData = flattenCoreCompanyDetails(data);

      if (!isValidCoreCompanyDetails(flatData)) {
        throw new Error('Data received is not in the expected format or missing required fields.');
      }

      setCompanyData(flatData);
      console.log('[CoreCompanyDetails] Data successfully set to state and validated.');

    } catch (error) {
      console.error('[CoreCompanyDetails] Error in fetchCompanyData:', error);
      setError(
        'Unable to process the response from the server. ' +
        (error.message ? `Error: ${error.message}` : '') +
        ' Please try again.'
      );
      setCompanyData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    companyData,
    error,
    isLoading,
    setParsedCompanyData,
    fetchCompanyData,
    clearData
  };

  return (
    <CoreCompanyDetailsContext.Provider value={value}>
      {children}
    </CoreCompanyDetailsContext.Provider>
  );
} 