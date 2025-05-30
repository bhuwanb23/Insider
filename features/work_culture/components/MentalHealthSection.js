import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RatingIndicator from './RatingIndicator';

export default function MentalHealthSection({ data }) {
  return (
    <View style={styles.sectionContent}>
      <View style={styles.wellnessScore}>
        <Text style={styles.subheading}>Wellness Support Rating</Text>
        <RatingIndicator score={data.overallScore} size="large" />
      </View>

      <View style={styles.programsContainer}>
        {data.programs.map((program, index) => (
          <View key={index} style={styles.programCard}>
            <Text style={styles.programIcon}>{program.icon}</Text>
            <View style={styles.programInfo}>
              <Text style={styles.programName}>{program.name}</Text>
              <Text style={styles.programDetails}>Coverage: {program.coverage}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  wellnessScore: {
    alignItems: 'center',
    marginBottom: 24,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  programsContainer: {
    marginTop: 16,
  },
  programCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  programIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  programDetails: {
    fontSize: 12,
    color: '#666',
  },
}); 