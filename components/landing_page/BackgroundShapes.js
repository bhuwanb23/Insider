import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const FloatingShape = ({ style, animation, duration, delay }) => (
  <Animatable.View
    animation={animation}
    duration={duration}
    delay={delay}
    iterationCount="infinite"
    style={style}
  >
    <LinearGradient
      colors={['rgba(9, 132, 227, 0.2)', 'rgba(0, 184, 248, 0.1)']}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  </Animatable.View>
);

export default function BackgroundShapes() {
  return (
    <View style={styles.container}>
      <FloatingShape
        animation="pulse"
        duration={4000}
        delay={0}
        style={[styles.shape, styles.circle1]}
      />
      <FloatingShape
        animation="pulse"
        duration={3500}
        delay={1000}
        style={[styles.shape, styles.circle2]}
      />
      <FloatingShape
        animation="pulse"
        duration={4500}
        delay={500}
        style={[styles.shape, styles.rectangle1]}
      />
      <FloatingShape
        animation="pulse"
        duration={5000}
        delay={1500}
        style={[styles.shape, styles.rectangle2]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  shape: {
    position: 'absolute',
    backgroundColor: 'rgba(9, 132, 227, 0.1)',
    borderRadius: 20,
  },
  circle1: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    top: -50,
    right: -30,
    transform: [{ rotate: '45deg' }],
  },
  circle2: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    bottom: height * 0.2,
    left: -20,
  },
  rectangle1: {
    width: width * 0.5,
    height: width * 0.25,
    top: height * 0.3,
    right: -40,
    transform: [{ rotate: '-35deg' }],
  },
  rectangle2: {
    width: width * 0.35,
    height: width * 0.35,
    bottom: -30,
    right: width * 0.3,
    transform: [{ rotate: '25deg' }],
  },
}); 