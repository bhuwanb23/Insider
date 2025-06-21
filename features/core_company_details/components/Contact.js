import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SocialIcon = ({ name, url }) => (
  <TouchableOpacity onPress={() => url && Linking.openURL(url)}>
    <LinearGradient
      colors={['#4158D0', '#C850C0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.socialButton}
    >
      <MaterialCommunityIcons name={name.toLowerCase()} size={28} color="#fff" />
    </LinearGradient>
  </TouchableOpacity>
);

export default function Contact({ data }) {
  if (!data) return null;

  const renderInfoRow = (icon, label, value, url) => (
    <TouchableOpacity 
      style={styles.infoRow} 
      onPress={() => url && Linking.openURL(label === 'Support' ? `mailto:${url}` : url)}
      disabled={!url}
    >
      <MaterialCommunityIcons name={icon} size={24} color="rgba(255, 255, 255, 0.9)" style={styles.icon} />
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Contact Information</Text>

      <LinearGradient
        colors={["#4158D0", "#C850C0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {renderInfoRow('web', 'Website', data.website, data.website)}
        {renderInfoRow('briefcase-outline', 'Careers', data.careersPage, data.careersPage)}
        {renderInfoRow('email-outline', 'Support', data.support, data.support)}
      </LinearGradient>

      {data.socialMedia && (
        <View style={styles.socialCard}>
          <Text style={styles.socialTitle}>Connect With Us</Text>
          <View style={styles.socialIcons}>
            {Object.entries(data.socialMedia).map(([name, url]) => (
              url && <SocialIcon key={name} name={name} url={url} />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  socialCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 24,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
}); 