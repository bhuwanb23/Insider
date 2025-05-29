import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Full width minus padding

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
    width: CARD_WIDTH,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardContent: {
    padding: 20,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleIcon: {
    fontSize: 24,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  departmentText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 16,
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
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  locationTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
}); 