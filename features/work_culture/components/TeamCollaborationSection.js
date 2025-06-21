import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.activitiesContainer}
      >
        {data.activities.map((activity, index) => (
          <View
            key={index}
            style={[
              styles.activityCard,
              index === data.activities.length - 1 && { marginBottom: 0 },
            ]}
          >
            <Text style={styles.activityIcon}>{activity.icon}</Text>
            <View style={styles.activityInfo}>
              <Text style={styles.activityType}>{activity.type}</Text>
              <Text style={styles.activityDetails}>
                {activity.frequency} • {activity.participation} participation
              </Text>
            </View>
          </View>
        ))}
      </LinearGradient>

      {/* Manager Support Section */}
      {data.managerSupport && (
        <LinearGradient
          colors={['#4158D0', '#C850C0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.managerSupportContainer}
        >
          <Text style={styles.managerSupportTitle}>Manager Support</Text>
          <Text style={styles.managerSupportDetail}>Rating: {data.managerSupport.rating || 'N/A'}/5</Text>
          <Text style={styles.managerSupportDetail}>Feedback Frequency: {data.managerSupport.feedbackFrequency || 'N/A'}</Text>
          <Text style={styles.managerSupportDetail}>1:1 Meetings: {data.managerSupport.oneOnOneMeetings || 'N/A'}</Text>
          <Text style={styles.managerSupportTestimonial}>{data.managerSupport.testimonial || 'No testimonial provided.'}</Text>
        </LinearGradient>
      )}
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
    borderRadius: 14,
    padding: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activityIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  managerSupportContainer: {
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  managerSupportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  managerSupportDetail: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  managerSupportTestimonial: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 10,
    fontStyle: 'italic',
    lineHeight: 18,
  },
}); 