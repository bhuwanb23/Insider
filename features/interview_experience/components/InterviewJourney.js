import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterview } from '../context/InterviewContext';

const InterviewJourney = () => {
  const { interviewData } = useInterview();

  if (!interviewData || !interviewData.journey) {
    return <Text>No interview journey data available.</Text>;
  }

  const { steps } = interviewData.journey;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🛤️</Text>
        <Text style={styles.title}>Interview Journey Overview</Text>
      </View>

      <View style={styles.timeline}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.stepConnector}>
              <View style={styles.line} />
              <LinearGradient
                colors={['#4158D0', '#C850C0']}
                style={styles.dot}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.stepIcon}>{step.icon}</Text>
              </LinearGradient>
            </View>

            <LinearGradient
              colors={['#4158D0', '#C850C0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.stepCard}
            >
              <View style={styles.stepHeader}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <View style={styles.durationTag}>
                  <Text style={styles.durationText}>⏱️ {step.duration}</Text>
                </View>
              </View>

              <Text style={styles.stepDescription}>{step.description}</Text>

              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{step.status}</Text>
              </View>
            </LinearGradient>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
  timeline: {
    paddingLeft: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepConnector: {
    width: 40,
    alignItems: 'center',
    marginLeft: -20,
    marginRight: 12,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#4158D0',
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4158D0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  stepIcon: {
    fontSize: 18,
  },
  stepCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'nowrap',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  durationTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    flexShrink: 0,
  },
  durationText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  stepDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  statusContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});

export default InterviewJourney; 