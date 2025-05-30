import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function RemoteWorkSection({ data }) {
  const renderDetail = (key, value) => {
    const icon = key === 'remoteAllowed' ? 'home-outline' : 
                key === 'hybridStructure' ? 'calendar-clock' :
                key === 'globalPolicy' ? 'earth' : 'laptop';
    
    return (
      <View key={key} style={styles.detailCard}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color="#4158D0"
          style={styles.detailIcon}
        />
        <View style={styles.detailContent}>
          <Text style={styles.detailLabel}>
            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </Text>
          <Text style={styles.detailValue}>
            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.sectionContent}>
      {/* Policy Header */}
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.policyHeader}
      >
        <MaterialCommunityIcons name="laptop" size={28} color="#fff" />
        <Text style={styles.policyTitle}>{data.policy}</Text>
      </LinearGradient>

      {/* Details Grid */}
      <View style={styles.detailsContainer}>
        {Object.entries(data.details).map(([key, value]) => renderDetail(key, value))}
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Remote Work Benefits</Text>
        <View style={styles.benefitsList}>
          {data.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Leave Policy */}
      {data.leaves && (
        <View style={styles.leavesContainer}>
          <Text style={styles.leavesTitle}>Leave Policy</Text>
          <View style={styles.leavesGrid}>
            {Object.entries(data.leaves).map(([type, duration]) => (
              <View key={type} style={styles.leaveItem}>
                <Text style={styles.leaveType}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
                <Text style={styles.leaveDuration}>{duration}</Text>
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
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  policyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailIcon: {
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  benefitsContainer: {
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
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  leavesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leavesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  leavesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  leaveItem: {
    width: '48%',
    backgroundColor: 'rgba(65, 88, 208, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  leaveType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  leaveDuration: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
}); 