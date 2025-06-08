import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import EmployeeStoryCard from './EmployeeStoryCard';

export default function EmployeeStoriesSection({ data }) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No employee stories available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.sectionContent}>
      {data.map((story, index) => (
        <EmployeeStoryCard key={index} story={story} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
}); 