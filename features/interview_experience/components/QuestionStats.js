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
        return '#fff';
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
            <View key={index} style={styles.categoryRow}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <View style={styles.trendBadge}>
                  <Text style={[styles.trendText, { color: getTrendColor(category.trend) }]}>
                    {getTrendIcon(category.trend)}
                  </Text>
                </View>
              </View>
              <View style={styles.percentageBar}>
                <LinearGradient
                  colors={['#7FD7B9', getTrendColor(category.trend)]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.percentageFill, { width: `${category.percentage}%` }]} 
                />
                <Text style={styles.percentageText}>{category.percentage}%</Text>
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
          <View style={styles.difficultyContainer}>
            {Object.entries(questionStats.difficultyDistribution).map(([level, percentage], index) => (
              <View key={index} style={styles.difficultyItem}>
                <Text style={styles.difficultyLabel}>{level}</Text>
                <View style={styles.difficultyBar}>
                  <LinearGradient
                    colors={['#7FD7B9', '#C850C0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.difficultyFill, { width: `${percentage}%` }]} 
                  />
                  <Text style={styles.difficultyPercentage}>{percentage}%</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
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
  statsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 15,
    color: '#fff',
    marginRight: 10,
    fontWeight: '500',
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  trendText: {
    fontSize: 13,
    fontWeight: '700',
  },
  percentageBar: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  percentageFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 5,
  },
  percentageText: {
    position: 'absolute',
    right: 8,
    top: -2,
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  difficultyContainer: {
    marginTop: 10,
  },
  difficultyItem: {
    marginBottom: 14,
  },
  difficultyLabel: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 6,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  difficultyBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  difficultyFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 5,
  },
  difficultyPercentage: {
    position: 'absolute',
    right: 8,
    top: -2,
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}); 