import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LandingHero({ onGetStarted }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)']}
        style={[StyleSheet.absoluteFill, styles.gradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Animatable.View 
        animation="fadeIn" 
        duration={1500} 
        style={styles.heroContainer}
      >
        <Animatable.View
          animation="zoomIn"
          duration={1000}
          style={styles.logoContainer}
        >
          <View style={styles.logo}>
            <LinearGradient
              colors={['#0984e3', '#00b894']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </View>
        </Animatable.View>
        
        <Animatable.Text 
          animation="slideInDown" 
          duration={1000} 
          style={styles.title}
        >
          Company Analysis Hub
        </Animatable.Text>
        
        <Animatable.Text 
          animation="fadeIn" 
          delay={500} 
          style={styles.subtitle}
        >
          Your Gateway to Professional Success
        </Animatable.Text>

        <Animatable.View 
          animation="fadeInUp" 
          delay={1000} 
          style={styles.buttonContainer}
        >
          <TouchableOpacity onPress={onGetStarted}>
            <LinearGradient
              colors={['#0984e3', '#00b894']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          animation="fadeIn"
          delay={1500}
          style={styles.statsContainer}
        >
          {[
            { number: '1000+', label: 'Companies' },
            { number: '50K+', label: 'Users' },
            { number: '95%', label: 'Success Rate' }
          ].map((stat, index) => (
            <Animatable.View
              key={index}
              animation="zoomIn"
              delay={1500 + (index * 200)}
              style={styles.statItem}
            >
              <Text style={styles.statNumber}>{stat.number}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Animatable.View>
          ))}
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  gradient: {
    opacity: 0.9,
    borderRadius: 20,
    backgroundColor: 'transparent',
    margin: 10,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
    zIndex: 3,
  },
  logoContainer: {
    marginBottom: 30,
    backgroundColor: 'transparent',
    zIndex: 3,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(255,255,255,0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      },
      android: {
        textShadowColor: 'rgba(255,255,255,0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      },
      web: {
        textShadow: '0px 1px 2px rgba(255,255,255,0.8)',
      },
    }),
  },
  subtitle: {
    fontSize: 18,
    color: '#636e72',
    textAlign: 'center',
    marginBottom: 30,
    width: '80%',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(255,255,255,0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      },
      android: {
        textShadowColor: 'rgba(255,255,255,0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      },
      web: {
        textShadow: '0px 1px 2px rgba(255,255,255,0.8)',
      },
    }),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: 'transparent',
    marginBottom: 40,
    zIndex: 3,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 3px rgba(0,0,0,0.2)',
      },
    }),
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 320,
    marginTop: 20,
    zIndex: 3,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: width < 380 ? 10 : 15,
    borderRadius: 12,
    width: width < 380 ? width * 0.27 : width * 0.25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 3.84px rgba(0,0,0,0.1)',
      },
    }),
  },
  statNumber: {
    fontSize: width < 380 ? 18 : 22,
    fontWeight: 'bold',
    color: '#0984e3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: width < 380 ? 12 : 14,
    color: '#636e72',
    textAlign: 'center',
  },
}); 