import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function BackgroundShapes() {
  return (
    <View style={styles.container}>
      {/* Floating circles */}
      {[...Array(5)].map((_, index) => (
        <Animatable.View
          key={`circle-${index}`}
          animation={{
            0: {
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              scale: 0.5,
              opacity: 0.3,
            },
            1: {
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              scale: 1,
              opacity: 0.6,
            },
          }}
          duration={5000 + Math.random() * 3000}
          iterationCount="infinite"
          direction="alternate"
          style={[
            styles.circle,
            {
              width: 100 + Math.random() * 100,
              height: 100 + Math.random() * 100,
              backgroundColor: index % 2 === 0 ? '#4158D0' : '#C850C0',
            },
          ]}
        />
      ))}

      {/* Animated squares */}
      {[...Array(3)].map((_, index) => (
        <Animatable.View
          key={`square-${index}`}
          animation={{
            0: {
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              rotate: '0deg',
              scale: 0.8,
              opacity: 0.2,
            },
            1: {
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              rotate: '45deg',
              scale: 1.2,
              opacity: 0.4,
            },
          }}
          duration={6000 + Math.random() * 2000}
          iterationCount="infinite"
          direction="alternate"
          style={[
            styles.square,
            {
              width: 80 + Math.random() * 60,
              height: 80 + Math.random() * 60,
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(65, 88, 208, 0.2)', 'rgba(200, 80, 192, 0.2)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animatable.View>
      ))}

      {/* Animated triangles */}
      {[...Array(4)].map((_, index) => (
        <Animatable.View
          key={`triangle-${index}`}
          animation={{
            0: {
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              rotate: '0deg',
              scale: 0.7,
              opacity: 0.2,
            },
            1: {
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              rotate: '180deg',
              scale: 1.1,
              opacity: 0.4,
            },
          }}
          duration={7000 + Math.random() * 3000}
          iterationCount="infinite"
          direction="alternate"
          style={[
            styles.triangle,
            {
              width: 60 + Math.random() * 40,
              height: 60 + Math.random() * 40,
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(200, 80, 192, 0.2)', 'rgba(255, 204, 112, 0.2)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animatable.View>
      ))}

      {/* Animated dots */}
      {[...Array(15)].map((_, index) => (
        <Animatable.View
          key={`dot-${index}`}
          animation={{
            0: {
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              scale: 0.5,
              opacity: 0.3,
            },
            1: {
              translateX: Math.random() * width,
              translateY: Math.random() * height,
              scale: 1,
              opacity: 0.6,
            },
          }}
          duration={4000 + Math.random() * 2000}
          iterationCount="infinite"
          direction="alternate"
          style={[
            styles.dot,
            {
              width: 4 + Math.random() * 4,
              height: 4 + Math.random() * 4,
              backgroundColor: index % 3 === 0 ? '#4158D0' : index % 3 === 1 ? '#C850C0' : '#FFCC70',
            },
          ]}
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
  square: {
    position: 'absolute',
    borderRadius: 12,
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 52,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(65, 88, 208, 0.2)',
  },
  dot: {
    position: 'absolute',
    borderRadius: 1000,
  },
}); 