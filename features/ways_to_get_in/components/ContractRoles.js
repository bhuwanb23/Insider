import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWaysToGetIn } from '../context/WaysToGetInContext';

export default function ContractRoles() {
  const waysData = useWaysToGetIn();
  const { contractRoles } = waysData;

  const handlePlatformPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>{contractRoles.icon}</Text>
        <Text style={styles.title}>{contractRoles.title}</Text>
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.mainCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{contractRoles.badge}</Text>
        </View>
        <Text style={styles.description}>{contractRoles.description}</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Platforms</Text>
        <View style={styles.platformsList}>
          {contractRoles.platforms.map((platform, index) => (
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Success Tips</Text>
        <View style={styles.tipsList}>
          {contractRoles.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <LinearGradient
                colors={['#4158D0', '#C850C0']}
                style={styles.tipGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.tipNumber}>{index + 1}</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.benefitsCard}>
        <Text style={styles.benefitsTitle}>Benefits of Contract Work</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💪</Text>
            <Text style={styles.benefitText}>Build diverse experience</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>⏰</Text>
            <Text style={styles.benefitText}>Flexible work hours</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💼</Text>
            <Text style={styles.benefitText}>Multiple income streams</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🌍</Text>
            <Text style={styles.benefitText}>Work with global clients</Text>
          </View>
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
  badgeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badge: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  tipsList: {
    gap: 12,
  },
  tipItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  tipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
  },
  benefitsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(65, 88, 208, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
}); 