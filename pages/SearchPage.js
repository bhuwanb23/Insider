import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Platform, StatusBar, Dimensions, Easing } from 'react-native';
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

const { width, height } = Dimensions.get('window');

// Animated background shapes (now with more shapes and variety)
function AnimatedBgShapes() {
  const anims = Array.from({ length: 6 }, (_, i) => React.useRef(new Animated.Value(0)).current);
  const shapeConfigs = [
    // size, left, top, right, bottom, opacity range, duration
    { w: 180, h: 180, left: -40, top: 40, opacity: [0.18, 0.32], duration: 6000 },
    { w: 120, h: 120, right: 0, top: height * 0.18, opacity: [0.12, 0.22], duration: 8000 },
    { w: 220, h: 220, left: width * 0.18, top: height * 0.68, opacity: [0.10, 0.18], duration: 10000 },
    { w: 90, h: 90, left: width * 0.7, top: height * 0.08, opacity: [0.10, 0.18], duration: 9000 },
    { w: 140, h: 60, left: width * 0.55, top: height * 0.5, opacity: [0.08, 0.16], duration: 7000, borderRadius: 40 },
    { w: 60, h: 60, left: width * 0.05, top: height * 0.82, opacity: [0.10, 0.22], duration: 11000 },
  ];

  React.useEffect(() => {
    anims.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: shapeConfigs[i].duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: shapeConfigs[i].duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {shapeConfigs.map((cfg, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bgShape,
            {
              width: cfg.w,
              height: cfg.h,
              left: cfg.left,
              right: cfg.right,
              top: cfg.top,
              bottom: cfg.bottom,
              borderRadius: cfg.borderRadius || 999,
              opacity: anims[i].interpolate({ inputRange: [0, 1], outputRange: cfg.opacity }),
              transform: [
                { translateX: anims[i].interpolate({ inputRange: [0, 1], outputRange: [0, (cfg.w / 8) * (i % 2 === 0 ? 1 : -1)] }) },
                { translateY: anims[i].interpolate({ inputRange: [0, 1], outputRange: [0, (cfg.h / 8) * (i % 2 === 1 ? 1 : -1)] }) },
                { scale: anims[i].interpolate({ inputRange: [0, 1], outputRange: [1, 1 + 0.06 * (i % 3 + 1)] }) },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

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
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
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
    console.log('SearchPage handleSearch company:', company);
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
        } catch (err) {
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
        }
      };

      await tryApi(getCoreCompanyDetails, 'coreData', 0);
      if (!isRateLimited && results.coreData?.parsed) {
        await tryApi(getCompanyWaysToGetIn, 'waysData', 1);
        await tryApi(getCompanyCulture, 'cultureData', 2);
        await tryApi(getCompanyInterviewExperience, 'interviewData', 3);
        await tryApi(getCompanyJobHiringInsights, 'jobHiringData', 4);
        await tryApi(getCompanyNewsHighlights, 'newsData', 5);
        await tryApi(getCompanyTechStack, 'techStackData', 6);
      }
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
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={['#4158D0', '#C850C0', '#FFC246']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <AnimatedBgShapes />
      <Animated.View
        style={[
          styles.fullWidthHeader,
          {
            opacity: fadeAnim,
            top: insets.top + 10,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBackToLanding}
          style={styles.headerIconBtn}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={30} color="#fff" style={{ borderWidth: 1, borderColor: 'white', borderRadius: 50, padding: 5 }} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.headerIconBtn}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="cog" size={30} color="#fff" style={{ borderWidth: 1, borderColor: 'white', borderRadius: 50, padding: 5 }} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.glassCard, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }]}> 
        <SearchCompany onSearch={handleSearch} />
        {/* Notification overlays, always centered */}
        {showApiKeyNotification && (
          <View style={styles.centeredNotificationContainer}>
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
          </View>
        )}
        {error && showError && (
          <View style={styles.centeredNotificationContainer}>
            <View style={[styles.errorContainer, error.includes('rate limit') && styles.rateLimitError]}>
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
            </View>
          </View>
        )}
        {loading && (
          <View style={styles.centeredLoaderContainer}>
            <LoadingSpinner 
              message={`Fetching information about ${searchedCompany}...`}
              topicStatuses={topicStatuses}
              currentStep={topicStatuses.findIndex(t => t.status === 'loading') !== -1 ? topicStatuses.findIndex(t => t.status === 'loading') : topicStatuses.findIndex(t => t.status === 'pending') !== -1 ? topicStatuses.findIndex(t => t.status === 'pending') : topicStatuses.length - 1}
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  fullWidthHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 18,
    paddingHorizontal: 18,
    // shadowColor: '#4158D0',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.08,
    // shadowRadius: 12,
    // elevation: 8,
    zIndex: 20,
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(65, 88, 208, 0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
  },
  glassCard: {
    // marginTop: height * 0.13,
    marginHorizontal: 18,
    // backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 32,
    padding: 24,
    // shadowColor: '#4158D0',
    // shadowOffset: { width: 0, height: 8 },
    // shadowOpacity: 0.10,
    // shadowRadius: 24,
    // elevation: 12,
    alignItems: 'center',
    minHeight: height * 0.45,
    justifyContent: 'center',
    backdropFilter: 'blur(18px)', // for web, ignored on native
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
    borderRadius: 32,
    margin: 0,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  apiKeyNotification: {
    backgroundColor: '#fff',
    marginBottom: 18,
    padding: 18,
    borderRadius: 18,
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
  errorContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#fff0f3',
    padding: 20,
    paddingTop: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ff4d6d',
    alignItems: 'center',
    shadowColor: '#ff4d6d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  rateLimitError: {
    backgroundColor: '#fff7e6',
    borderColor: '#ff9800',
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
  topSearchContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 8,
    zIndex: 5,
  },
  bgShape: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 999,
    // glass effect
    shadowColor: '#fff',
    shadowOpacity: 0.18,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 0 },
    // iOS glass effect
    // For web, you could add: backdropFilter: 'blur(12px)',
  },
  centeredLoaderContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  centeredNotificationContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
});