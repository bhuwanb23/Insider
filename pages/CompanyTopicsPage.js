import React from 'react';
import { StyleSheet, View } from 'react-native';
import CompanyTopicsList from '../components/company_topics/CompanyTopicsList';

export default function CompanyTopicsPage({ company, onSelectTopic }) {
  return (
    <View style={styles.container}>
      <CompanyTopicsList company={company} onSelectTopic={onSelectTopic} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 