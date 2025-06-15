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
      <View style={styles.ratingContainer}>
        <RatingIndicator
          score={parseScore(data.rating)}
          label="Overall Rating"
          size="large"
        />
        <Text style={styles.reviewCount}>
          Based on {data.totalReviews} reviews
        </Text>
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.metricsContainer}
      >
        {data.metrics.map((metric, index) => (
          <View
            key={index}
            style={[
              styles.metricItem,
              index === data.metrics.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Text style={styles.metricLabel}>{metric.category}</Text>
            <RatingIndicator score={parseScore(metric.score)} showText={false} size="small" />
            <Badge label={metric.status} variant={metric.status === 'great' ? 'success' : 'primary'} />
          </View>
        ))}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  metricsContainer: {
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
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  metricLabel: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    fontWeight: '500',
  },
}); 