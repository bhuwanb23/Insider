import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Easing, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const WaveLoader = ({ colors = ['#4158D0', '#C850C0', '#FFC246'] }) => {
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (value, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 900,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 900,
            easing: Easing.ease,
            useNativeDriver: true,
          })
        ])
      );
    };
    Animated.parallel([
      animate(wave1, 0),
      animate(wave2, 300),
      animate(wave3, 600),
    ]).start();
  }, []);

  const getWaveStyle = (wave, color) => ({
    ...styles.wave,
    opacity: wave.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.18, 0.5, 0.18],
    }),
    transform: [
      {
        scale: wave.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3],
        }),
      },
    ],
    backgroundColor: color,
  });

  return (
    <View style={styles.waveContainer}>
      <Animated.View style={getWaveStyle(wave1, colors[0])} />
      <Animated.View style={getWaveStyle(wave2, colors[1])} />
      <Animated.View style={getWaveStyle(wave3, colors[2])} />
      <View style={[styles.dot, { backgroundColor: colors[0] }]} />
    </View>
  );
};

const StatusBadge = ({ status, message }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, [message]);

  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return { color: '#4158D0', icon: 'loading' };
      case 'completed':
        return { color: '#10B981', icon: 'check-circle' };
      case 'error':
        return { color: '#EF4444', icon: 'alert-circle' };
      default:
        return { color: '#6B7280', icon: 'information' };
    }
  };

  const config = getStatusConfig();

  return (
    <Animated.View
      style={[
        styles.badgeContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          backgroundColor: `${config.color}18`,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={config.icon}
        size={16}
        color={config.color}
        style={styles.badgeIcon}
      />
      <Text style={[styles.badgeText, { color: config.color }]} numberOfLines={1}>
        {message}
      </Text>
    </Animated.View>
  );
};

const LoadingSpinner = ({
  message = 'Loading...',
  topicStatuses = [],
  currentStep = 0,
}) => {
  const currentStatus = topicStatuses[currentStep] || {};
  return (
    <View style={styles.overlay}>
      <LinearGradient
        colors={["#ffffffcc", "#f3e9f7cc"]}
        style={styles.glassBg}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.loaderContent}>
          <WaveLoader colors={["#4158D0", "#C850C0", "#FFC246"]} />
          <Text style={styles.message} numberOfLines={2}>{message}</Text>
          <StatusBadge
            status={currentStatus.status || 'loading'}
            message={currentStatus.topic || 'Preparing...'}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'auto',
  },
  glassBg: {
    minWidth: 180,
    maxWidth: 260,
    minHeight: 120,
    borderRadius: 28,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(65, 88, 208, 0.10)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(18px)' } : {}),
  },
  loaderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  waveContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  wave: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  message: {
    fontSize: 14,
    color: '#4158D0',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 0,
    marginTop: 2,
    width: 'auto',
    alignSelf: 'center',
  },
  badgeIcon: {
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
});

export default LoadingSpinner; 