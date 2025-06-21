import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RatingIndicator from './RatingIndicator';
import Badge from '../../tech_stack/components/Badge';

export default function WorkLifeBalanceSection({ data }) {
  // Helper to extract numeric score from strings like '4.2/5'
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
      {/* Overall Rating Block */}
      <View style={styles.overallRatingBlock}>
        <Text style={styles.overallLabel}>Work-Life Balance</Text>
        <RatingIndicator
          score={parseScore(data.rating)}
          label={null}
          size="xlarge"
        />
        <Text style={styles.overallScoreText}>{parseScore(data.rating)}/5</Text>
        <Text style={styles.reviewCount}>
          Based on {data.totalReviews} reviews
        </Text>
        {data.positivePercentage && (
          <Text style={styles.positivePercentage}>
            {data.positivePercentage} positive reviews
          </Text>
        )}
      </View>

      {/* Work Hours Section */}
      {data.workHours && (
        <View style={styles.workHoursContainer}>
          <Text style={styles.workHoursTitle}>Work Hours</Text>
          <View style={styles.workHoursRow}><Text style={styles.workHoursLabel}>Type:</Text><Text style={styles.workHoursValue}>{data.workHours.type}</Text></View>
          <View style={styles.workHoursRow}><Text style={styles.workHoursLabel}>Standard:</Text><Text style={styles.workHoursValue}>{data.workHours.standard}</Text></View>
          <View style={styles.workHoursRow}><Text style={styles.workHoursLabel}>Flexibility:</Text><Text style={styles.workHoursValue}>{data.workHours.flexibility}</Text></View>
          <View style={styles.workHoursRow}><Text style={styles.workHoursLabel}>Time Zones:</Text><Text style={styles.workHoursValue}>{data.workHours.timeZones}</Text></View>
        </View>
      )}

      {/* Metrics Section */}
      <Text style={styles.metricsHeader}>Detailed Metrics</Text>
      <View style={styles.metricsGrid}>
        {data.metrics.map((metric, index) => (
          <View
            key={index}
            style={styles.metricCard}
          >
            <Text style={styles.metricLabel}>{metric.category}</Text>
            <RatingIndicator score={parseScore(metric.score)} showText={false} size="medium" />
            <Badge label={metric.status} variant={metric.status === 'great' ? 'success' : 'primary'} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  overallRatingBlock: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  overallLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4158D0',
    marginBottom: 8,
  },
  overallScoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
    marginBottom: 4,
  },
  ratingContainer: {
    display: 'none', // Hide old rating container
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  positivePercentage: {
    fontSize: 12,
    color: '#2ecc71',
    marginTop: 2,
    fontWeight: '500',
  },
  workHoursContainer: {
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 2,
    elevation: 2,
  },
  workHoursTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#4158D0',
  },
  workHoursRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  workHoursLabel: {
    fontWeight: '500',
    color: '#333',
    width: 90,
    fontSize: 13,
  },
  workHoursValue: {
    color: '#555',
    fontSize: 13,
    flex: 1,
  },
  metricsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4158D0',
    marginBottom: 10,
    marginLeft: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    fontWeight: '500',
    color: '#4158D0',
    marginBottom: 6,
  },
}); 