import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function BackgroundEffects() {
  return (
    <View style={styles.container}>
      {/* Animated gradient circles */}
      <Animatable.View
        animation={{
          0: { scale: 0.8, opacity: 0.3 },
          1: { scale: 1.2, opacity: 0.5 }
        }}
        duration={4000}
        iterationCount="infinite"
        direction="alternate"
        style={[styles.circle, styles.circle1]}
      >
        <LinearGradient
          colors={['#4158D0', '#C850C0']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animatable.View>

      <Animatable.View
        animation={{
          0: { scale: 1, opacity: 0.4 },
          1: { scale: 1.4, opacity: 0.6 }
        }}
        duration={5000}
        iterationCount="infinite"
        direction="alternate"
        style={[styles.circle, styles.circle2]}
      >
        <LinearGradient
          colors={['#C850C0', '#FFCC70']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animatable.View>

      {/* Floating shapes */}
      <Animatable.View
        animation={{
          0: { translateX: -width * 0.2, translateY: -height * 0.1 },
          1: { translateX: width * 0.2, translateY: height * 0.1 }
        }}
        duration={8000}
        iterationCount="infinite"
        direction="alternate"
        style={[styles.shape, styles.shape1]}
      >
        <LinearGradient
          colors={['rgba(65, 88, 208, 0.2)', 'rgba(200, 80, 192, 0.2)']}
          style={StyleSheet.absoluteFill}
        />
      </Animatable.View>

      <Animatable.View
        animation={{
          0: { translateX: width * 0.2, translateY: height * 0.2 },
          1: { translateX: -width * 0.2, translateY: -height * 0.2 }
        }}
        duration={10000}
        iterationCount="infinite"
        direction="alternate"
        style={[styles.shape, styles.shape2]}
      >
        <LinearGradient
          colors={['rgba(200, 80, 192, 0.2)', 'rgba(255, 204, 112, 0.2)']}
          style={StyleSheet.absoluteFill}
        />
      </Animatable.View>

      {/* Animated dots */}
      {[...Array(20)].map((_, index) => (
        <Animatable.View
          key={index}
          animation={{
            0: { 
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              scale: 0.5,
              opacity: 0.3
            },
            1: { 
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              scale: 1,
              opacity: 0.6
            }
          }}
          duration={3000 + Math.random() * 2000}
          iterationCount="infinite"
          direction="alternate"
          style={[styles.dot, { 
            backgroundColor: index % 2 === 0 ? '#4158D0' : '#C850C0',
            width: 4 + Math.random() * 4,
            height: 4 + Math.random() * 4,
          }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
  },
  circle1: {
    width: width * 1.5,
    height: width * 1.5,
    top: -width * 0.5,
    left: -width * 0.25,
    opacity: 0.3,
  },
  circle2: {
    width: width * 1.2,
    height: width * 1.2,
    bottom: -width * 0.3,
    right: -width * 0.2,
    opacity: 0.4,
  },
  shape: {
    position: 'absolute',
    borderRadius: 20,
    transform: [{ rotate: '45deg' }],
  },
  shape1: {
    width: width * 0.4,
    height: width * 0.4,
    top: height * 0.2,
    left: width * 0.1,
  },
  shape2: {
    width: width * 0.3,
    height: width * 0.3,
    bottom: height * 0.2,
    right: width * 0.1,
  },
  dot: {
    position: 'absolute',
    borderRadius: 1000,
  },
}); 