import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchCompany from '../components/search_page/SearchCompany';
import CompanyTopicsPage from './CompanyTopicsPage';

export default function SearchPage({ navigation }) {
  const [searchedCompany, setSearchedCompany] = useState(null);

  const handleSearch = (company) => {
    setSearchedCompany(company);
  };

  const handleSelectTopic = (topicKey) => {
    // You can navigate to a topic details page or handle topic selection here
    alert(`Selected topic: ${topicKey}`);
  };

  if (searchedCompany) {
    return <CompanyTopicsPage company={searchedCompany} onSelectTopic={handleSelectTopic} />;
  }

  return (
    <View style={styles.container}>
      <SearchCompany onSearch={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 