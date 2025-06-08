import React from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useNews } from '../context/NewsContext'; // Removed as data is passed via props

const { width } = Dimensions.get('window');

const CATEGORY_GRADIENTS = {
  Funding: ['#4158D0', '#C850C0'],
  Product: ['#4158D0', '#C850C0'],
  Awards: ['#4158D0', '#C850C0'],
  Growth: ['#4158D0', '#C850C0'],
  Culture: ['#4158D0', '#C850C0'],
  Default: ['#4158D0', '#C850C0'],
};

const CATEGORY_ICONS = {
  Funding: '💰',
  Product: '🚀',
  Awards: '🏆',
  Growth: '📈',
  Culture: '🌟',
  Default: '✨',
};

export default function HighlightSnippets({ data }) {
  // const { newsData } = useNews(); // Removed
  const highlights = data?.highlights || [];

  if (!highlights || highlights.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No highlights available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🏆</Text>
        <Text style={styles.title}>Key Highlights</Text>
      </View>

      <View style={styles.highlightsGrid}>
        {highlights.map((highlight, index) => (
          <LinearGradient
            key={index}
            colors={CATEGORY_GRADIENTS[highlight.category] || CATEGORY_GRADIENTS.Default}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardContent}>
              <View style={styles.categoryContainer}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                  style={styles.categoryIconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.categoryIcon}>
                    {CATEGORY_ICONS[highlight.category] || CATEGORY_ICONS.Default}
                  </Text>
                </LinearGradient>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{highlight.category}</Text>
                </View>
              </View>

              <Text style={styles.highlightTitle}>{highlight.title}</Text>
              <Text style={styles.description}>{highlight.description}</Text>

              <View style={styles.dateContainer}>
                <Text style={styles.dateIcon}>📅</Text>
                <Text style={styles.date}>{highlight.date}</Text>
              </View>
            </View>

            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.1)']}
              style={styles.cardOverlay}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </LinearGradient>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  highlightsGrid: {
    flexDirection: 'column',
    marginHorizontal: 16,
  },
  card: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardContent: {
    padding: 20,
    zIndex: 1,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 0,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  highlightTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.9,
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  date: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
}); 