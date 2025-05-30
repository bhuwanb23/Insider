import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CompanyTopicsList from '../components/company_topics/CompanyTopicsList';
import { LinearGradient } from 'expo-linear-gradient';

export default function CompanyTopicsPage({ company, onSelectTopic, onBack }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)']}
        style={styles.header}
      >
        <TouchableOpacity 
          onPress={onBack}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4158D0" />
        </TouchableOpacity>
      </LinearGradient>
      <CompanyTopicsList company={company} onSelectTopic={onSelectTopic} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(65, 88, 208, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 