import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Culture({ data }) {
  if (!data) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Company Culture</Text>

        {data.foundersMessage && (
          <LinearGradient
            colors={["#4158D0", "#C850C0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>Founder's Message</Text>
            <Text style={styles.foundersMessage}>{data.foundersMessage}</Text>
          </LinearGradient>
        )}

        {data.pillars && data.pillars.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cultural Pillars</Text>
            <View style={styles.pillarsGrid}>
              {data.pillars.map((pillar, index) => (
                <LinearGradient
                  key={index}
                  colors={['#4158D0', '#C850C0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.pillarChip}
                >
                  <Text style={styles.pillarText}>{pillar}</Text>
                </LinearGradient>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  foundersMessage: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  pillarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pillarChip: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  pillarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
}); 