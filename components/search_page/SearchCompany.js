import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function SearchCompany({ onSearch }) {
  const [company, setCompany] = useState('');

  const handleSearch = () => {
    if (company.trim()) {
      onSearch && onSearch(company.trim());
    }
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
          <Animatable.Text animation="fadeInDown" style={styles.header}>
            <Text style={styles.logo}>🔍</Text> Company Search
          </Animatable.Text>
          <Animatable.View animation="fadeInUp" delay={200} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type company name..."
              value={company}
              onChangeText={setCompany}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
              autoFocus
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.Text animation="fadeIn" delay={600} style={styles.tip}>
            Enter a company name to explore insights, jobs, and more!
          </Animatable.Text>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 32,
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
    marginBottom: 24,
  },
  input: {
    width: '100%',
    fontSize: 18,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
  },
  button: {
    backgroundColor: '#0984e3',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 4,
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
}); 