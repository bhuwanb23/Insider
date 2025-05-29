import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useCompany } from '../context/CompanyContext';

export default function Leadership() {
  const { companyData } = useCompany();
  const { basicIdentity } = companyData;

  const handleLinkedInPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animatable.Text animation="fadeInDown" style={styles.headerTitle}>
          Leadership Team
        </Animatable.Text>
        <Animatable.Text animation="fadeIn" delay={200} style={styles.headerSubtitle}>
          Meet the people driving our success
        </Animatable.Text>
      </LinearGradient>

      <View style={styles.content}>
        {basicIdentity.keyPeople.map((person, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index * 150}
            style={styles.card}
          >
            <LinearGradient
              colors={['#ffffff', '#f8f9fa']}
              style={styles.cardContent}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: person.image }}
                  style={styles.profileImage}
                />
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
                      <Text style={styles.linkedInText}>in</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{person.name}</Text>
                <Text style={styles.role}>{person.role}</Text>
                {person.bio && (
                  <Text style={styles.bio} numberOfLines={2}>{person.bio}</Text>
                )}
              </View>
            </LinearGradient>
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  linkedInButton: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  linkedInGradient: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkedInText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  role: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  bio: {
    fontSize: 12,
    color: '#444',
    lineHeight: 16,
  },
}); 