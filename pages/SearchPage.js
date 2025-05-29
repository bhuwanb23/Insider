import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchCompany from '../components/search_page/SearchCompany';

export default function SearchPage({ navigation }) {
  const handleSearch = (company) => {
    // You can navigate to a results page or handle the search here
    // navigation.navigate('Results', { company });
    alert(`Searching for: ${company}`);
  };

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