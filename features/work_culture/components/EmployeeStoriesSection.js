import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmployeeStoryCard from './EmployeeStoryCard';

export default function EmployeeStoriesSection({ data }) {
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
}); 