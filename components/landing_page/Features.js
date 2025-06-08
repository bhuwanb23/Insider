import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const GRADIENTS = {
  blue: ['#4091FF', '#3F7EF8'],
  purple: ['#8257E5', '#D658D6'],
  orange: ['#FF9140', '#FBC748'],
};

const FeatureCard = ({ title, description, delay, icon, gradient }) => (
  <Animatable.View
    animation="fadeInUp"
    delay={delay}
    style={styles.cardWrapper}
  >
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={gradient}
          style={styles.iconBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.icon}>{icon}</Text>
        </LinearGradient>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.cardGlow}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </LinearGradient>
  </Animatable.View>
);

export default function Features() {
  const features = [
    {
      title: 'Company Insights',
      description: 'Deep dive into company cultures, values, and work environments',
      icon: '🎯',
      gradient: GRADIENTS.blue,
    },
    {
      title: 'Career Guidance',
      description: 'Expert tips and strategies for landing your dream job',
      icon: '🚀',
      gradient: GRADIENTS.purple,
    },
    {
      title: 'Interview Prep',
      description: 'Comprehensive interview preparation and practice resources',
      icon: '📚',
      gradient: GRADIENTS.orange,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(246, 249, 252, 0.9)', 'rgba(236, 240, 243, 0.9)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Animatable.Text 
        animation="fadeIn"
        style={styles.sectionTitle}
      >
        Why Choose Us?
      </Animatable.Text>
      <View style={styles.cardsContainer}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            delay={index * 200}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 40,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
      },
      android: {
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
      },
      web: {
        textShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
      },
    }),
    backgroundColor: 'transparent',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  cardWrapper: {
    width: width > 768 ? width * 0.25 : width * 0.8,
  },
  card: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)',
      },
    }),
    position: 'relative',
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    transform: [{ translateY: 50 }],
  },
  iconContainer: {
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    color: '#636e72',
    lineHeight: 24,
    textAlign: 'center',
  },
}); 