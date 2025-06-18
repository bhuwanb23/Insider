import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WaveLoader = ({ color = '#4158D0' }) => {
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
            duration: 1200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 1200,
            easing: Easing.ease,
            useNativeDriver: true,
          })
        ])
      );
    };

    Animated.parallel([
      animate(wave1, 0),
      animate(wave2, 400),
      animate(wave3, 800),
    ]).start();
  }, []);

  const getWaveStyle = (wave) => ({
    ...styles.wave,
    opacity: wave.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.2, 0.6, 0.2],
    }),
    transform: [
      {
        scale: wave.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.6],
        }),
      },
    ],
    backgroundColor: color,
  });

  return (
    <View style={styles.waveContainer}>
      <Animated.View style={getWaveStyle(wave1)} />
      <Animated.View style={getWaveStyle(wave2)} />
      <Animated.View style={getWaveStyle(wave3)} />
      <View style={[styles.dot, { backgroundColor: color }]} />
    </View>
  );
};

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.stepsRow}>
      {Array(totalSteps).fill(0).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index === currentStep && styles.activeStep,
            index < currentStep && styles.completedStep,
          ]}
        >
          {index < currentStep && (
            <MaterialCommunityIcons name="check" size={12} color="#fff" />
          )}
        </View>
      ))}
    </View>
  );
};

const StatusBadge = ({ status, message }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
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
          backgroundColor: `${config.color}15`,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={config.icon}
        size={18}
        color={config.color}
        style={styles.badgeIcon}
      />
      <Text style={[styles.badgeText, { color: config.color }]}>
        {message}
      </Text>
    </Animated.View>
  );
};

const LoadingSpinner = ({
  message = 'Loading...',
  topicStatuses = [],
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const currentStatus = topicStatuses[currentStep] || {};

  useEffect(() => {
    if (currentStep === topicStatuses.length - 1 && onComplete) {
      onComplete();
    }
  }, [currentStep, topicStatuses.length, onComplete]);

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Wave Loader Animation */}
          <WaveLoader />

          {/* Content */}
          <Text style={styles.title}>Company Insider</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Step Progress */}
          <StepIndicator
            currentStep={currentStep}
            totalSteps={topicStatuses.length}
          />

          {/* Status Badge */}
          <StatusBadge
            status={currentStatus.status || 'loading'}
            message={currentStatus.topic || 'Preparing...'}
          />

          {/* Step Counter */}
          <Text style={styles.stepCounter}>
            {`Step ${currentStep + 1} of ${topicStatuses.length}`}
          </Text>
        </View>
      </View>
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
    backgroundColor: 'rgba(249, 250, 251, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 28,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    elevation: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
  },
  waveContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  wave: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  step: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#4158D0',
    transform: [{ scale: 1.2 }],
  },
  completedStep: {
    backgroundColor: '#10B981',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  badgeIcon: {
    marginRight: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  stepCounter: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});

export default LoadingSpinner; 