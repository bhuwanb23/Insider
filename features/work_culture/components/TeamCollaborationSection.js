import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RatingIndicator from './RatingIndicator';

export default function TeamCollaborationSection({ data }) {
  // Helper to extract numeric score from strings like '4.8/5'
  const parseScore = (val) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const match = val.match(/([\d.]+)/);
      return match ? parseFloat(match[1]) : NaN;
    }
    return NaN;
  };

  return (
    <View style={styles.sectionContent}>
      <View style={styles.scoreContainer}>
        <Text style={styles.subheading}>Team Spirit Score</Text>
        <RatingIndicator score={parseScore(data.overallScore)} size="large" />
      </View>

      <View style={styles.activitiesContainer}>
        {data.activities.map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <Text style={styles.activityIcon}>{activity.icon}</Text>
            <View style={styles.activityInfo}>
              <Text style={styles.activityType}>{activity.type}</Text>
              <Text style={styles.activityDetails}>
                {activity.frequency} • {activity.participation} participation
              </Text>
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