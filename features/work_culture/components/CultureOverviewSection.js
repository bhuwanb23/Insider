import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Badge from '../../tech_stack/components/Badge';

export default function CultureOverviewSection({ data }) {
  return (
    <View style={styles.sectionContent}>
      <View style={styles.valuesList}>
        {data.coreValues.map((value, index) => (
          <View key={index} style={styles.valueItem}>
            <Text style={styles.valueIcon}>{value.icon}</Text>
            <Text style={styles.valueTitle}>{value.value}</Text>
            <Text style={styles.valueDescription}>{value.description}</Text>
          </View>
        ))}
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.culturalVibeContainer}
      >
        <Text style={styles.subheading}>Cultural Vibe</Text>
        <Text style={styles.vibeText}>
          {data.culturalVibe.icon} {data.culturalVibe.type}
        </Text>
        <View style={styles.attributesContainer}>
          {data.culturalVibe.attributes.map((attr, index) => (
            <Badge key={index} label={attr} variant="primary" />
          ))}
        </View>
      </LinearGradient>

      {/* Employee Empowerment Section */}
      {data.employeeEmpowerment && (
        <LinearGradient
          colors={['#4158D0', '#C850C0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.empowermentContainer}
        >
          <Text style={styles.sectionHeader}>Employee Empowerment</Text>
          <Text style={styles.empowermentRating}>Empowerment Rating: {data.employeeEmpowerment.rating}/5</Text>
          {data.employeeEmpowerment.initiatives && data.employeeEmpowerment.initiatives.length > 0 && (
            <View style={styles.initiativesList}>
              {data.employeeEmpowerment.initiatives.map((initiative, idx) => (
                <Text key={idx} style={styles.initiativeItem}>• {initiative}</Text>
              ))}
            </View>
          )}
        </LinearGradient>
      )}

      {/* Leadership Style Section */}
      {data.leadershipStyle && (
        <LinearGradient
          colors={['#4158D0', '#C850C0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.leadershipContainer}
        >
          <Text style={styles.sectionHeader}>Leadership Style</Text>
          <Text style={styles.leadershipType}>{data.leadershipStyle.icon} {data.leadershipStyle.type}</Text>
          {data.leadershipStyle.features && data.leadershipStyle.features.length > 0 && (
            <View style={styles.featuresList}>
              {data.leadershipStyle.features.map((feature, idx) => (
                <Text key={idx} style={styles.featureItem}>• {feature}</Text>
              ))}
            </View>
          )}
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  valuesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  valueItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  valueIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  valueDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  culturalVibeContainer: {
    borderRadius: 14,
    padding: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  vibeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  attributesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  empowermentContainer: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  empowermentRating: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  initiativesList: {
    marginLeft: 8,
  },
  initiativeItem: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    lineHeight: 18,
  },
  leadershipContainer: {
    borderRadius: 14,
    padding: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
  },
  leadershipType: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 8,
  },
  featuresList: {
    marginLeft: 8,
  },
  featureItem: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 2,
  },
}); 