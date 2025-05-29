import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const topics = [
  { key: 'core', label: 'Core Company Details', icon: '🏢' },
  { key: 'interview', label: 'Interview Experience', icon: '💬' },
  { key: 'jobs', label: 'Job Openings', icon: '💼' },
  { key: 'reviews', label: 'Employee Reviews', icon: '⭐' },
  { key: 'culture', label: 'Company Culture', icon: '🌱' },
  { key: 'salary', label: 'Salary Insights', icon: '💰' },
  { key: 'faq', label: 'FAQs', icon: '❓' },
];

export default function CompanyTopicsList({ company, onSelectTopic }) {
  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.header}>
        <Text style={styles.icon}>🏢</Text> {company}
      </Animatable.Text>
      <Animatable.Text animation="fadeIn" delay={200} style={styles.subHeader}>
        Explore topics about {company}
      </Animatable.Text>
      <FlatList
        data={topics}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" delay={index * 100}>
            <TouchableOpacity style={styles.card} onPress={() => onSelectTopic(item.key)}>
              <LinearGradient
                colors={["#0984e3", "#00b894"]}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.cardIcon}>{item.icon}</Text>
                <Text style={styles.cardLabel}>{item.label}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  icon: {
    fontSize: 28,
    marginRight: 6,
  },
  subHeader: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.85,
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#0984e3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 24,
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 18,
  },
  cardLabel: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
}); 