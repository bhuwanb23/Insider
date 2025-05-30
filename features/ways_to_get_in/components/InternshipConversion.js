import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWaysToGetIn } from '../context/WaysToGetInContext';

export default function InternshipConversion() {
  const { waysData } = useWaysToGetIn();
  const internshipConversion = waysData?.internshipConversion;

  if (!internshipConversion) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>{internshipConversion.icon || '🚀'}</Text>
        <Text style={styles.title}>{internshipConversion.title || 'Internship Conversion'}</Text>
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.mainCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{internshipConversion.badge}</Text>
        </View>
        <Text style={styles.description}>{internshipConversion.description}</Text>
      </LinearGradient>

      <View style={styles.statsCard}>
        <View style={styles.rateContainer}>
          <Text style={styles.rateLabel}>Average Conversion Rate</Text>
          <Text style={styles.rateValue}>{internshipConversion.conversionStats?.rate}</Text>
        </View>
        <View style={styles.factorsContainer}>
          <Text style={styles.factorsTitle}>Key Factors</Text>
          {internshipConversion.conversionStats?.factors?.map((factor, index) => (
            <View key={index} style={styles.factorItem}>
              <LinearGradient
                colors={['rgba(65, 88, 208, 0.1)', 'rgba(200, 80, 192, 0.1)']}
                style={styles.factorGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.factorIcon}>🎯</Text>
                <Text style={styles.factorText}>{factor}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Success Tips</Text>
        <View style={styles.tipsList}>
          {internshipConversion.tips?.map((tip, index) => (
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

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>💡</Text>
        <Text style={styles.infoText}>
          Express your interest in a full-time role early and maintain consistent performance throughout your internship.
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
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rateContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  rateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  rateValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4158D0',
  },
  factorsContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 20,
  },
  factorsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  factorItem: {
    marginBottom: 12,
  },
  factorGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  factorIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  factorText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
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