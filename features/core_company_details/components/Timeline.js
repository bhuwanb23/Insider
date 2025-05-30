import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCoreCompanyDetails } from '../context/CoreCompanyDetailsContext';

export default function Timeline({ data }) {
  const { companyData } = useCoreCompanyDetails();
  
  // Log raw API response for debugging
  console.log('Raw API Response in Timeline:', JSON.stringify(companyData, null, 2));

  // Use passed data prop if available, otherwise use context data
  const timelineData = data || companyData?.timeline;

  if (!timelineData || timelineData.length === 0) {
    console.log('No timeline data available');
    return (
      <View style={styles.centerContainer}>
        <Text>No timeline information available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.timeline}>
        {timelineData.map((item, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.timelineLine} />
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.year}>{item.year}</Text>
              <LinearGradient
                colors={['#4158D0', '#C850C0']}
                style={styles.eventCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.eventText}>{item.event}</Text>
              </LinearGradient>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  timeline: {
    paddingTop: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 15,
    top: 0,
    bottom: -24,
    width: 2,
    backgroundColor: 'rgba(65, 88, 208, 0.2)',
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4158D0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
  },
  year: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  eventCard: {
    padding: 12,
    borderRadius: 8,
  },
  eventText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}); 