import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useNews } from '../context/NewsContext'; // Removed as data is passed via props

export default function TopHeadlines({ data }) {
  // const { newsData } = useNews(); // Removed
  const headlines = data?.headlines || [];

  const handleReadMore = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  if (!headlines || headlines.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No headlines available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>📰</Text>
        <Text style={styles.title}>Latest Headlines</Text>
      </View>

      {headlines.map((article, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handleReadMore(article.url)}
        >
          <LinearGradient
            colors={['#4158D0', '#C850C0']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.sourceDate}>
              <Text style={styles.source}>{article.source}</Text>
              <Text style={styles.date}>{article.date}</Text>
            </View>
            <Text style={styles.headline}>{article.title}</Text>
            <Text style={styles.summary}>{article.summary}</Text>
            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => handleReadMore(article.url)}
            >
              <Text style={styles.readMoreText}>Read More →</Text>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
      ))}
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
    marginBottom: 16,
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
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardGradient: {
    padding: 16,
  },
  sourceDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  source: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.9,
  },
  date: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  headline: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summary: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  readMoreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
}); 