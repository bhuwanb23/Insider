import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterview } from '../context/InterviewContext';

const QuestionStats = () => {
  const { interviewData } = useInterview();

  if (!interviewData || !interviewData.questionStats) {
    return <Text>No question statistics data available.</Text>;
  }

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
                <View style={[
                  styles.trendBadge,
                  { backgroundColor: `${getTrendColor(category.trend)}20` }
                ]}>
                  <Text style={[
                    styles.trendText,
                    { color: getTrendColor(category.trend) }
                  ]}>
                    {getTrendIcon(category.trend)}
                  </Text>
                </View>
              </View>
              <View style={styles.percentageBar}>
                <View style={[styles.percentageFill, { width: `${category.percentage}%` }]} />
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
                  <View style={[styles.difficultyFill, { width: `${percentage}%` }]} />
                  <Text style={styles.difficultyPercentage}>{percentage}%</Text>
                </View>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  categoryRow: {
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    color: '#fff',
    marginRight: 8,
  },
  trendBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 24,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  percentageBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  percentageFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
  },
  percentageText: {
    position: 'absolute',
    right: -24,
    top: -4,
    fontSize: 12,
    color: '#fff',
  },
  difficultyContainer: {
    marginTop: 8,
  },
  difficultyItem: {
    marginBottom: 12,
  },
  difficultyLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  difficultyBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  difficultyFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
  },
  difficultyPercentage: {
    position: 'absolute',
    right: -24,
    top: -4,
    fontSize: 12,
    color: '#fff',
  },
});

export default QuestionStats; 