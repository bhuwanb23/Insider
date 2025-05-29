import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 64) / 2; // For 2 cards per row with spacing

export default function JobTrends() {
  const { jobHiringData } = useJobHiring();
  const { jobTrends } = jobHiringData;

  const gradients = {
    blue: ['#4158D0', '#C850C0'],
    purple: ['#6a11cb', '#2575fc'],
    orange: ['#FF512F', '#F09819'],
    teal: ['#0093E9', '#80D0C7'],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>📈</Text>
        <Text style={styles.title}>Recent Job Trends</Text>
      </View>
      
      {/* Growth Stats */}
      <View style={styles.trendsContainer}>
        {Object.entries(jobTrends.quarterlyGrowth).map(([dept, growth], index) => (
          <LinearGradient
            key={index}
            colors={index % 2 === 0 ? gradients.blue : gradients.purple}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.trendCard}
          >
            <Text style={styles.growthValue}>↑ {growth}%</Text>
            <Text style={styles.growthLabel}>{dept.charAt(0).toUpperCase() + dept.slice(1)} Growth</Text>
            <Text style={styles.periodLabel}>This Quarter</Text>
          </LinearGradient>
        ))}
      </View>

      {/* Top Locations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Hiring Locations</Text>
        <View style={styles.locationsGrid}>
          {jobTrends.topLocations.map((location, index) => (
            <LinearGradient
              key={index}
              colors={index % 2 === 0 ? gradients.orange : gradients.teal}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.locationCard}
            >
              <View style={styles.locationIconContainer}>
                <Text style={styles.locationIcon}>📍</Text>
              </View>
              <Text style={styles.locationName}>{location.city}</Text>
              <Text style={styles.locationCountry}>{location.country}</Text>
              <View style={styles.openingsTag}>
                <Text style={styles.openingsText}>{location.openings} openings</Text>
              </View>
            </LinearGradient>
          ))}
        </View>
      </View>

      {/* Top Departments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Hiring Departments</Text>
        <View style={styles.departmentsGrid}>
          {jobTrends.topDepartments.map((dept, index) => (
            <LinearGradient
              key={index}
              colors={index % 2 === 0 ? gradients.purple : gradients.blue}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.departmentCard}
            >
              <View style={styles.deptHeader}>
                <View style={styles.deptIconContainer}>
                  <Text style={styles.deptIcon}>👥</Text>
                </View>
                <Text style={styles.departmentName}>{dept.name}</Text>
              </View>
              <View style={styles.deptStats}>
                <View style={styles.positionsContainer}>
                  <Text style={styles.statsLabel}>Open Positions</Text>
                  <Text style={styles.statsValue}>{dept.openings}</Text>
                </View>
                <View style={styles.growthContainer}>
                  <Text style={styles.statsLabel}>Growth</Text>
                  <View style={styles.growthTag}>
                    <Text style={styles.growthText}>+{dept.growth}%</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          ))}
        </View>
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
  trendsContainer: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 24,
  },
  trendCard: {
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  growthValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  growthLabel: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  periodLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  locationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  locationCard: {
    width: CARD_WIDTH,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationIcon: {
    fontSize: 20,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  locationCountry: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  openingsTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  openingsText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  departmentsGrid: {
    gap: 16,
  },
  departmentCard: {
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  deptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deptIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deptIcon: {
    fontSize: 20,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  deptStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  positionsContainer: {
    flex: 1,
  },
  growthContainer: {
    alignItems: 'flex-end',
  },
  statsLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  growthTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  growthText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
}); 