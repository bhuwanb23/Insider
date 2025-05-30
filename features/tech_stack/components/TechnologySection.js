import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import TechnologyCard from './TechnologyCard';
import Badge from './Badge';

export default function TechnologySection({ section, data }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name={data.icon} size={24} color="#6366f1" style={styles.icon} />
        <Text style={styles.title}>{data.title}</Text>
      </View>
      
      {data.categories.map((category, index) => (
        <TechnologyCard
          key={index}
          title={category.title}
          tags={category.tags}
          description={category.description}
          badges={category.badges}
        />
      ))}

      {data.badges && (
        <View style={styles.badgeContainer}>
          {data.badges.map((badge, index) => (
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