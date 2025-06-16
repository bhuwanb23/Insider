import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
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

  const handleSearch = async (company) => {
    if (!company?.trim()) return;
    setSearchedCompany(company);
    setLoading(true);
    setError(null);
    setAllData(null);

    try {
      console.log('Starting sequential API calls for company:', company);
      const results = {};
      let anySuccess = false;

      const tryApi = async (fn, label) => {
        try {
          const res = await fn(company);
          results[label] = { 
            parsed: res, 
            raw: typeof res === 'string' ? res : JSON.stringify(res) 
          };
          anySuccess = true;
          console.log(`[SearchPage] ${label} data received:`, res);
        } catch (err) {
          if (err.cleanedResponse) {
            results[label] = { parsed: null, raw: err.cleanedResponse };
          } else {
            results[label] = { parsed: null, raw: null, error: err.message };
          }
          console.error(`[SearchPage] ${label} failed:`, err.message);
        }
      };

      await tryApi(getCoreCompanyDetails, 'coreData');
      await tryApi(getCompanyWaysToGetIn, 'waysData');
      await tryApi(getCompanyCulture, 'cultureData');
      await tryApi(getCompanyInterviewExperience, 'interviewData');
      await tryApi(getCompanyJobHiringInsights, 'jobHiringData');
      await tryApi(getCompanyNewsHighlights, 'newsData');
      await tryApi(getCompanyTechStack, 'techStackData');

      console.log('[SearchPage] All data after API calls:', results);
      setAllData(results);
      setLoading(false);
      if (!anySuccess) {
        setError('Some data might be unavailable, but you can still explore available topics.');
      } else {
        setError(null);
      }
    } catch (err) {
      setLoading(false);
      setError('Some data might be unavailable, but you can still explore available topics.');
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
  };

  const handleBackToSearch = () => {
    setSearchedCompany(null);
  };

  // Show company topics list if we have a company name, regardless of data or error
  if (searchedCompany && !loading) {
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
});