import React from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useNews } from '../context/NewsContext'; // Removed as data is passed via props

const { width } = Dimensions.get('window');

const SENTIMENT_COLORS = {
  positive: ['#2E7D32', '#4CAF50'],
  neutral: ['#455A64', '#607D8B'],
  negative: ['#C62828', '#D32F2F'],
};

export default function SocialSentiment({ data }) {
  // const { newsData } = useNews(); // Removed
  const socialSentiment = data?.socialSentiment || {};
  const { overall, sources, trends } = socialSentiment;

  if (!socialSentiment || Object.keys(socialSentiment).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No social sentiment data available.</Text>
      </View>
    );
  }

  const renderSentimentBar = (sentimentData, showLabels = true) => {
    if (!sentimentData || (sentimentData.positive === undefined && sentimentData.neutral === undefined && sentimentData.negative === undefined)) {
      return <Text style={styles.noSentimentText}>No sentiment data for this section.</Text>;
    }
    const positive = sentimentData.positive || 0;
    const neutral = sentimentData.neutral || 0;
    const negative = sentimentData.negative || 0;

    return (
      <View style={styles.sentimentBarContainer}>
        <View style={styles.sentimentBar}>
          <LinearGradient
            colors={SENTIMENT_COLORS.positive}
            style={[styles.sentimentFill, { width: `${positive}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {showLabels && (
              <Text style={styles.sentimentText}>{positive}%</Text>
            )}
          </LinearGradient>
          <LinearGradient
            colors={SENTIMENT_COLORS.neutral}
            style={[styles.sentimentFill, { width: `${neutral}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {showLabels && (
              <Text style={styles.sentimentText}>{neutral}%</Text>
            )}
          </LinearGradient>
          <LinearGradient
            colors={SENTIMENT_COLORS.negative}
            style={[styles.sentimentFill, { width: `${negative}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {showLabels && (
              <Text style={styles.sentimentText}>{negative}%</Text>
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

      {overall && Object.keys(overall).length > 0 ? (
        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>Overall Sentiment Distribution</Text>
          {renderSentimentBar(overall, true)}
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No overall sentiment data available.</Text>
        </View>
      )}

      {sources && Object.keys(sources).length > 0 ? (
        <View style={styles.sourcesGrid}>
          {Object.entries(sources).map(([platform, sentimentData], index) => (
            <View key={platform} style={styles.sourceCard}>
              <View style={styles.platformHeader}>
                <Text style={styles.platformName}>
                  {platform === 'twitter' ? 'Twitter' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Text>
              </View>
              {renderSentimentBar(sentimentData, false)}
              <View style={styles.platformStats}>
                {[
                  { label: 'Positive', value: sentimentData.positive },
                  { label: 'Neutral', value: sentimentData.neutral },
                  { label: 'Negative', value: sentimentData.negative },
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
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No sentiment source data available.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200, // Added for better visibility of loading/error
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
  noSentimentText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
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