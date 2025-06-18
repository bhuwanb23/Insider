import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_REQUEST_COUNT_KEY } from '../api/api'; // Import the key

const API_KEY_STORAGE_KEY = 'openrouter_api_key';

export default function SettingsPage({ navigation, route }) {
  const [apiKey, setApiKey] = useState('');
  const [requestCount, setRequestCount] = useState(0);
  const insets = useSafeAreaInsets();
  const previousScreen = route?.params?.previousScreen;

  useEffect(() => {
    loadApiKey();
    loadRequestCount();
  }, []);

  const loadApiKey = async () => {
    try {
      const storedKey = await AsyncStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedKey) {
        setApiKey(storedKey);
      }
    } catch (error) {
      console.error('Failed to load API key from AsyncStorage', error);
    }
  };

  const loadRequestCount = async () => {
    try {
      const storedCount = await AsyncStorage.getItem(API_REQUEST_COUNT_KEY);
      setRequestCount(storedCount ? parseInt(storedCount, 10) : 0);
    } catch (error) {
      console.error('Failed to load request count', error);
      setRequestCount(0); // Default to 0 on error
    }
  };

  const saveApiKey = async () => {
    try {
      if (!apiKey.trim()) {
        Alert.alert('Error', 'Please enter a valid API key.');
        return;
      }

      await AsyncStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
      Alert.alert(
        'Success', 
        'API Key saved successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // If we came from Search page, go back there
              if (previousScreen === 'Search') {
                navigation.navigate('Landing', {
                  screen: 'Search'
                });
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Failed to save API key to AsyncStorage', error);
      Alert.alert('Error', 'Failed to save API Key.');
    }
  };

  const handleBack = () => {
    if (previousScreen === 'Search') {
      navigation.navigate('Landing', {
        screen: 'Search'
      });
    } else {
      navigation.navigate('Landing');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4158D0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* API Key Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Key Management</Text>
          <Text style={styles.sectionDescription}>Enter your OpenRouter API key. This key is stored locally on your device.</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your API key here..."
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry={true} // Hide the key for security
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveApiKey}>
            <LinearGradient
              colors={['#4158D0', '#C850C0']}
              style={styles.saveButtonGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
              <Text style={styles.saveButtonText}>Save API Key</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Usage Statistics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Statistics</Text>
          <View style={styles.statsRow}>
            <MaterialCommunityIcons name="chart-bar" size={24} color="#4158D0" />
            <Text style={styles.statText}>Requests Made: <Text style={styles.statValue}>{requestCount}</Text></Text>
          </View>
          <Text style={styles.sectionDescription}>This counter tracks the total number of API requests made from this device. It is persistent and does not reset on app reload.</Text>
        </View>

        {/* Other Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionDescription}>This application provides insights into companies using AI. Data is generated on the fly via OpenRouter API calls.</Text>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="information" size={20} color="#4158D0" />
            <Text style={styles.infoText}>Version: 1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="github" size={20} color="#4158D0" />
            <Text style={styles.infoText}>GitHub: example/repo</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'transparent',
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(65, 88, 208, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    backgroundColor: '#f6f8fc',
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(65, 88, 208, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(65, 88, 208, 0.3)',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'rgba(65, 88, 208, 0.05)',
    marginBottom: 15,
  },
  saveButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  saveButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  statValue: {
    fontWeight: 'bold',
    color: '#4158D0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
});
