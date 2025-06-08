import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useNews } from '../context/NewsContext'; // Removed as data is passed via props

export default function StudentImpact({ data }) {
  // const { newsData } = useNews(); // Removed
  const studentImpact = data?.studentImpact || [];

  if (!studentImpact || studentImpact.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No student impact data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🧠</Text>
        <Text style={styles.title}>What This Means For You</Text>
      </View>

      {studentImpact.map((item, index) => (
        <LinearGradient
          key={index}
          colors={['#4158D0', '#C850C0']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.impactBadge}>
              <Text style={styles.impactBadgeText}>Student Impact</Text>
            </View>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.impactSection}>
            <View style={styles.impactIconContainer}>
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                style={styles.iconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.impactIcon}>💡</Text>
              </LinearGradient>
            </View>
            <View style={styles.impactContent}>
              <Text style={styles.impactLabel}>How This Benefits You</Text>
              <Text style={styles.impactText}>{item.impact}</Text>
            </View>
          </View>
        </LinearGradient>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  impactBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
    marginBottom: 16,
  },
  impactSection: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  impactIconContainer: {
    marginRight: 12,
  },
  iconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactIcon: {
    fontSize: 20,
  },
  impactContent: {
    flex: 1,
  },
  impactLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.9,
  },
  impactText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
}); 