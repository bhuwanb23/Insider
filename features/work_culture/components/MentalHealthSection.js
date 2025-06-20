import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RatingIndicator from './RatingIndicator';

export default function MentalHealthSection({ data }) {
  // Helper to extract numeric score from strings like '4.5/5'
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
      <View style={styles.wellnessScore}>
        <Text style={styles.subheading}>Wellness Support Rating</Text>
        <RatingIndicator score={parseScore(data.overallScore)} size="large" />
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.programsContainer}
      >
        {data.programs.map((program, index) => (
          <View
            key={index}
            style={[
              styles.programCard,
              index === data.programs.length - 1 && { marginBottom: 0 },
            ]}
          >
            <Text style={styles.programIcon}>{program.icon}</Text>
            <View style={styles.programInfo}>
              <Text style={styles.programName}>{program.name}</Text>
              <Text style={styles.programDetails}>Coverage: {program.coverage}</Text>
              {program.sessions && (
                <Text style={styles.programDetails}>Sessions: {program.sessions}</Text>
              )}
              {program.apps && program.apps.length > 0 && (
                <Text style={styles.programDetails}>Apps: {program.apps.join(', ')}</Text>
              )}
            </View>
          </View>
        ))}
      </LinearGradient>

      {/* EAP Services Section */}
      {data.eapServices && (
        <View style={styles.eapContainer}>
          <Text style={styles.eapTitle}>EAP Services</Text>
          <Text style={styles.eapDetail}>Available: {data.eapServices.available}</Text>
          <Text style={styles.eapDetail}>Coverage: {data.eapServices.coverage}</Text>
          {data.eapServices.includes && data.eapServices.includes.length > 0 && (
            <Text style={styles.eapDetail}>Includes: {data.eapServices.includes.join(', ')}</Text>
          )}
        </View>
      )}
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
  programCard: {
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
  programIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  programDetails: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  eapContainer: {
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    marginHorizontal: 2,
    elevation: 2,
  },
  eapTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#4158D0',
  },
  eapDetail: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
}); 