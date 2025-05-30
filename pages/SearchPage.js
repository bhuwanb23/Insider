import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SearchCompany from '../components/search_page/SearchCompany';
import CompanyTopicsList from '../components/company_topics/CompanyTopicsList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useWaysToGetIn } from '../features/ways_to_get_in/context/WaysToGetInContext';

export default function SearchPage({ navigation, onBack }) {
  const [searchedCompany, setSearchedCompany] = useState(null);
  const { loading, error, fetchCompanyData, waysData, clearData } = useWaysToGetIn();

  useEffect(() => {
    // Clear data when component unmounts
    return () => clearData();
  }, []);

  const handleSearch = async (company) => {
    if (!company?.trim()) return;
    setSearchedCompany(company);
    await fetchCompanyData(company);
  };

  const handleSelectTopic = (topicKey) => {
    if (navigation) {
      // Navigate to the appropriate screen based on the topic
      switch (topicKey) {
        case 'waysin':
          navigation.navigate('WaysToGetIn', {
            company: searchedCompany,
            initialTopic: 'CAMPUS' // Default to campus recruitment
          });
          break;
        case 'core':
          navigation.navigate('CompanyDetails', { company: searchedCompany });
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
    clearData();
    setSearchedCompany(null);
    if (onBack) {
      onBack();
    }
  };

  const handleBackToSearch = () => {
    clearData();
    setSearchedCompany(null);
  };

  // Show company topics list if we have data
  if (searchedCompany && waysData && !loading && !error) {
    return (
      <CompanyTopicsList 
        company={searchedCompany}
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
            <Text style={styles.errorText}>
              {error}
            </Text>
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