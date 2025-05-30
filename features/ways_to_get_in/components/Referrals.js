import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWaysToGetIn } from '../context/WaysToGetInContext';

export default function Referrals() {
  const waysData = useWaysToGetIn();
  const { referrals } = waysData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>{referrals.icon}</Text>
        <Text style={styles.title}>{referrals.title}</Text>
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.mainCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.description}>{referrals.description}</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Ask for a Referral</Text>
        <View style={styles.stepsList}>
          {referrals.howToAsk.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <LinearGradient
                colors={['rgba(65, 88, 208, 0.1)', 'rgba(200, 80, 192, 0.1)']}
                style={styles.stepGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Networking Tips</Text>
        <View style={styles.tipsList}>
          {referrals.tips.map((tip, index) => (
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
  stepsList: {
    gap: 12,
  },
  stepItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  stepGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4158D0',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
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