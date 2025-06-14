import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SearchCompany from '../components/search_page/SearchCompany';
import CompanyTopicsList from '../components/company_topics/CompanyTopicsList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useWaysToGetIn } from '../features/ways_to_get_in/context/WaysToGetInContext';
import { useCoreCompanyDetails } from '../features/core_company_details/context/CoreCompanyDetailsContext';
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
    clearData: clearWaysData 
  } = useWaysToGetIn();

  const {
    loading: coreLoading,
    error: coreError,
    fetchCompanyData: fetchCoreData,
    companyData: coreData,
    clearData: clearCoreData
  } = useCoreCompanyDetails();

  useEffect(() => {
    // Clear data when component unmounts
    return () => {
      clearWaysData();
      clearCoreData();
    };
  }, []);

  const handleSearch = async (company) => {
    if (!company?.trim()) return;
    setSearchedCompany(company);
    setLoading(true);
    setError(null);
    setAllData(null);
    // Optionally clear context data if needed
    // clearWaysData();
    // clearCoreData();
    try {
      console.log('Starting sequential API calls for company:', company);
      const results = {};
      let anySuccess = false;
      // Helper to try API call and store both parsed and raw
      const tryApi = async (fn, label) => {
        try {
          const res = await fn(company);
          results[label] = { parsed: res, raw: res };
          anySuccess = true;
          console.log(`${label} data received.`);
        } catch (err) {
          // If error has a cleaned response, store it as raw
          if (err.cleanedResponse) {
            results[label] = { parsed: null, raw: err.cleanedResponse };
          } else {
            results[label] = { parsed: null, raw: null, error: err.message };
          }
          console.error(`${label} failed:`, err.message);
        }
      };
      await tryApi(getCoreCompanyDetails, 'coreData');
      await tryApi(getCompanyWaysToGetIn, 'waysData');
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
            initialTopic: 'CAMPUS',
            rawData: allData
          });
          break;
        case 'core':
          if (!coreData) {
            console.error('Core company data not available');
            return;
          }
          console.log('Navigating to CompanyDetails with data:', {
            company: searchedCompany,
            rawData: allData
          });

          navigation.navigate('CompanyDetails', { 
            company: searchedCompany,
            rawData: allData
          });
          break;
        case 'jobs':
          navigation.navigate('JobHirings', { 
            company: searchedCompany,
            rawData: allData
          });
          break;
        case 'interview':
          navigation.navigate('InterviewExperience', { 
            company: searchedCompany,
            rawData: allData
          });
          break;
        case 'culture':
          navigation.navigate('WorkCulture', { 
            company: searchedCompany,
            rawData: allData
          });
          break;
        case 'techstack':
          navigation.navigate('TechStack', { 
            company: searchedCompany,
            rawData: allData
          });
          break;
        case 'insights':
          navigation.navigate('NewsHighlights', { 
            company: searchedCompany,
            rawData: allData
          });
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
    backgroundColor: '#f6f8fc',
  },
  header: {
    paddingHorizontal: 16,
    // paddingTop: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
    position: 'relative',
    // paddingBottom: 80,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(65, 88, 208, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    margin: 16,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  errorContainer: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: '#fff0f3',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ff4d6d',
    alignItems: 'center',
    shadowColor: '#ff4d6d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  errorText: {
    color: '#ff4d6d',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  retryButton: {
    backgroundColor: 'linear-gradient(90deg, #4158D0 0%, #C850C0 100%)',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 6,
    shadowColor: '#C850C0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 4,
  },
  retryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});