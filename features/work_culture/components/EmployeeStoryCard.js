import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Badge from '../../tech_stack/components/Badge';

export default function EmployeeStoryCard({ story }) {
  if (!story || Object.keys(story).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No story details available.</Text>
      </View>
    );
  }

  const { name, role, tenure, image, quote, highlights } = story;

  return (
    <LinearGradient
      colors={['#4158D0', '#C850C0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.image}>{image || '👤'}</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{name || 'Unknown Employee'}</Text>
          <Text style={styles.role}>{role || 'Unknown Role'}</Text>
          <Text style={styles.tenure}>{tenure || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.quoteContainer}>
        <Text style={styles.quoteIcon}>"</Text>
        <Text style={styles.quote}>{quote || 'No quote available.'}</Text>
      </View>

      {highlights && highlights.length > 0 && (
        <View style={styles.highlightsContainer}>
          {highlights.map((highlight, index) => (
            <Badge
              key={index}
              label={highlight}
              variant="light"
            />
          ))}
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
    marginHorizontal: 16,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    fontSize: 40,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 2,
  },
  tenure: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
  },
  quoteContainer: {
    marginVertical: 12,
  },
  quoteIcon: {
    fontSize: 40,
    color: '#ffffff',
    opacity: 0.3,
    position: 'absolute',
    top: -20,
    left: -8,
  },
  quote: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 22,
    fontStyle: 'italic',
    paddingLeft: 8,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
}); 