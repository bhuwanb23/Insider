import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function DiversitySection({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No diversity data available.</Text>
      </View>
    );
  }

  const { stats, initiatives } = data;

  return (
    <View style={styles.sectionContent}>
      {stats && Object.keys(stats).length > 0 ? (
        <View style={styles.statsContainer}>
          <Text style={styles.subheading}>Diversity Statistics</Text>
          {Object.entries(stats).map(([key, value]) => (
            <View key={key} style={styles.statItem}>
              <Text style={styles.statLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
              <Text style={styles.statValue}>{value || 'N/A'}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No diversity statistics available.</Text>
        </View>
      )}

      {initiatives && initiatives.length > 0 ? (
        <View style={styles.initiativesContainer}>
          {initiatives.map((initiative, index) => (
            <View key={index} style={styles.initiativeCard}>
              <Text style={styles.initiativeIcon}>{initiative.icon || ''}</Text>
              <View style={styles.initiativeInfo}>
                <Text style={styles.initiativeName}>{initiative.name || 'N/A'}</Text>
                <Text style={styles.initiativeMembers}>{initiative.members ? `${initiative.members} members` : 'N/A members'}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No diversity initiatives available.</Text>
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
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  initiativesContainer: {
    marginTop: 16,
  },
  initiativeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  initiativeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  initiativeInfo: {
    flex: 1,
  },
  initiativeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  initiativeMembers: {
    fontSize: 12,
    color: '#666',
  },
}); 