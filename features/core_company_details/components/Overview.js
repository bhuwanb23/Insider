import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCompany } from '../context/CompanyContext';

export default function Overview() {
  const { companyData } = useCompany();
  const { overview } = companyData;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <LinearGradient
          colors={['#4158D0', '#C850C0']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.heroTitle}>About Us</Text>
          <Text style={styles.heroText}>{overview.description}</Text>
        </LinearGradient>

        <View style={styles.quickInfo}>
          <View style={styles.quickInfoCard}>
            <Text style={styles.quickInfoIcon}>💡</Text>
            <Text style={styles.quickInfoTitle}>What We Do</Text>
            <Text style={styles.quickInfoText} numberOfLines={3}>{overview.whatWeDo}</Text>
          </View>
        </View>

        <View style={styles.marketsSection}>
          <View style={styles.marketsSectionHeader}>
            <Text style={styles.marketsSectionIcon}>🎯</Text>
            <Text style={styles.marketsSectionTitle}>Key Markets</Text>
          </View>
          <View style={styles.marketsGrid}>
            {overview.keyMarkets.map((market, index) => (
              <LinearGradient
                key={index}
                colors={['#4091FF', '#3F7EF8']}
                style={styles.marketTag}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.marketText}>{market}</Text>
              </LinearGradient>
            ))}
          </View>
        </View>

        <View style={styles.visionMissionContainer}>
          <LinearGradient
            colors={['#4158D0', '#C850C0']}
            style={styles.visionCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.cardIcon}>🔭</Text>
            <Text style={styles.cardTitle}>Vision</Text>
            <Text style={styles.cardText}>{overview.vision}</Text>
          </LinearGradient>

          <View style={styles.missionCard}>
            <Text style={styles.cardIcon}>🎯</Text>
            <Text style={[styles.cardTitle, styles.missionTitle]}>Mission</Text>
            <Text style={[styles.cardText, styles.missionText]}>{overview.mission}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⭐</Text>
            <Text style={styles.sectionTitle}>Core Values</Text>
          </View>
          <View style={styles.valuesGrid}>
            {overview.coreValues.map((value, index) => (
              <LinearGradient
                key={index}
                colors={['#8257E5', '#D658D6']}
                style={styles.valueCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.valueText}>{value}</Text>
              </LinearGradient>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🌏</Text>
            <Text style={styles.sectionTitle}>Global Presence</Text>
          </View>
          <View style={styles.presenceGrid}>
            {overview.globalPresence.map((country, index) => (
              <View key={index} style={styles.countryCard}>
                <Text style={styles.countryText}>{country}</Text>
              </View>
            ))}
          </View>
        </View>
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
  heroCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  quickInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  quickInfoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickInfoIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  quickInfoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  marketsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  marketsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  marketsSectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  marketsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  marketsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  marketTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  marketText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  visionMissionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  visionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  missionCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16,
  },
  missionTitle: {
    color: '#1a1a1a',
  },
  missionText: {
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  valueCard: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: '45%',
  },
  valueText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  presenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  countryCard: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countryText: {
    fontSize: 12,
    color: '#4158D0',
    fontWeight: '500',
  },
}); 