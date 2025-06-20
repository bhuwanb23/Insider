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
        <MaterialCommunityIcons name="laptop" size={32} color="#fff" style={{ marginRight: 12 }} />
        <Text style={styles.policyTitle}>{data.policy}</Text>
      </LinearGradient>

      {/* Details Grid */}
      <Text style={styles.sectionHeader}>Remote Work Details</Text>
      <View style={styles.detailsGrid}>
        {data.details && Object.keys(data.details).length > 0 ? (
          Object.entries(data.details).map(([key, value]) => (
            <View key={key} style={styles.detailCardModern}>
              <MaterialCommunityIcons
                name={key === 'remoteAllowed' ? 'home-outline' : key === 'hybridStructure' ? 'calendar-clock' : key === 'globalPolicy' ? 'earth' : 'laptop'}
                size={22}
                color="#4158D0"
                style={styles.detailIcon}
              />
              <View style={styles.detailContentModern}>
                <Text style={styles.detailLabelModern}>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</Text>
                <Text style={styles.detailValueModern}>{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'N/A'}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ color: '#888', fontSize: 13 }}>No details available.</Text>
        )}
      </View>

      {/* Benefits Section */}
      <Text style={styles.sectionHeader}>Remote Work Benefits</Text>
      <View style={styles.benefitsGrid}>
        {data.benefits && data.benefits.length > 0 ? (
          data.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitCard}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: '#888', fontSize: 13 }}>No benefits listed.</Text>
        )}
      </View>

      {/* Leave Policy */}
      {data.leaves && Object.keys(data.leaves).length > 0 ? (
        <View style={styles.leavesContainerModern}>
          <Text style={styles.sectionHeader}>Leave Policy</Text>
          <View style={styles.leavesGridModern}>
            {Object.entries(data.leaves).map(([type, duration]) => (
              <View key={type} style={styles.leaveCard}>
                <Text style={styles.leaveType}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                <Text style={styles.leaveDuration}>{duration || 'N/A'}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
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
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  policyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4158D0',
    marginBottom: 10,
    marginLeft: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  detailCardModern: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  detailContentModern: {
    flex: 1,
  },
  detailLabelModern: {
    fontSize: 13,
    color: '#4158D0',
    fontWeight: '600',
    marginBottom: 2,
  },
  detailValueModern: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  benefitText: {
    fontSize: 13,
    color: '#555',
    flex: 1,
  },
  leavesContainerModern: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginBottom: 10,
  },
  leavesGridModern: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  leaveCard: {
    width: '48%',
    backgroundColor: '#f5f6fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  leaveType: {
    fontSize: 12,
    color: '#4158D0',
    marginBottom: 4,
    fontWeight: '600',
  },
  leaveDuration: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
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
}); 