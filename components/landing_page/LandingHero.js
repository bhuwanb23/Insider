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
          colors={['#4158D0', '#C850C0', '#FFCC70']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
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
              <Animatable.View 
                animation="pulse" 
                easing="ease-out" 
                iterationCount="infinite" 
                style={styles.featureItem}
              >
                <MaterialCommunityIcons name="chart-line" size={24} color="#fff" />
                <Text style={styles.featureText}>Real-time Insights</Text>
              </Animatable.View>

              <Animatable.View 
                animation="pulse" 
                easing="ease-out" 
                iterationCount="infinite" 
                delay={200}
                style={styles.featureItem}
              >
                <MaterialCommunityIcons name="briefcase-search" size={24} color="#fff" />
                <Text style={styles.featureText}>Job Opportunities</Text>
              </Animatable.View>

              <Animatable.View 
                animation="pulse" 
                easing="ease-out" 
                iterationCount="infinite" 
                delay={400}
                style={styles.featureItem}
              >
                <MaterialCommunityIcons name="account-group" size={24} color="#fff" />
                <Text style={styles.featureText}>Company Culture</Text>
              </Animatable.View>

              <Animatable.View 
                animation="pulse" 
                easing="ease-out" 
                iterationCount="infinite" 
                delay={600}
                style={styles.featureItem}
              >
                <MaterialCommunityIcons name="trending-up" size={24} color="#fff" />
                <Text style={styles.featureText}>Market Analysis</Text>
              </Animatable.View>

              <Animatable.View 
                animation="pulse" 
                easing="ease-out" 
                iterationCount="infinite" 
                delay={800}
                style={styles.featureItem}
              >
                <MaterialCommunityIcons name="chart-bubble" size={24} color="#fff" />
                <Text style={styles.featureText}>Industry Trends</Text>
              </Animatable.View>

              <Animatable.View 
                animation="pulse" 
                easing="ease-out" 
                iterationCount="infinite" 
                delay={1000}
                style={styles.featureItem}
              >
                <MaterialCommunityIcons name="lightbulb-on" size={24} color="#fff" />
                <Text style={styles.featureText}>Smart Recommendations</Text>
              </Animatable.View>
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
                  colors={['#4158D0', '#C850C0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Get Started</Text>
                  <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View
              animation="fadeInUp"
              delay={1100}
              style={styles.scrollIndicator}
            >
              <MaterialCommunityIcons name="chevron-down" size={32} color="#fff" />
              <Text style={styles.scrollText}>Scroll to explore more</Text>
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
  },
  container: {
    width: '100%',
    height: height,
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backdropFilter: 'blur(10px)',
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    opacity: 0.8,
  },
  scrollText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    opacity: 0.8,
  },
});