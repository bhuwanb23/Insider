import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNews } from '../context/NewsContext';

const { width } = Dimensions.get('window');

const SENTIMENT_COLORS = {
  positive: ['#2E7D32', '#4CAF50'],
  neutral: ['#455A64', '#607D8B'],
  negative: ['#C62828', '#D32F2F'],
};

export default function SocialSentiment() {
  const { newsData } = useNews();

  if (!newsData || !newsData.socialSentiment) return null;

  const { overall, sources, trends } = newsData.socialSentiment;

  const renderSentimentBar = (data, showLabels = true) => {
    return (
      <View style={styles.sentimentBarContainer}>
        <View style={styles.sentimentBar}>
          <LinearGradient
            colors={SENTIMENT_COLORS.positive}
            style={[styles.sentimentFill, { width: `${data.positive}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {showLabels && (
              <Text style={styles.sentimentText}>{data.positive}%</Text>
            )}
          </LinearGradient>
          <LinearGradient
            colors={SENTIMENT_COLORS.neutral}
            style={[styles.sentimentFill, { width: `${data.neutral}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {showLabels && (
              <Text style={styles.sentimentText}>{data.neutral}%</Text>
            )}
          </LinearGradient>
          <LinearGradient
            colors={SENTIMENT_COLORS.negative}
            style={[styles.sentimentFill, { width: `${data.negative}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {showLabels && (
              <Text style={styles.sentimentText}>{data.negative}%</Text>
            )}
          </LinearGradient>
        </View>
        {showLabels && (
          <View style={styles.legendContainer}>
            {[
              { label: 'Positive', colors: SENTIMENT_COLORS.positive },
              { label: 'Neutral', colors: SENTIMENT_COLORS.neutral },
              { label: 'Negative', colors: SENTIMENT_COLORS.negative },
            ].map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <LinearGradient
                  colors={item.colors}
                  style={styles.legendDot}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Social Media Sentiment Analysis</Text>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.cardTitle}>Overall Sentiment Distribution</Text>
        {renderSentimentBar(overall, true)}
      </View>

      <View style={styles.sourcesGrid}>
        {Object.entries(sources).map(([platform, data], index) => (
          <View key={platform} style={styles.sourceCard}>
            <View style={styles.platformHeader}>
              <Text style={styles.platformName}>
                {platform === 'twitter' ? 'Twitter' : platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Text>
            </View>
            {renderSentimentBar(data, false)}
            <View style={styles.platformStats}>
              {[
                { label: 'Positive', value: data.positive },
                { label: 'Neutral', value: data.neutral },
                { label: 'Negative', value: data.negative },
              ].map((item, idx) => (
                <View key={idx} style={styles.statRow}>
                  <Text style={styles.statLabel}>{item.label}</Text>
                  <Text style={styles.statValue}>{item.value}%</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  mainCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#424242',
    marginBottom: 16,
  },
  sentimentBarContainer: {
    marginBottom: 16,
  },
  sentimentBar: {
    height: 32,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  sentimentFill: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sentimentText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    color: '#616161',
    fontSize: 12,
    fontWeight: '400',
  },
  sourcesGrid: {
    paddingHorizontal: 16,
  },
  sourceCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  platformHeader: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  platformName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
  },
  platformStats: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    color: '#616161',
    fontSize: 12,
    fontWeight: '400',
  },
  statValue: {
    color: '#424242',
    fontSize: 12,
    fontWeight: '500',
  },
}); 