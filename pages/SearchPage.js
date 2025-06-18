import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchCompany from '../components/search_page/SearchCompany';
import CompanyTopicsList from '../components/company_topics/CompanyTopicsList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useWaysToGetIn } from '../features/ways_to_get_in/context/WaysToGetInContext';
import { useCoreCompanyDetails } from '../features/core_company_details/context/CoreCompanyDetailsContext';
import { getCompanyWaysToGetIn, getCoreCompanyDetails, getCompanyCulture, getCompanyInterviewExperience, getCompanyJobHiringInsights, getCompanyNewsHighlights, getCompanyTechStack } from '../api/api';

export default function SearchPage({ onBack }) {
  const navigation = useNavigation();
  const [searchedCompany, setSearchedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState(null);
  const [topicStatuses, setTopicStatuses] = useState([]);
  const [hasApiError, setHasApiError] = useState(false);
  const [showError, setShowError] = useState(true);
  const [showApiKeyNotification, setShowApiKeyNotification] = useState(false);
  const insets = useSafeAreaInsets();

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
    };
  }, []);

  // Reset showError when error changes
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    try {
      const apiKey = await AsyncStorage.getItem('openrouter_api_key');
      if (!apiKey) {
        setShowApiKeyNotification(true);
      }
    } catch (error) {
      console.error('Failed to check API key:', error);
    }
  };

  const handleGoToSettings = () => {
    navigation.navigate('Settings', { previousScreen: 'Search' });
    setShowApiKeyNotification(false);
  };

  const handleDismissError = () => {
    setShowError(false);
  };

  const handleSearch = async (company) => {
    if (!company?.trim()) return;
    setSearchedCompany(company);
    setLoading(true);
    setError(null);
    setAllData(null);
    setHasApiError(false);

    // Initialize topic statuses
    const initialTopics = [
      { topic: 'Core Company Details', status: 'loading' },
      { topic: 'Ways to Get In', status: 'pending' },
      { topic: 'Work Culture', status: 'pending' },
      { topic: 'Interview Experience', status: 'pending' },
      { topic: 'Job Hiring Insights', status: 'pending' },
      { topic: 'News & Highlights', status: 'pending' },
      { topic: 'Tech Stack', status: 'pending' }
    ];
    setTopicStatuses(initialTopics);

    try {
      console.log('Starting sequential API calls for company:', company);
      const results = {};
      let anySuccess = false;
      let isRateLimited = false;

      const updateTopicStatus = (index, status) => {
        setTopicStatuses(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], status };
          return updated;
        });
      };

      const tryApi = async (fn, label, topicIndex) => {
        try {
          updateTopicStatus(topicIndex, 'loading');
          const res = await fn(company);
          results[label] = { 
            parsed: res, 
            raw: typeof res === 'string' ? res : JSON.stringify(res) 
          };
          anySuccess = true;
          updateTopicStatus(topicIndex, 'completed');
          console.log(`[SearchPage] ${label} data received:`, res);
        } catch (err) {
          // Check for rate limit error
          if (err.message?.includes('Rate limit exceeded') || 
              (err.response?.status === 429) || 
              err.message?.includes('429')) {
            isRateLimited = true;
            setError('API rate limit exceeded. Please try again later.');
          }

          if (err.cleanedResponse) {
            results[label] = { parsed: null, raw: err.cleanedResponse };
          } else {
            results[label] = { parsed: null, raw: null, error: err.message };
          }
          updateTopicStatus(topicIndex, 'error');
          setHasApiError(true);
          console.error(`[SearchPage] ${label} failed:`, err.message);
        }
      };

      await tryApi(getCoreCompanyDetails, 'coreData', 0);
      
      // Only continue with other APIs if core data succeeded and we're not rate limited
      if (!isRateLimited && results.coreData?.parsed) {
        await tryApi(getCompanyWaysToGetIn, 'waysData', 1);
        await tryApi(getCompanyCulture, 'cultureData', 2);
        await tryApi(getCompanyInterviewExperience, 'interviewData', 3);
        await tryApi(getCompanyJobHiringInsights, 'jobHiringData', 4);
        await tryApi(getCompanyNewsHighlights, 'newsData', 5);
        await tryApi(getCompanyTechStack, 'techStackData', 6);
      }

      console.log('[SearchPage] All data after API calls:', results);
      setAllData(results);
      setLoading(false);

      if (isRateLimited) {
        setError('API rate limit exceeded. Please try again later.');
        setHasApiError(true);
      } else if (!anySuccess) {
        setError('Unable to fetch company data. Please try again.');
        setHasApiError(true);
      } else if (!results.coreData?.parsed) {
        setError('Unable to fetch core company data. Please try again.');
        setHasApiError(true);
      } else {
        setError(null);
        setHasApiError(false);
      }
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
      setHasApiError(true);
      console.error('[SearchPage] Error during company data fetch:', err);
    }
  };

  const handleSelectTopic = (topicKey) => {
    if (navigation) {
      console.log('[SearchPage] Selecting topic:', topicKey);
      console.log('[SearchPage] allData:', allData);
      // Navigate to the appropriate screen based on the topic
      switch (topicKey) {
        case 'waysin':
          console.log('[SearchPage] allData.waysData:', allData?.waysData);
          if (!allData?.waysData || !allData.waysData.raw) {
            console.warn('[SearchPage] No waysData found in allData, not navigating.');
            return;
          }
          console.log('[SearchPage] Navigating to WaysToGetIn with rawData:', { waysData: allData.waysData });
          navigation.navigate('WaysToGetIn', {
            company: searchedCompany,
            initialTopic: 'CAMPUS',
            rawData: { waysData: allData.waysData }
          });
          break;
        case 'core':
          const coreRaw = allData?.coreData?.raw || allData?.coreData?.parsed;
          console.log('[SearchPage] allData.coreData:', allData?.coreData);
          if (!allData?.coreData || !coreRaw) {
            console.warn('[SearchPage] No coreData found in allData, not navigating.');
            return;
          }
          console.log('[SearchPage] Navigating to CompanyDetails with rawData:', { coreData: { raw: coreRaw } });
          navigation.navigate('CompanyDetails', { 
            company: searchedCompany,
            rawData: { coreData: { raw: coreRaw } }
          });
          break;
        case 'jobs':
          console.log('[SearchPage] allData.jobHiringData:', allData?.jobHiringData);
          if (!allData?.jobHiringData || !allData.jobHiringData.raw) {
            console.warn('[SearchPage] No jobHiringData found in allData, not navigating.');
            return;
          }
          console.log('[SearchPage] Navigating to JobHirings with:', {
            company: searchedCompany,
            rawData: { jobHiringData: allData.jobHiringData }
          });
          navigation.navigate('JobHirings', { 
            company: searchedCompany,
            rawData: { jobHiringData: allData.jobHiringData }
          });
          break;
        case 'interview':
          console.log('[SearchPage] allData.interviewData:', allData?.interviewData);
          if (!allData?.interviewData || !allData.interviewData.raw) {
            console.warn('[SearchPage] No interviewData found in allData, not navigating.');
            return;
          }
          console.log('[SearchPage] Navigating to InterviewExperience with rawData:', { interviewData: allData.interviewData });
          navigation.navigate('InterviewExperience', { 
            company: searchedCompany,
            rawData: { interviewData: allData.interviewData }
          });
          break;
        case 'culture':
          console.log('[SearchPage] allData.cultureData:', allData?.cultureData);
          if (!allData?.cultureData || !allData.cultureData.raw) {
            console.warn('[SearchPage] No cultureData found in allData, not navigating.');
            return;
          }
          console.log('[SearchPage] Navigating to WorkCulture with rawData:', { cultureData: allData.cultureData });
          navigation.navigate('WorkCulture', { 
            company: searchedCompany,
            rawData: { cultureData: allData.cultureData }
          });
          break;
        case 'techstack':
          console.log('[SearchPage] allData.techStackData:', allData?.techStackData);
          if (!allData?.techStackData || !allData.techStackData.raw) {
            console.warn('[SearchPage] No techStackData found in allData, not navigating.');
            return;
          }
          console.log('[SearchPage] Navigating to TechStack with rawData:', { techStackData: allData.techStackData });
          navigation.navigate('TechStack', { 
            company: searchedCompany,
            rawData: { techStackData: allData.techStackData }
          });
          break;
        case 'insights':
          console.log('[SearchPage] allData.newsData:', allData?.newsData);
          if (!allData?.newsData || !allData.newsData.raw) {
            console.warn('[SearchPage] No newsData found in allData, not navigating.');
            return;
          }
          console.log('[SearchPage] Navigating to NewsHighlights with rawData:', { newsData: allData.newsData });
          navigation.navigate('NewsHighlights', { 
            company: searchedCompany,
            rawData: { newsData: allData.newsData }
          });
          break;
        default:
          console.warn('[SearchPage] Unknown topic:', topicKey);
      }
    }
  };

  const handleBackToLanding = () => {
    setSearchedCompany(null);
    setAllData(null);
    setError(null);
    if (onBack) onBack();
    else navigation.navigate('Landing');
  };

  const handleBackToSearch = () => {
    setSearchedCompany(null);
    navigation.navigate('Landing', {
      screen: 'Search'
    });
  };

  // Only show company topics list if we have a company name, no errors, and not loading
  if (searchedCompany && !loading && !hasApiError) {
    return (
      <CompanyTopicsList 
        company={searchedCompany}
        companyData={allData?.coreData}
        allData={allData}
      />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)']}
        style={[styles.header, { paddingTop: insets.top, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
      >
        <TouchableOpacity 
          onPress={handleBackToLanding}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4158D0" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <MaterialCommunityIcons name="cog" size={24} color="#4158D0" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={[styles.content, { paddingTop: 0 }]}>
        {showApiKeyNotification && (
          <View style={styles.apiKeyNotification}>
            <MaterialCommunityIcons name="key-alert" size={24} color="#4158D0" />
            <Text style={styles.apiKeyNotificationText}>
              Please set up your OpenRouter API key to start using the app
            </Text>
            <TouchableOpacity 
              style={styles.setupButton}
              onPress={handleGoToSettings}
            >
              <Text style={styles.setupButtonText}>Set up now</Text>
            </TouchableOpacity>
          </View>
        )}
        <SearchCompany onSearch={handleSearch} />
        {loading && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner 
              message={`Fetching information about ${searchedCompany}...`}
              topicStatuses={topicStatuses}
            />
          </View>
        )}
        {error && showError && (
          <Animated.View 
            style={[
              styles.errorContainer, 
              error.includes('rate limit') && styles.rateLimitError
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleDismissError}
            >
              <MaterialCommunityIcons 
                name="close" 
                size={20} 
                color="rgba(255, 77, 109, 0.8)"
              />
            </TouchableOpacity>
            <MaterialCommunityIcons 
              name={error.includes('rate limit') ? "clock-alert" : "alert-circle"} 
              size={24} 
              color="#ff4d6d" 
            />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => searchedCompany && handleSearch(searchedCompany)}
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fc',
    // paddingTop: 12,
  },
  header: {
    paddingHorizontal: 16,
    // paddingBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
    marginBottom: 20,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(65, 88, 208, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 11,
  },
  content: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  rateLimitError: {
    backgroundColor: '#fff0f3',
    borderColor: '#ff9800',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: '#fff0f3',
    padding: 20,
    paddingTop: 24, // Increased to accommodate close button
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
    marginVertical: 12,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  retryButton: {
    backgroundColor: '#4158D0',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 6,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 4,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 77, 109, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  apiKeyNotification: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(65, 88, 208, 0.2)',
  },
  apiKeyNotificationText: {
    color: '#333',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 20,
  },
  setupButton: {
    backgroundColor: '#4158D0',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 6,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 4,
  },
  setupButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});