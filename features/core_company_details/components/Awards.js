import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCoreCompanyDetails } from '../context/CoreCompanyDetailsContext';

const CATEGORY_GRADIENTS = {
  workplace: ['#4158D0', '#C850C0'],
  rankings: ['#4091FF', '#3F7EF8'],
  media: ['#8257E5', '#D658D6'],
  csr: ['#0984e3', '#00b894'],
  product: ['#FF9140', '#FBC748'],
};

const CATEGORY_ICONS = {
  workplace: '🏢',
  rankings: '📈',
  media: '📰',
  csr: '🌍',
  product: '🏆',
};

export default function Awards({ data }) {
  const { companyData } = useCoreCompanyDetails();
  
  // Log raw API response for debugging
  console.log('Raw API Response in Awards:', JSON.stringify(companyData, null, 2));

  // Use passed data prop if available, otherwise use context data
  const awardsData = data || companyData?.recognition;

  if (!awardsData) {
    console.log('No awards data available');
    return (
      <View style={styles.centerContainer}>
        <Text>No awards information available</Text>
      </View>
    );
  }

  const handleSourcePress = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const renderAwardCard = (award, category) => (
    <View style={styles.awardCard} key={`${award.title}-${award.year}`}>
      <LinearGradient
        colors={CATEGORY_GRADIENTS[category]}
        style={styles.awardBadge}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.categoryIcon}>{CATEGORY_ICONS[category]}</Text>
          <Text style={styles.awardYear}>{award.year}</Text>
        </View>
        <View style={styles.awardContent}>
          <Text style={styles.awardTitle} numberOfLines={2}>{award.title}</Text>
          {award.rank && (
            <View style={styles.rankContainer}>
              <Text style={styles.rankLabel}>Rank</Text>
              <Text style={styles.rankValue}>#{award.rank}</Text>
            </View>
          )}
          {award.description && (
            <Text style={styles.awardDescription} numberOfLines={2}>
              {award.description}
            </Text>
          )}
        </View>
        {award.source && (
          <TouchableOpacity
            style={styles.sourceButton}
            onPress={() => handleSourcePress(award.source)}
          >
            <Text style={styles.sourceText}>View Source</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );

  const renderCategory = (title, awards, category) => {
    if (!awards || awards.length === 0) return null;
    
    return (
      <View style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryIcon}>{CATEGORY_ICONS[category]}</Text>
          <Text style={styles.categoryTitle}>{title}</Text>
        </View>
        <View style={styles.awardsGrid}>
          {awards.map(award => renderAwardCard(award, category))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {renderCategory('Workplace Excellence', awardsData.workplace, 'workplace')}
        {renderCategory('Rankings & Lists', awardsData.rankings, 'rankings')}
        {renderCategory('Media Recognition', awardsData.media, 'media')}
        {renderCategory('CSR & Sustainability', awardsData.csr, 'csr')}
        {renderCategory('Product Excellence', awardsData.product, 'product')}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  awardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  awardCard: {
    width: '48%',
    height: 200,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  awardBadge: {
    padding: 12,
    height: '100%',
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  awardContent: {
    flex: 1,
  },
  awardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    lineHeight: 20,
  },
  awardYear: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  rankContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  rankLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
  },
  rankValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  awardDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    lineHeight: 18,
  },
  sourceButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  sourceText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}); 