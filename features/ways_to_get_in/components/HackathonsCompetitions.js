import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWaysToGetIn } from '../context/WaysToGetInContext';

export default function HackathonsCompetitions() {
  const { waysData } = useWaysToGetIn();
  const hackathons = waysData?.hackathons;

  const handlePlatformPress = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  if (!hackathons) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>{hackathons.icon || '🧩'}</Text>
        <Text style={styles.title}>{hackathons.title || 'Hackathons & Competitions'}</Text>
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.mainCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.description}>{hackathons.description}</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Platforms</Text>
        <View style={styles.platformsList}>
          {hackathons.platforms?.map((platform, index) => (
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
                <Text style={styles.platformIcon}>🎯</Text>
                <View style={styles.platformInfo}>
                  <Text style={styles.platformName}>{platform.name}</Text>
                  <Text style={styles.platformUrl}>{platform.url}</Text>
                </View>
                <Text style={styles.visitText}>Visit →</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {hackathons.activeContests?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.activeHeader}>
            <Text style={styles.sectionTitle}>Active Contests</Text>
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          <View style={styles.contestsList}>
            {hackathons.activeContests.map((contest, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contestItem}
                onPress={() => handlePlatformPress(contest.url)}
              >
                <LinearGradient
                  colors={['#4158D0', '#C850C0']}
                  style={styles.contestGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.contestName}>{contest.name}</Text>
                  <Text style={styles.contestDeadline}>Ends: {contest.deadline}</Text>
                  <Text style={styles.applyNow}>Apply Now →</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoText}>
          Participating in hackathons can lead to direct job offers, networking opportunities, and valuable project experience.
        </Text>
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
  activeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  liveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
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
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  platformUrl: {
    fontSize: 12,
    color: '#666',
  },
  visitText: {
    fontSize: 14,
    color: '#4158D0',
    fontWeight: '600',
  },
  contestsList: {
    gap: 12,
  },
  contestItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  contestGradient: {
    padding: 16,
  },
  contestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  contestDeadline: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  applyNow: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'right',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(65, 88, 208, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
  },
}); 