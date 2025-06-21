import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function HiringTimeline() {
  const { jobHiringData } = useJobHiring();
  const { hiringTimeline } = jobHiringData;

  const renderTimelineItem = (title, data, icon) => {
    const details = [
      { label: 'Period', value: data.period },
      { label: 'Frequency', value: data.frequency },
    ];
    if (data.nextDrive) details.push({ label: 'Next Drive', value: data.nextDrive });
    if (data.averageOpenings) details.push({ label: 'Avg. Openings', value: data.averageOpenings });
    if (data.lastEvent) details.push({ label: 'Last Event', value: data.lastEvent });

    return (
      <LinearGradient
        colors={["#4158D0", "#C850C0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.timelineCard}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{icon}</Text>
          <Text style={styles.timelineTitle}>{title}</Text>
        </View>
        <View>
          {details.map((item, index) => (
            <View key={index} style={[styles.timelineRow, index === details.length - 1 && styles.lastTimelineRow]}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🗓️</Text>
        <Text style={styles.title}>Hiring Timeline</Text>
      </View>
      <View style={styles.timelineContainer}>
        {renderTimelineItem('Campus Hiring', hiringTimeline.campus, '🎓')}
        {renderTimelineItem('Off-Campus', hiringTimeline.offCampus, '🏢')}
        {renderTimelineItem('Hackathons', hiringTimeline.hackathons, '💻')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4158D0',
  },
  timelineContainer: {
    gap: 16,
    paddingHorizontal: 16,
  },
  timelineCard: {
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  timelineTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  lastTimelineRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  itemLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  itemValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
}); 