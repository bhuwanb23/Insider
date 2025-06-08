import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import RatingIndicator from './RatingIndicator';

export default function TeamCollaborationSection({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No team collaboration data available.</Text>
      </View>
    );
  }

  const { overallScore, activities } = data;

  return (
    <View style={styles.sectionContent}>
      {overallScore !== undefined ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.subheading}>Team Spirit Score</Text>
          <RatingIndicator score={overallScore} size="large" />
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No overall team spirit score available.</Text>
        </View>
      )}

      {activities && activities.length > 0 ? (
        <View style={styles.activitiesContainer}>
          {activities.map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <Text style={styles.activityIcon}>{activity.icon || ''}</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityType}>{activity.type || 'N/A'}</Text>
                <Text style={styles.activityDetails}>
                  {activity.frequency || 'N/A'} • {activity.participation || 'N/A'} participation
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No activities available.</Text>
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
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  activitiesContainer: {
    marginTop: 16,
  },
  activityCard: {
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
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 12,
    color: '#666',
  },
}); 