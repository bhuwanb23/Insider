import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85; // Made card width 85% of screen width

export default function CommonRoles() {
  const { jobHiringData } = useJobHiring();
  const { commonRoles } = jobHiringData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🧩</Text>
        <Text style={styles.title}>Common Job Roles</Text>
      </View>
      <View style={styles.cardsContainer}>
        {commonRoles.map((role, index) => (
          <LinearGradient
            key={index}
            colors={index % 2 === 0 ? ['#4158D0', '#C850C0'] : ['#6a11cb', '#2575fc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.roleCard}
          >
            <View style={styles.cardContent}>
              <View style={styles.topSection}>
                <View style={styles.iconContainer}>
                  <Text style={styles.roleIcon}>{role.icon}</Text>
                </View>
                <View style={styles.roleInfo}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.departmentText}>{role.department}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.bottomSection}>
                <View style={styles.experienceContainer}>
                  <Text style={styles.labelText}>Experience</Text>
                  <Text style={styles.valueText}>{role.experienceLevel}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <Text style={styles.labelText}>Location</Text>
                  <View style={styles.locationTag}>
                    <Text style={styles.locationText}>{role.location}</Text>
                  </View>
                </View>
              </View>
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
    marginBottom: 20,
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
  cardsContainer: {
    gap: 16,
  },
  roleCard: {
    width: '100%',
    borderRadius: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  cardContent: {
    padding: 14,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  roleIcon: {
    fontSize: 20,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  departmentText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  divider: {
    height: 0.8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 12,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  experienceContainer: {
    flex: 1,
  },
  locationContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  labelText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  valueText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  locationTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 18,
  },
  locationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
}); 