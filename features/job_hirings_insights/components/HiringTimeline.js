import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function HiringTimeline() {
  const { jobHiringData } = useJobHiring();
  const { hiringTimeline } = jobHiringData;

  const renderTimelineItem = (title, data) => (
    <LinearGradient
      colors={["#4158D0", "#C850C0"]}
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
    gap: 12,
  },
  timelineCard: {
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  timelineDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timelineItem: {
    width: '47%',
  },
  itemLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  itemValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
}); 