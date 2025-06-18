import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TopicStatusItem = ({ item, onAnimationComplete }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Entry animation
    const entryAnimation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    // Exit animation when status is 'completed' or 'error'
    const exitAnimation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 500,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    if (item.status === 'loading') {
      entryAnimation.start();
    } else if (item.status === 'completed' || item.status === 'error') {
      entryAnimation.start(() => {
        // Wait a moment to show the success/error state
        setTimeout(() => {
          exitAnimation.start(() => {
            if (onAnimationComplete) {
              onAnimationComplete();
            }
          });
        }, 1000); // Show completed state for 1 second
      });
    }
  }, [item.status]);

  return (
    <Animated.View
      style={[
        styles.topicStatusContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.topicIconContainer}>
        {item.status === 'loading' ? (
          <MaterialCommunityIcons name="loading" size={16} color="#4158D0" />
        ) : item.status === 'completed' ? (
          <MaterialCommunityIcons name="check-circle" size={16} color="#4CAF50" />
        ) : (
          <MaterialCommunityIcons name="alert-circle" size={16} color="#FF9800" />
        )}
      </View>
      <Text style={[
        styles.topicText,
        item.status === 'completed' && styles.completedText,
        item.status === 'error' && styles.errorText
      ]}>
        {item.topic}
      </Text>
    </Animated.View>
  );
};

const LoadingSpinner = ({ message = 'Loading...', topicStatuses = [] }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [currentTopicIndex, setCurrentTopicIndex] = React.useState(0);
  
  // Get current topic
  const currentTopic = topicStatuses[currentTopicIndex];

  useEffect(() => {
    // Rotation animation for the outer circle
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Subtle pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rotateAnim, pulseAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleTopicComplete = () => {
    if (currentTopicIndex < topicStatuses.length - 1) {
      setCurrentTopicIndex(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: pulseAnim }],
        }}
      >
        <LinearGradient
          colors={['#ffffff', '#f8f9fa']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.logoContainer}>
            <Animated.View style={[styles.spinnerRing, { transform: [{ rotate }] }]}>
              <LinearGradient
                colors={['#4158D0', '#C850C0', '#FFCC70', '#4158D0']}
                style={styles.spinnerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </Animated.View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="briefcase-search" size={36} color="#4158D0" />
            </View>
          </View>
          
          <Text style={styles.title}>Company Insider</Text>
          <Text style={styles.text}>{message}</Text>
          
          <View style={styles.topicListContainer}>
            {currentTopic && (
              <TopicStatusItem
                key={currentTopic.topic}
                item={currentTopic}
                onAnimationComplete={handleTopicComplete}
              />
            )}
          </View>

          <Text style={styles.progressText}>
            {`Step ${currentTopicIndex + 1} of ${topicStatuses.length}`}
          </Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  card: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 280,
    maxWidth: '80%',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: '#fff',
  },
  logoContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  spinnerRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  spinnerGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  text: {
    color: '#555',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 240,
  },
  topicListContainer: {
    width: '100%',
    height: 40, // Fixed height to prevent layout shifts
    marginTop: 16,
    justifyContent: 'center',
  },
  topicStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(65, 88, 208, 0.05)',
    borderRadius: 8,
  },
  topicIconContainer: {
    marginRight: 8,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  completedText: {
    color: '#4CAF50',
  },
  errorText: {
    color: '#FF9800',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoadingSpinner; 