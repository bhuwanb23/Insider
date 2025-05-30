import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCoreCompanyDetails } from '../context/CoreCompanyDetailsContext';

export default function Leadership({ data }) {
  const { companyData } = useCoreCompanyDetails();
  
  // Log raw API response for debugging
  console.log('Raw API Response in Leadership:', JSON.stringify(companyData, null, 2));

  // Use passed data prop if available, otherwise use context data
  const leadershipData = data || companyData?.basicIdentity?.keyPeople;

  if (!leadershipData || leadershipData.length === 0) {
    console.log('No leadership data available');
    return (
      <View style={styles.centerContainer}>
        <Text>No leadership information available</Text>
      </View>
    );
  }

  const handleLinkedInPress = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {leadershipData.map((leader, index) => (
          <View key={index} style={styles.leaderCard}>
            <Image 
              source={{ uri: leader.image }} 
              style={styles.leaderImage}
              resizeMode="cover"
            />
            <View style={styles.leaderInfo}>
              <Text style={styles.leaderName}>{leader.name}</Text>
              <Text style={styles.leaderRole}>{leader.role}</Text>
              {leader.linkedIn && (
                <TouchableOpacity
                  onPress={() => handleLinkedInPress(leader.linkedIn)}
                  style={styles.linkedInButton}
                >
                  <LinearGradient
                    colors={['#0077B5', '#00A0DC']}
                    style={styles.linkedInGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.linkedInText}>View Profile</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  leaderCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leaderImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  leaderInfo: {
    alignItems: 'center',
  },
  leaderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    textAlign: 'center',
  },
  leaderRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  linkedInButton: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  linkedInGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  linkedInText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}); 