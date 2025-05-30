import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RatingIndicator from './RatingIndicator';
import Badge from '../../tech_stack/components/Badge';

export default function WorkLifeBalanceSection({ data }) {
  return (
    <View style={styles.sectionContent}>
      <View style={styles.ratingContainer}>
        <RatingIndicator
          score={data.rating}
          label="Overall Rating"
          size="large"
        />
        <Text style={styles.reviewCount}>
          Based on {data.totalReviews} reviews
        </Text>
      </View>

      <View style={styles.metricsContainer}>
        {data.metrics.map((metric, index) => (
          <View key={index} style={styles.metricItem}>
            <Text style={styles.metricLabel}>{metric.category}</Text>
            <RatingIndicator score={metric.score} showText={false} size="small" />
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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  metricLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
}); 