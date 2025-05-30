import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCoreCompanyDetails } from '../context/CoreCompanyDetailsContext';

export default function BasicIdentity({ data }) {
  const { companyData } = useCoreCompanyDetails();
  
  // Log raw API response for debugging
  // console.log('Raw API Response in BasicIdentity:', JSON.stringify(companyData, null, 2));

  // Use passed data prop if available, otherwise use context data
  const identityData = data || companyData?.basicIdentity;

  if (!identityData) {
    // console.log('No identity data available');
    return (
      <View style={styles.centerContainer}>
        <Text>No basic identity information available</Text>
      </View>
    );
  }

  const handleLinkedInPress = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Image 
            source={{ uri: identityData.logo }} 
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.companyName}>{identityData.name}</Text>
            <Text style={styles.tagline}>{identityData.tagline}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quickInfoContainer}>
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoIcon}>🏢</Text>
            <Text style={styles.quickInfoLabel}>Industry</Text>
            <Text style={styles.quickInfoValue}>{identityData.industry}</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoIcon}>📅</Text>
            <Text style={styles.quickInfoLabel}>Founded</Text>
            <Text style={styles.quickInfoValue}>{identityData.foundedYear}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelIcon}>📍</Text>
              <Text style={styles.label}>Headquarters</Text>
            </View>
            <Text style={styles.value}>{identityData.headquarters}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelIcon}>👥</Text>
              <Text style={styles.label}>Global Workforce</Text>
            </View>
            <View style={styles.employeeStats}>
              <View style={styles.employeeCount}>
                <Text style={styles.employeeNumber}>
                  {identityData.employees?.global?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.employeeLabel}>Global</Text>
              </View>
              {identityData.employees?.india && (
                <View style={styles.employeeCount}>
                  <Text style={styles.employeeNumber}>
                    {identityData.employees.india.toLocaleString()}
                  </Text>
                  <Text style={styles.employeeLabel}>India</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {identityData.keyPeople && identityData.keyPeople.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Key People</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.peopleScrollContainer}
            >
              {identityData.keyPeople.map((person, index) => (
                <LinearGradient
                  key={index}
                  colors={['#ffffff', '#f8f9fa']}
                  style={styles.personCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Image 
                    source={{ uri: person.image }} 
                    style={styles.personImage}
                    resizeMode="cover"
                  />
                  <View style={styles.personInfo}>
                    <Text style={styles.personName} numberOfLines={1}>{person.name}</Text>
                    <Text style={styles.personRole} numberOfLines={2}>{person.role}</Text>
                    {person.linkedIn && (
                      <TouchableOpacity
                        style={styles.linkedInButton}
                        onPress={() => handleLinkedInPress(person.linkedIn)}
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
                </LinearGradient>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerGradient: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flex: 1,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
    marginTop: -16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  quickInfoItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickInfoIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  quickInfoValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  labelIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 14,
    color: '#1a1a1a',
    marginTop: 4,
  },
  employeeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  employeeCount: {
    alignItems: 'center',
  },
  employeeNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4158D0',
  },
  employeeLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  peopleScrollContainer: {
    paddingRight: 16,
    paddingVertical: 4,
  },
  personCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  personImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
  },
  personInfo: {
    alignItems: 'center',
  },
  personName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    textAlign: 'center',
  },
  personRole: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 16,
    height: 32,
  },
  linkedInButton: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  linkedInGradient: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  linkedInText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}); 