import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import RatingIndicator from './RatingIndicator';
import Badge from '../../tech_stack/components/Badge';

export default function WorkLifeBalanceSection({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No work-life balance data available.</Text>
      </View>
    );
  }

  const { rating, totalReviews, metrics } = data;

  return (
    <View style={styles.sectionContent}>
      {rating !== undefined || totalReviews !== undefined ? (
        <View style={styles.ratingContainer}>
          <RatingIndicator
            score={rating}
            label="Overall Rating"
            size="large"
          />
          <Text style={styles.reviewCount}>
            {totalReviews ? `Based on ${totalReviews} reviews` : 'No review count available.'}
          </Text>
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No overall rating or review count available.</Text>
        </View>
      )}

      {metrics && metrics.length > 0 ? (
        <View style={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <View key={index} style={styles.metricItem}>
              <Text style={styles.metricLabel}>{metric.category || 'N/A'}</Text>
              <RatingIndicator score={metric.score} showText={false} size="small" />
              <Badge label={metric.status || 'N/A'} variant={metric.status === 'great' ? 'success' : 'primary'} />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No detailed metrics available.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
  },
  centeredNoCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 100,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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