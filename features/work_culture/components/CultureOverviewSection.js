import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Badge from '../../tech_stack/components/Badge';

export default function CultureOverviewSection({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No culture overview data available.</Text>
      </View>
    );
  }

  const { coreValues, culturalVibe } = data;

  return (
    <View style={styles.sectionContent}>
      {coreValues && coreValues.length > 0 ? (
        <View style={styles.valuesList}>
          {coreValues.map((value, index) => (
            <View key={index} style={styles.valueItem}>
              <Text style={styles.valueIcon}>{value.icon || ''}</Text>
              <Text style={styles.valueTitle}>{value.value || 'N/A'}</Text>
              <Text style={styles.valueDescription}>{value.description || 'No description.'}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No core values available.</Text>
        </View>
      )}

      {culturalVibe && Object.keys(culturalVibe).length > 0 ? (
        <View style={styles.culturalVibeContainer}>
          <Text style={styles.subheading}>Cultural Vibe</Text>
          <Text style={styles.vibeText}>
            {culturalVibe.icon || ''} {culturalVibe.type || 'N/A'}
          </Text>
          {culturalVibe.attributes && culturalVibe.attributes.length > 0 ? (
            <View style={styles.attributesContainer}>
              {culturalVibe.attributes.map((attr, index) => (
                <Badge key={index} label={attr} variant="primary" />
              ))}
            </View>
          ) : (
            <View style={styles.centeredNoCardSmall}>
              <Text style={styles.centeredTextSmall}>No attributes available.</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No cultural vibe data available.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
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
  centeredNoCardSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    minHeight: 50,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  centeredTextSmall: {
    fontSize: 12,
    color: '#888',
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