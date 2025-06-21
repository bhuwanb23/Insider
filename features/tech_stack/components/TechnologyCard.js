import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Badge from './Badge';

export default function TechnologyCard({ title, tags, description, badges }) {
  return (
    <TouchableOpacity style={styles.card}>
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {badges && badges.length > 0 && (
              <View style={styles.headerBadges}>
                {badges.map((badge, index) => (
                  <Badge key={index} label={badge} variant="light" />
                ))}
              </View>
            )}
          </View>

          {description && (
            <Text style={styles.description}>{description}</Text>
          )}

          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#ffffff',
  },
  cardGradient: {
    borderRadius: 14,
  },
  contentWrapper: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  headerBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 1,
  },
  description: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.95,
    marginBottom: 14,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    margin: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.9,
    letterSpacing: 0.1,
  },
}); 