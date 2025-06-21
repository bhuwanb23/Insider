import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCoreCompanyDetails } from '../context/CoreCompanyDetailsContext';

export default function Leadership({ data }) {
  const { companyData } = useCoreCompanyDetails();
  
  // Log raw API response for debugging
  // console.log('Raw API Response in Leadership:', JSON.stringify(companyData, null, 2));

  // Use passed data prop if available, otherwise use context data
  const leadershipData = data || companyData?.basicIdentity?.keyPeople;

  if (!leadershipData || leadershipData.length === 0) {
    // console.log('No leadership data available');
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
            <LinearGradient
              colors={["#f6f9fc", "#e9e4f0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
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
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={["#0077B5", "#00A0DC"]}
                      style={styles.linkedInGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.linkedInText}>LinkedIn</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: 'transparent',
  },
  grid: {
    flexDirection: 'column',
    gap: 16,
  },
  leaderCard: {
    width: '100%',
    borderRadius: 18,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(208, 71, 239, 0.08)',
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
  },
  leaderInfo: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 0,
    marginBottom: 0,
  },
  leaderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
    textAlign: 'left',
    fontFamily: 'sans-serif-medium',
    letterSpacing: 0.2,
  },
  leaderRole: {
    fontSize: 13,
    color: '#4158D0',
    marginBottom: 8,
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'sans-serif',
    letterSpacing: 0.1,
  },
  linkedInButton: {
    width: 120,
    borderRadius: 7,
    overflow: 'hidden',
    marginTop: 4,
    elevation: 2,
    alignSelf: 'flex-start',
  },
  linkedInGradient: {
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 7,
  },
  linkedInText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
    fontFamily: 'sans-serif-condensed',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}); 