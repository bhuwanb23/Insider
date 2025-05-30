import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWaysToGetIn } from '../context/WaysToGetInContext';

export default function JobPortals() {
  const waysData = useWaysToGetIn();
  const { jobPortals } = waysData;

  const handlePlatformPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>{jobPortals.icon}</Text>
        <Text style={styles.title}>{jobPortals.title}</Text>
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.mainCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.description}>{jobPortals.description}</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Platforms</Text>
        <View style={styles.platformsList}>
          {jobPortals.platforms.map((platform, index) => (
            <TouchableOpacity
              key={index}
              style={styles.platformItem}
              onPress={() => handlePlatformPress(platform.url)}
            >
              <LinearGradient
                colors={['rgba(65, 88, 208, 0.1)', 'rgba(200, 80, 192, 0.1)']}
                style={styles.platformGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.platformIcon}>🔗</Text>
                <Text style={styles.platformName}>{platform.name}</Text>
                <Text style={styles.visitText}>Visit →</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pro Tips</Text>
        <View style={styles.tipsList}>
          {jobPortals.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  mainCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  platformsList: {
    gap: 12,
  },
  platformItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  platformGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  platformIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  platformName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  visitText: {
    fontSize: 14,
    color: '#4158D0',
    fontWeight: '600',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
}); 