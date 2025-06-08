import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function HiringChannels() {
  const { jobHiringData, loading, error } = useJobHiring();

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#4158D0" /><Text style={styles.centeredText}>Loading hiring channels...</Text></View>;
  }

  if (error || !jobHiringData || !jobHiringData.hiringChannels || jobHiringData.hiringChannels.length === 0) {
    return <View style={styles.centered}><Text style={styles.centeredText}>{error || 'No hiring channels data available.'}</Text></View>;
  }

  const { hiringChannels } = jobHiringData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🧭</Text>
        <Text style={styles.title}>Popular Hiring Channels</Text>
      </View>
      <View style={styles.channelsContainer}>
        {hiringChannels.map((channel, index) => (
          <LinearGradient
            key={index}
            colors={['#4158D0', '#C850C0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.channelCard}
          >
            <View style={styles.channelHeader}>
              <Image 
                source={{ uri: channel.logo }}
                style={styles.channelLogo}
                resizeMode="contain"
              />
              <Text style={styles.channelName}>{channel.name}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{channel.successRate}%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
              {channel.activeListings && (
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{channel.activeListings}</Text>
                  <Text style={styles.statLabel}>Active Listings</Text>
                </View>
              )}
              {channel.partnerInstitutes && (
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{channel.partnerInstitutes}</Text>
                  <Text style={styles.statLabel}>Partner Institutes</Text>
                </View>
              )}
              {channel.bonusAmount && (
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{channel.bonusAmount}</Text>
                  <Text style={styles.statLabel}>Referral Bonus</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  channelsContainer: {
    gap: 16,
  },
  channelCard: {
    padding: 16,
    borderRadius: 12,
  },
  channelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  channelLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    marginRight: 12,
  },
  channelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    minWidth: '45%',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
}); 