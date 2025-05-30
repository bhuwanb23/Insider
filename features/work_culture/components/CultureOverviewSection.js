import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Badge from '../../tech_stack/components/Badge';

export default function CultureOverviewSection({ data }) {
  return (
    <View style={styles.sectionContent}>
      <View style={styles.valuesList}>
        {data.coreValues.map((value, index) => (
          <View key={index} style={styles.valueItem}>
            <Text style={styles.valueIcon}>{value.icon}</Text>
            <Text style={styles.valueTitle}>{value.value}</Text>
            <Text style={styles.valueDescription}>{value.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.culturalVibeContainer}>
        <Text style={styles.subheading}>Cultural Vibe</Text>
        <Text style={styles.vibeText}>
          {data.culturalVibe.icon} {data.culturalVibe.type}
        </Text>
        <View style={styles.attributesContainer}>
          {data.culturalVibe.attributes.map((attr, index) => (
            <Badge key={index} label={attr} variant="primary" />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  valuesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  valueItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  valueIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  valueDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  culturalVibeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  vibeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  attributesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
}); 