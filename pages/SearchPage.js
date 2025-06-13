import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SearchCompany from '../components/search_page/SearchCompany';
import CompanyTopicsList from '../components/company_topics/CompanyTopicsList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useWaysToGetIn } from '../features/ways_to_get_in/context/WaysToGetInContext';
import { useCoreCompanyDetails } from '../features/core_company_details/context/CoreCompanyDetailsContext';
import { useWorkCulture } from '../features/work_culture/context/WorkCultureContext';
import { useInterview } from '../features/interview_experience/context/InterviewContext';
import { useJobHiring } from '../features/job_hirings_insights/context/JobHiringContext';
import { useNews } from '../features/news_highlights/context/NewsContext';
import { useTechStack } from '../features/tech_stack/context/TechStackContext';
import { getCompanyWaysToGetIn, getCoreCompanyDetails, getCompanyCulture, getCompanyInterviewExperience, getCompanyJobHiringInsights, getCompanyNewsHighlights, getCompanyTechStack } from '../api/api';

export default function SearchPage({ navigation, onBack }) {
  const [searchedCompany, setSearchedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState(null);

  const { 
    loading: waysLoading, 
    error: waysError, 
    fetchCompanyData: fetchWaysData, 
    waysData, 
    clearData: clearWaysData,
    setParsedWaysData
  } = useWaysToGetIn();

  const {
    loading: coreLoading,
    error: coreError,
    fetchCompanyData: fetchCoreData,
    companyData: coreData,
    clearData: clearCoreData,
    setParsedCompanyData
  } = useCoreCompanyDetails();

  const { clearData: clearCultureData, setParsedCultureData } = useWorkCulture();
  const { clearData: clearInterviewData, setParsedInterviewData } = useInterview();
  const { clearData: clearJobHiringData, setParsedJobHiringData } = useJobHiring();
  const { clearData: clearNewsData, setParsedNewsData } = useNews();
  const { clearData: clearTechStackData, setParsedTechStackData } = useTechStack();

  const clearAllApiData = () => {
    setParsedWaysData(null);
    setParsedCompanyData(null);
    clearCultureData();
    clearInterviewData();
    clearJobHiringData();
    clearNewsData();
    clearTechStackData();
    setAllData(null);
    setError(null);
  };

  useEffect(() => {
    // Clear data when component unmounts
    return () => {
      clearWaysData();
      clearCoreData();
      clearCultureData();
      clearInterviewData();
      clearJobHiringData();
      clearNewsData();
      clearTechStackData();
    };
  }, []);

  const handleSearch = async (company) => {
    if (!company?.trim()) return;
    clearAllApiData();
    setSearchedCompany(company);
    setLoading(true);
    try {
      console.log('Starting sequential API calls for company:', company);
      const results = {};
      let anySuccess = false;
      // Helper to try API call and store both parsed and raw
      const tryApi = async (fn, label) => {
        try {
          const res = await fn(company);
          if (label === 'coreData' && res && res.raw) {
            setParsedCompanyData(res.raw);
          }
          if (label === 'waysData' && res && res.raw) {
            setParsedWaysData(res.raw);
          }
          if (label === 'cultureData' && res && res.raw) {
            setParsedCultureData(res.raw);
          }
          if (label === 'interviewData' && res && res.raw) {
            setParsedInterviewData(res.raw);
          }
          if (label === 'jobHiringData' && res && res.raw) {
            setParsedJobHiringData(res.raw);
          }
          if (label === 'newsData' && res && res.raw) {
            setParsedNewsData(res.raw);
          }
          if (label === 'techStackData' && res && res.raw) {
            setParsedTechStackData(res.raw);
          }
          results[label] = { parsed: res.parsed, raw: res.raw };
          anySuccess = true;
          console.log(`${label} data received.`);
        } catch (err) {
          if (err.cleanedResponse) {
            results[label] = { parsed: null, raw: err.cleanedResponse };
          } else {
            results[label] = { parsed: null, raw: null, error: err.message };
          }
          console.error(`${label} failed:`, err.message);
        }
      };
      await tryApi(getCompanyWaysToGetIn, 'waysData');
      await tryApi(getCoreCompanyDetails, 'coreData');
      await tryApi(getCompanyCulture, 'cultureData');
      await tryApi(getCompanyInterviewExperience, 'interviewData');
      await tryApi(getCompanyJobHiringInsights, 'jobHiringData');
      await tryApi(getCompanyNewsHighlights, 'newsData');
      await tryApi(getCompanyTechStack, 'techStackData');
      setAllData(results);
      setLoading(false);
      if (!anySuccess) {
        setError('Failed to fetch any company data. Please try again.');
      } else {
        setError(null);
        console.log('All API calls attempted, some data may be unparsed.');
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch company data. Please try again.');
      console.error('Error during company data fetch:', err);
    }
  };

  const handleSelectTopic = (topicKey) => {
    if (navigation) {
      console.log('Selecting topic:', topicKey);
      console.log('Current core data:', coreData);
      
      // Navigate to the appropriate screen based on the topic
      switch (topicKey) {
        case 'waysin':
          if (!waysData) {
            console.error('Ways to get in data not available');
            return;
          }
          navigation.navigate('WaysToGetIn', {
            company: searchedCompany,
            initialTopic: 'CAMPUS'
          });
          break;
        case 'core':
          if (!coreData) {
            console.error('Core company data not available');
            return;
          }
          console.log('Navigating to CompanyDetails with data:', {
            company: searchedCompany,
            companyData: coreData
          });
          navigation.navigate('CompanyDetails', { 
            company: searchedCompany
          });
          break;
        case 'jobs':
          navigation.navigate('JobHirings', { company: searchedCompany });
          break;
        case 'interview':
          navigation.navigate('InterviewExperience', { company: searchedCompany });
          break;
        case 'culture':
          navigation.navigate('WorkCulture', { company: searchedCompany });
          break;
        case 'techstack':
          navigation.navigate('TechStack', { company: searchedCompany });
          break;
        case 'insights':
          navigation.navigate('NewsHighlights', { company: searchedCompany });
          break;
        default:
          console.warn('Unknown topic:', topicKey);
      }
    }
  };

  const handleBackToLanding = () => {
    setSearchedCompany(null);
    setAllData(null);
    setError(null);
    if (onBack) onBack();
  };

  const handleBackToSearch = () => {
    setSearchedCompany(null);
  };

  // Show company topics list if we have all data
  if (searchedCompany && allData && !loading && !error) {
    return (
      <CompanyTopicsList 
        company={searchedCompany}
        companyData={allData.coreData}
        allData={allData}
      />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)']}
        style={styles.header}
      >
        <TouchableOpacity 
          onPress={handleBackToLanding}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4158D0" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.content}>
        <SearchCompany onSearch={handleSearch} />
        {loading && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner message={`Fetching information about ${searchedCompany}...`} />
          </View>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => searchedCompany && handleSearch(searchedCompany)}
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(65, 88, 208, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },
  retryButton: {
    backgroundColor: '#4158D0',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 