import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const FEATURES = [
  {
    icon: 'chart-line',
    title: 'Real-time Insights',
    description: 'Get instant access to company performance metrics and market trends',
    gradient: ['#4158D0', '#C850C0'],
  },
  {
    icon: 'briefcase-search',
    title: 'Job Opportunities',
    description: 'Discover the latest job openings and career opportunities',
    gradient: ['#C850C0', '#FFCC70'],
  },
  {
    icon: 'account-group',
    title: 'Company Culture',
    description: 'Learn about company values, work environment, and employee experiences',
    gradient: ['#FFCC70', '#4158D0'],
  },
  {
    icon: 'trending-up',
    title: 'Market Analysis',
    description: 'Stay updated with market trends and industry analysis',
    gradient: ['#4158D0', '#FFCC70'],
  },
];

export default function Features() {
  return (
    <View style={styles.container}>
      <Animatable.Text 
        animation="fadeInDown" 
        style={styles.title}
      >
        Why Choose Insider?
      </Animatable.Text>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FEATURES.map((feature, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index * 200}
            style={styles.featureCard}
          >
            <LinearGradient
              colors={feature.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <Animatable.View
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={styles.iconContainer}
              >
                <MaterialCommunityIcons 
                  name={feature.icon} 
                  size={32} 
                  color="#fff" 
                />
              </Animatable.View>
              
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </LinearGradient>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  featureCard: {
    width: width * 0.8,
    height: 200,
    marginRight: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 