import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SUGGESTED_COMPANIES = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple',
  'Netflix', 'Twitter', 'LinkedIn', 'Uber', 'Airbnb'
];

export default function SearchCompany({ onSearch }) {
  const [company, setCompany] = useState('');

  const handleSearch = () => {
    const searchTerm = company.trim();
    if (searchTerm.length > 0) {
      onSearch(searchTerm);
    }
  };

  const handleSuggestionPress = (suggestedCompany) => {
    const searchTerm = suggestedCompany.trim();
    setCompany(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <LinearGradient
      colors={["#f6f9fc", "#ecf0f3"]}
      style={styles.gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Animatable.View animation="fadeInUp" delay={200} style={styles.inputContainer}>
            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={24} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a company..."
                value={company}
                onChangeText={text => setCompany(text)}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit={true}
                enablesReturnKeyAutomatically={true}
                maxLength={50}
                textContentType="organizationName"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.Text animation="fadeIn" delay={600} style={styles.tip}>
            Enter a company name to explore insights, jobs, and more!
          </Animatable.Text>

          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Popular Companies</Text>
            <View style={styles.suggestionsGrid}>
              {SUGGESTED_COMPANIES.map((suggestedCompany, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionCard}
                  onPress={() => handleSuggestionPress(suggestedCompany)}
                >
                  <MaterialCommunityIcons 
                    name="office-building" 
                    size={20} 
                    color="#4158D0" 
                    style={styles.companyIcon}
                  />
                  <Text style={styles.suggestionText}>{suggestedCompany}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  logo: {
    fontSize: 32,
    marginRight: 8,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#0984e3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
    marginTop: 0,
    // marginBottom: 24,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    color: '#4158D0',
  },
  button: {
    backgroundColor: '#0984e3',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#0984e3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tip: {
    fontSize: 16,
    color: '#636e72',
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.85,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  suggestionsContainer: {
    marginTop: 16,
  },
  suggestionsTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: '600',
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  suggestionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(65, 88, 208, 0.1)',
  },
  companyIcon: {
    marginRight: 8,
  },
  suggestionText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
}); 