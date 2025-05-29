import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const GradientOrb = ({ style, colors, animation }) => (
  <Animatable.View
    animation={animation}
    duration={8000}
    iterationCount="infinite"
    easing="ease-in-out"
    style={style}
  >
    <LinearGradient
      colors={colors}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  </Animatable.View>
);

export default function BackgroundEffects() {
  return (
    <View style={styles.container}>
      {/* Main gradient background */}
      <LinearGradient
        colors={['#ffffff', '#f8f9fa', '#ffffff']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Animated gradient orbs */}
      <GradientOrb
        colors={['rgba(64, 145, 255, 0.25)', 'rgba(72, 199, 251, 0.15)']}
        style={[styles.orb, styles.orb1]}
        animation={{
          0: {
            scale: 1,
            translateX: 0,
            translateY: 0,
          },
          0.5: {
            scale: 1.2,
            translateX: -20,
            translateY: 20,
          },
          1: {
            scale: 1,
            translateX: 0,
            translateY: 0,
          },
        }}
      />
      <GradientOrb
        colors={['rgba(130, 87, 229, 0.25)', 'rgba(214, 88, 214, 0.15)']}
        style={[styles.orb, styles.orb2]}
        animation={{
          0: {
            scale: 1,
            translateY: 0,
          },
          0.5: {
            scale: 1.2,
            translateY: -30,
          },
          1: {
            scale: 1,
            translateY: 0,
          },
        }}
      />
      <GradientOrb
        colors={['rgba(255, 145, 64, 0.25)', 'rgba(251, 199, 72, 0.15)']}
        style={[styles.orb, styles.orb3]}
        animation={{
          0: {
            scale: 1,
            translateX: 0,
          },
          0.5: {
            scale: 1.1,
            translateX: -30,
          },
          1: {
            scale: 1,
            translateX: 0,
          },
        }}
      />

      {/* Decorative lines */}
      <View style={styles.lines}>
        {[...Array(3)].map((_, i) => (
          <Animatable.View
            key={i}
            animation="fadeIn"
            delay={i * 200}
            style={[
              styles.line,
              {
                width: width * (0.3 + i * 0.2),
                transform: [{ rotate: `${-10 + i * 5}deg` }],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: 1,
  },
  orb: {
    position: 'absolute',
    borderRadius: width,
    opacity: 0.8,
  },
  orb1: {
    width: width * 0.8,
    height: width * 0.8,
    top: -width * 0.2,
    right: -width * 0.2,
  },
  orb2: {
    width: width * 0.6,
    height: width * 0.6,
    top: height * 0.3,
    left: -width * 0.3,
  },
  orb3: {
    width: width * 0.4,
    height: width * 0.4,
    bottom: height * 0.1,
    right: -width * 0.1,
  },
  lines: {
    position: 'absolute',
    top: height * 0.4,
    left: 0,
    right: 0,
    opacity: 0.7,
    zIndex: 2,
  },
  line: {
    height: 2,
    backgroundColor: 'rgba(123, 123, 123, 0.15)',
    marginVertical: 20,
    alignSelf: 'center',
  },
}); 