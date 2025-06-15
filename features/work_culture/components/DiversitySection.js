import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DiversitySection({ data }) {
  return (
    <View style={styles.sectionContent}>
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statsContainer}
      >
        <Text style={styles.subheading}>Diversity Statistics</Text>
        {Object.entries(data.stats).map(([key, value]) => (
          <View key={key} style={styles.statItem}>
            <Text style={styles.statLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
            <Text style={styles.statValue}>{value}</Text>
          </View>
        ))}
      </LinearGradient>

      <View style={styles.initiativesContainer}>
        {data.initiatives.map((initiative, index) => (
          <LinearGradient
            key={index}
            colors={['#4158D0', '#C850C0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.initiativeCard}
          >
            <Text style={styles.initiativeIcon}>{initiative.icon}</Text>
            <View style={styles.initiativeInfo}>
              <Text style={styles.initiativeName}>{initiative.name}</Text>
              <Text style={styles.initiativeMembers}>{initiative.members} members</Text>
            </View>
          </LinearGradient>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  statsContainer: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'capitalize',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  initiativesContainer: {
    marginTop: 16,
  },
  initiativeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  initiativeIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  initiativeInfo: {
    flex: 1,
  },
  initiativeName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  initiativeMembers: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
}); 