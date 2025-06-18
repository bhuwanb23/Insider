import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Animated, InteractionManager, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LandingHero from '../components/landing_page/LandingHero';
import Features from '../components/landing_page/Features';
import BackgroundEffects from '../components/landing_page/BackgroundEffects';

const LandingPage = () => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Use useFocusEffect to handle screen focus
  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        // Delay setting isReady to ensure smooth transition
        setTimeout(() => {
          setIsReady(true);
        }, 100);
      });

      return () => {
        task.cancel();
        setIsReady(false);
      };
    }, [])
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const handleBackToLanding = () => {
    setShowSearch(false);
  };

  const handleGetStarted = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('Search');
    });
  }, [navigation]);

  // If not ready, render a placeholder with the same background
  if (!isReady) {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <BackgroundEffects />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <BackgroundEffects />
      </View>
      <Animated.ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        overScrollMode="never"
      >
        <View style={styles.contentWrapper}>
          <LandingHero onGetStarted={handleGetStarted} />
          <Features />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fc',
    position: 'relative',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 2,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
});

export default LandingPage; 