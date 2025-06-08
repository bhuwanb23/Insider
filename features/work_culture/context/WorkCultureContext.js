import React, { createContext, useContext, useState } from 'react';
import { cleanForJsonParse } from '../../../utils/jsonParser';

const WorkCultureContext = createContext();

// Flatten nested API response to expected structure (customize as needed)
function flattenWorkCultureData(apiData) {
  if (!apiData) return {};
  return {
    coreValues: apiData.cultureOverview?.coreValues,
    culturalVibe: apiData.cultureOverview?.culturalVibe,
    employeeEmpowerment: apiData.cultureOverview?.employeeEmpowerment,
    leadershipStyle: apiData.cultureOverview?.leadershipStyle,
    workLifeBalance: apiData.workLifeBalance,
    remoteWork: apiData.remoteWork,
    teamCollaboration: apiData.teamCollaboration,
    mentalHealth: apiData.mentalHealth,
    diversity: apiData.diversity,
    employeeStories: apiData.employeeStories
  };
}

export function WorkCultureProvider({ children, apiResponse }) {
  const [workCultureData, setWorkCultureData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If apiResponse is provided, parse and flatten it
  React.useEffect(() => {
    if (!apiResponse) {
      setWorkCultureData(null);
      setError('No data available.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      let data = apiResponse;
      if (typeof apiResponse === 'string') {
        const cleaned = cleanForJsonParse(apiResponse);
        data = JSON.parse(cleaned);
      }
      const flatData = flattenWorkCultureData(data);
      if (!flatData || (typeof flatData === 'object' && Object.keys(flatData).length === 0)) {
        setWorkCultureData(null);
        setError('No data available.');
      } else {
        setWorkCultureData(flatData);
        setError(null);
      }
    } catch (e) {
      setWorkCultureData(null);
      setError('Unable to process the response from the server. ' + (e.message ? `Error: ${e.message}` : '') + ' Please try again.');
    } finally {
      setLoading(false);
    }
  }, [apiResponse]);

  return (
    <WorkCultureContext.Provider value={{ workCultureData, loading, error }}>
      {children}
    </WorkCultureContext.Provider>
  );
}

export function useWorkCulture() {
  const context = useContext(WorkCultureContext);
  if (!context) {
    throw new Error('useWorkCulture must be used within a WorkCultureProvider');
  }
  return context;
} 