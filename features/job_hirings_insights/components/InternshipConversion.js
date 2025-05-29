import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function InternshipConversion() {
  const { jobHiringData } = useJobHiring();
  const { internshipConversion } = jobHiringData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🔁</Text>
        <Text style={styles.title}>Internship to Full-Time Conversion</Text>
      </View>
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.conversionCard}
      >
        <View style={styles.rateContainer}>
          <Text style={styles.rateText}>{internshipConversion.rate}%</Text>
          <Text style={styles.rateLabel}>Conversion Rate</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{internshipConversion.totalInterns}</Text>
            <Text style={styles.statLabel}>Total Interns</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{internshipConversion.convertedCount}</Text>
            <Text style={styles.statLabel}>Converted</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>+{internshipConversion.yearOverYearGrowth}%</Text>
            <Text style={styles.statLabel}>YoY Growth</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${internshipConversion.rate}%` }]} />
        </View>
      </LinearGradient>
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
  conversionCard: {
    padding: 20,
    borderRadius: 12,
  },
  rateContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  rateText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  rateLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
}); 