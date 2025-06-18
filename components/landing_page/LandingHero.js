import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LandingHero({ onGetStarted }) {
  return (
    <ScrollView 
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(65, 88, 208, 0.45)', 'rgba(200, 80, 192, 0.45)', 'rgba(236, 236, 236, 0.45)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={StyleSheet.absoluteFill}>
            <View style={styles.glassOverlay} />
          </View>
          <Animatable.View 
            animation="fadeIn" 
            duration={1000} 
            style={styles.content}
          >
            <Animatable.Text 
              animation="fadeInDown" 
              delay={300}
              style={styles.title}
            >
              Insider
            </Animatable.Text>
            
            <Animatable.Text 
              animation="fadeInUp" 
              delay={500}
              style={styles.subtitle}
            >
              Your Gateway to Company Insights
            </Animatable.Text>

            <Animatable.View 
              animation="fadeInUp" 
              delay={700}
              style={styles.featuresContainer}
            >
              <View style={styles.featureItemContainer}>
                <LinearGradient
                  colors={['rgba(251, 37, 233, 0.88)', 'rgba(65, 88, 208, 0.88)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.glassEffect, { borderRadius: 12 }]}
                />
                <View style={styles.featureContent}>
                  <MaterialCommunityIcons name="chart-line" size={24} color="#fff" />
                  <Text style={styles.featureText}>Real-time Insights</Text>
                </View>
              </View>

              <View style={styles.featureItemContainer}>
                <LinearGradient
                  colors={['rgba(251, 37, 233, 0.88)', 'rgba(65, 88, 208, 0.88)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.glassEffect, { borderRadius: 12 }]}
                />
                <View style={styles.featureContent}>
                  <MaterialCommunityIcons name="briefcase-search" size={24} color="#fff" />
                  <Text style={styles.featureText}>Job Opportunities</Text>
                </View>
              </View>

              <View style={styles.featureItemContainer}>
                <LinearGradient
                  colors={['rgba(251, 37, 233, 0.88)', 'rgba(65, 88, 208, 0.88)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.glassEffect, { borderRadius: 12 }]}
                />
                <View style={styles.featureContent}>
                  <MaterialCommunityIcons name="account-group" size={24} color="#fff" />
                  <Text style={styles.featureText}>Company Culture</Text>
                </View>
              </View>

              <View style={styles.featureItemContainer}>
                <LinearGradient
                  colors={['rgba(251, 37, 233, 0.88)', 'rgba(65, 88, 208, 0.88)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.glassEffect, { borderRadius: 12 }]}
                />
                <View style={styles.featureContent}>
                  <MaterialCommunityIcons name="trending-up" size={24} color="#fff" />
                  <Text style={styles.featureText}>Market Analysis</Text>
                </View>
              </View>
            </Animatable.View>

            <Animatable.View 
              animation="fadeInUp" 
              delay={900}
              style={styles.buttonContainer}
            >
              <TouchableOpacity 
                style={styles.button}
                onPress={onGetStarted}
              >
                <LinearGradient
                  colors={['rgba(251, 37, 233, 0.88)', 'rgba(65, 88, 208, 0.88)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.buttonGlassEffect]}
                />
                <View style={styles.buttonContent}>
                  <Text style={[styles.buttonText, { color: '#fff' }]}>Get Started</Text>
                  <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
                </View>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View
              animation="fadeInUp"
              delay={1100}
              style={styles.scrollIndicator}
            >
              <MaterialCommunityIcons name="chevron-down" size={32} color="rgba(65, 88, 208, 0.9)" />
              <Text style={[styles.scrollText, { color: 'rgba(65, 88, 208, 0.9)' }]}>Scroll to explore more</Text>
            </Animatable.View>
          </Animatable.View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#fff',
  },
  container: {
    width: '100%',
    height: height,
    backgroundColor: 'transparent',
  },
  gradient: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureItemContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    zIndex: 1,
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  buttonGlassEffect: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    opacity: 0.8,
  },
  scrollText: {
    fontSize: 14,
    marginTop: 8,
    opacity: 0.8,
    color: 'rgba(65, 88, 208, 0.9)',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});