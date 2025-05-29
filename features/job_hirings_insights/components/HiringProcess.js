import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function HiringProcess() {
  const { jobHiringData } = useJobHiring();
  const { hiringProcess } = jobHiringData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>📃</Text>
        <Text style={styles.title}>Hiring Process</Text>
      </View>
      <View style={styles.processContainer}>
        {hiringProcess.map((stage, index) => (
          <View key={index} style={styles.stageWrapper}>
            <View style={styles.connector}>
              <View style={styles.line} />
              <View style={styles.dot} />
            </View>
            <LinearGradient
              colors={['#4158D0', '#C850C0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.stageCard}
            >
              <Text style={styles.stageTitle}>{stage.stage}</Text>
              <Text style={styles.stageDuration}>{stage.duration}</Text>
              
              {stage.successRate && (
                <View style={styles.successRate}>
                  <Text style={styles.successLabel}>Success Rate</Text>
                  <Text style={styles.successValue}>{stage.successRate}%</Text>
                </View>
              )}

              {stage.tips && (
                <Text style={styles.tips}>💡 {stage.tips}</Text>
              )}

              {stage.topics && (
                <View style={styles.topicsContainer}>
                  {stage.topics.map((topic, idx) => (
                    <View key={idx} style={styles.topicTag}>
                      <Text style={styles.topicText}>{topic}</Text>
                    </View>
                  ))}
                </View>
              )}

              {stage.focusAreas && (
                <View style={styles.topicsContainer}>
                  {stage.focusAreas.map((area, idx) => (
                    <View key={idx} style={styles.topicTag}>
                      <Text style={styles.topicText}>{area}</Text>
                    </View>
                  ))}
                </View>
              )}

              {stage.includes && (
                <View style={styles.topicsContainer}>
                  {stage.includes.map((item, idx) => (
                    <View key={idx} style={styles.topicTag}>
                      <Text style={styles.topicText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}
            </LinearGradient>
          </View>
        ))}
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
  processContainer: {
    paddingLeft: 24,
  },
  stageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  connector: {
    width: 24,
    alignItems: 'center',
    marginLeft: -24,
    marginRight: 12,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#4158D0',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4158D0',
    position: 'absolute',
    top: 24,
  },
  stageCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  stageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  stageDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  successRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  successLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  successValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  tips: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 12,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topicText: {
    fontSize: 12,
    color: '#fff',
  },
}); 