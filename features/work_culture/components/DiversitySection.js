import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DiversitySection({ data }) {
  return (
    <View style={styles.sectionContent}>
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statsHeader}
      >
        <Text style={styles.sectionHeader}>Diversity & Inclusion</Text>
      </LinearGradient>

      <View style={styles.statsGrid}>
        {Object.entries(data.stats).map(([key, value]) => (
          <View key={key} style={styles.statCard}>
            <Text style={styles.statIcon}>{key === 'genderRatio' ? '♀️♂️' : key === 'ethnicDiversity' ? '🌎' : '👑'}</Text>
            <Text style={styles.statLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
            <Text style={styles.statValue}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.initiativesContainer}>
        {data.initiatives.map((initiative, index) => (
          <View key={index} style={styles.initiativeCardModern}>
            <Text style={styles.initiativeIconModern}>{initiative.icon}</Text>
            <View style={styles.initiativeInfoModern}>
              <Text style={styles.initiativeNameModern}>{initiative.name}</Text>
              <Text style={styles.initiativeMembersModern}>{initiative.members}</Text>
              {initiative.activities && initiative.activities.length > 0 && (
                <View style={styles.activitiesListModern}>
                  {initiative.activities.map((activity, i) => (
                    <Text key={i} style={styles.activityItemModern}>• {activity}</Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Recognitions Section */}
      {data.recognition && data.recognition.length > 0 && (
        <View style={styles.recognitionGrid}>
          <Text style={styles.sectionHeader}>Recognitions</Text>
          <View style={styles.recognitionRow}>
            {data.recognition.map((rec, idx) => (
              <View key={idx} style={styles.recognitionCard}>
                <Text style={styles.recognitionText}>{rec}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  statsHeader: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4158D0',
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statCard: {
    width: '32%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#4158D0',
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  initiativesContainer: {
    marginTop: 10,
  },
  initiativeCardModern: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  initiativeIconModern: {
    fontSize: 22,
    marginRight: 12,
  },
  initiativeInfoModern: {
    flex: 1,
  },
  initiativeNameModern: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4158D0',
    marginBottom: 2,
  },
  initiativeMembersModern: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
  activitiesListModern: {
    marginTop: 6,
    marginLeft: 8,
  },
  activityItemModern: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  recognitionGrid: {
    marginTop: 18,
  },
  recognitionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  recognitionCard: {
    backgroundColor: '#4158D0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
    elevation: 2,
  },
  recognitionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
}); 