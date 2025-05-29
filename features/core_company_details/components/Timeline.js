import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useCompany } from '../context/CompanyContext';

export default function Timeline() {
  const { companyData } = useCompany();
  const { timeline } = companyData;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Company Timeline</Text>
        <Text style={styles.headerSubtitle}>Key milestones in our journey</Text>
      </LinearGradient>

      <View style={styles.timelineContainer}>
        {timeline.map((event, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index * 200}
            style={styles.timelineItem}
          >
            <View style={styles.timelineLine} />
            <View style={styles.timelineDot}>
              <LinearGradient
                colors={['#4158D0', '#C850C0']}
                style={styles.dot}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.year}>{event.year}</Text>
              <LinearGradient
                colors={['#ffffff', '#f8f9fa']}
                style={styles.eventCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.eventText}>{event.event}</Text>
              </LinearGradient>
            </View>
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  timelineContainer: {
    padding: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 32,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 35,
    top: 0,
    bottom: -40,
    width: 2,
    backgroundColor: 'rgba(65, 88, 208, 0.2)',
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 8,
  },
  year: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4158D0',
    marginBottom: 8,
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventText: {
    fontSize: 16,
    color: '#1a1a1a',
    lineHeight: 24,
  },
}); 