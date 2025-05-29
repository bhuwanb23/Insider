import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function HiringTimeline() {
  const { jobHiringData } = useJobHiring();
  const { hiringTimeline } = jobHiringData;

  const renderTimelineItem = (title, data) => (
    <LinearGradient
      colors={['#4158D0', '#C850C0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.timelineCard}
    >
      <Text style={styles.timelineTitle}>{title}</Text>
      <View style={styles.timelineDetails}>
        <View style={styles.timelineItem}>
          <Text style={styles.itemLabel}>Period</Text>
          <Text style={styles.itemValue}>{data.period}</Text>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.itemLabel}>Frequency</Text>
          <Text style={styles.itemValue}>{data.frequency}</Text>
        </View>
        {data.nextDrive && (
          <View style={styles.timelineItem}>
            <Text style={styles.itemLabel}>Next Drive</Text>
            <Text style={styles.itemValue}>{data.nextDrive}</Text>
          </View>
        )}
        {data.averageOpenings && (
          <View style={styles.timelineItem}>
            <Text style={styles.itemLabel}>Avg. Openings</Text>
            <Text style={styles.itemValue}>{data.averageOpenings}</Text>
          </View>
        )}
        {data.lastEvent && (
          <View style={styles.timelineItem}>
            <Text style={styles.itemLabel}>Last Event</Text>
            <Text style={styles.itemValue}>{data.lastEvent}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🗓️</Text>
        <Text style={styles.title}>Hiring Timeline</Text>
      </View>
      <View style={styles.timelineContainer}>
        {renderTimelineItem('Campus Hiring', hiringTimeline.campus)}
        {renderTimelineItem('Off-Campus', hiringTimeline.offCampus)}
        {renderTimelineItem('Hackathons', hiringTimeline.hackathons)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  timelineContainer: {
    gap: 16,
  },
  timelineCard: {
    padding: 16,
    borderRadius: 12,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  timelineDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  timelineItem: {
    minWidth: '45%',
  },
  itemLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
}); 