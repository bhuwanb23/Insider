import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function RemoteWorkSection({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No remote work data available.</Text>
      </View>
    );
  }

  const { policy, details, benefits, leaves } = data;

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
            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : (value || 'N/A')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.sectionContent}>
      {/* Policy Header */}
      {policy ? (
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.policyHeader}
      >
        <MaterialCommunityIcons name="laptop" size={28} color="#fff" />
          <Text style={styles.policyTitle}>{policy}</Text>
      </LinearGradient>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No remote work policy available.</Text>
        </View>
      )}

      {/* Details Grid */}
      {details && Object.keys(details).length > 0 ? (
      <View style={styles.detailsContainer}>
          {Object.entries(details).map(([key, value]) => renderDetail(key, value))}
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No remote work details available.</Text>
      </View>
      )}

      {/* Benefits Section */}
      {benefits && benefits.length > 0 ? (
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Remote Work Benefits</Text>
        <View style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
              </View>
                <Text style={styles.benefitText}>{benefit || 'N/A'}</Text>
            </View>
          ))}
        </View>
      </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No remote work benefits available.</Text>
        </View>
      )}

      {/* Leave Policy */}
      {leaves && Object.keys(leaves).length > 0 ? (
        <View style={styles.leavesContainer}>
          <Text style={styles.leavesTitle}>Leave Policy</Text>
          <View style={styles.leavesGrid}>
            {Object.entries(leaves).map(([type, duration]) => (
              <View key={type} style={styles.leaveItem}>
                <Text style={styles.leaveType}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
                <Text style={styles.leaveDuration}>{duration || 'N/A'}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.centeredNoCard}>
          <Text style={styles.centeredText}>No leave policy details available.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
  },
  centeredNoCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 100,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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