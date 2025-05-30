import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SearchCompany from '../components/search_page/SearchCompany';
import CompanyTopicsPage from './CompanyTopicsPage';

export default function SearchPage({ navigation, onBack }) {
  const [searchedCompany, setSearchedCompany] = useState(null);

  const handleSearch = (company) => {
    setSearchedCompany(company);
  };

  const handleSelectTopic = (topicKey) => {
    // You can navigate to a topic details page or handle topic selection here
    alert(`Selected topic: ${topicKey}`);
  };

  const handleBackToLanding = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleBackToSearch = () => {
    setSearchedCompany(null);
  };

  if (searchedCompany) {
    return (
      <CompanyTopicsPage 
        company={searchedCompany} 
        onSelectTopic={handleSelectTopic}
        onBack={handleBackToSearch}
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
      <SearchCompany onSearch={handleSearch} />
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(65, 88, 208, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 