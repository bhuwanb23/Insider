import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterview } from '../context/InterviewContext';

export default function QuestionStats() {
  const { interviewData } = useInterview();
  const { questionStats } = interviewData;

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return '⬆️';
      case 'decreasing':
        return '⬇️';
      default:
        return '⬆️';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing':
        return '#2ed573';
      case 'decreasing':
        return '#ff4757';
      default:
        return '#575fcf';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>📊</Text>
        <Text style={styles.title}>Question Statistics</Text>
      </View>

      <View style={styles.statsContainer}>
        <LinearGradient
          colors={['#4158D0', '#C850C0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Top Categories</Text>
          {questionStats.topCategories.map((category, index) => (
            <View key={index} style={styles.statItem}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>{category.name}</Text>
                <View style={styles.trendContainer}>
                  <Text style={styles.statValue}>{category.percentage}%</Text>
                  <Text style={[styles.trendIcon, { color: getTrendColor(category.trend) }]}>
                    {getTrendIcon(category.trend)}
                  </Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${category.percentage}%`, backgroundColor: getTrendColor(category.trend) }]} />
              </View>
            </View>
          ))}
        </LinearGradient>

        <LinearGradient
          colors={['#4158D0', '#C850C0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Difficulty Distribution</Text>
          <View>
            {Object.entries(questionStats.difficultyDistribution).map(([level, percentage], index) => (
              <View key={index} style={styles.statItem}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>{level}</Text>
                  <Text style={styles.statValue}>{percentage}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: '#fff' }]} />
                </View>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    paddingTop: 16,
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
  statsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  statItem: {
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
}); 