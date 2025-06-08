import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import RatingIndicator from './RatingIndicator';

export default function MentalHealthSection({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No mental health support data available.</Text>
      </View>
    );
  }

  const { overallScore, programs } = data;

  return (
    <View style={styles.sectionContent}>
      {overallScore !== undefined ? (
        <View style={styles.wellnessScore}>
          <Text style={styles.subheading}>Wellness Support Rating</Text>
          <RatingIndicator score={overallScore} size="large" />
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No overall wellness score available.</Text>
        </View>
      )}

      {programs && programs.length > 0 ? (
        <View style={styles.programsContainer}>
          {programs.map((program, index) => (
            <View key={index} style={styles.programCard}>
              <Text style={styles.programIcon}>{program.icon || ''}</Text>
              <View style={styles.programInfo}>
                <Text style={styles.programName}>{program.name || 'N/A'}</Text>
                <Text style={styles.programDetails}>Coverage: {program.coverage || 'N/A'}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No programs available.</Text>
        </View>
      )}
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
  centeredNoCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 100,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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