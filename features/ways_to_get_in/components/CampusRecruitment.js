import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWaysToGetIn } from '../context/WaysToGetInContext';

export default function CampusRecruitment() {
  const { waysData } = useWaysToGetIn();
  const campusRecruitment = waysData?.campusRecruitment;

  if (!campusRecruitment) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>{campusRecruitment.icon || '🎓'}</Text>
        <Text style={styles.title}>{campusRecruitment.title || 'Campus Recruitment'}</Text>
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.mainCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{campusRecruitment.badge}</Text>
        </View>
        <Text style={styles.description}>{campusRecruitment.description}</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Process Overview</Text>
        <View style={styles.detailsList}>
          {campusRecruitment.details?.map((detail, index) => (
            <View key={index} style={styles.detailItem}>
              <LinearGradient
                colors={['rgba(65, 88, 208, 0.1)', 'rgba(200, 80, 192, 0.1)']}
                style={styles.detailGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.detailNumber}>{index + 1}</Text>
                <Text style={styles.detailText}>{detail}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pro Tips</Text>
        <View style={styles.tipsList}>
          {campusRecruitment.tips?.map((tip, index) => (
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
    marginBottom: 16,
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
  detailsList: {
    gap: 12,
  },
  detailItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  detailNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4158D0',
    marginRight: 12,
    backgroundColor: '#fff',
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
  },
  detailText: {
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