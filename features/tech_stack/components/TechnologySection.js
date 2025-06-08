import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import TechnologyCard from './TechnologyCard';
import Badge from './Badge';

export default function TechnologySection({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No technology data available for this section.</Text>
      </View>
    );
  }

  const { icon, title, categories, badges } = data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name={icon || 'question-circle'} size={24} color="#6366f1" style={styles.icon} />
        <Text style={styles.title}>{title || 'Unknown Section'}</Text>
      </View>
      
      {categories && categories.length > 0 ? (
        categories.map((category, index) => (
          <TechnologyCard
            key={index}
            title={category.title}
            tags={category.tags}
            description={category.description}
            badges={category.badges}
          />
        ))
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No categories available for this section.</Text>
        </View>
      )}

      {badges && badges.length > 0 && (
        <View style={styles.badgeContainer}>
          {badges.map((badge, index) => (
            <Badge key={index} label={badge} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 16,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
}); 