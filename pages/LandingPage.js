import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Animated } from 'react-native';
import LandingHero from '../components/landing_page/LandingHero';
import Features from '../components/landing_page/Features';
import BackgroundEffects from '../components/landing_page/BackgroundEffects';
import SearchPage from '../pages/SearchPage';

export default function LandingPage() {
  const [showSearch, setShowSearch] = useState(false);
  const scrollY = new Animated.Value(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleBackToLanding = () => {
    setShowSearch(false);
  };

  if (showSearch) {
    return <SearchPage onBack={handleBackToLanding} />;
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
      >
        <View style={styles.contentWrapper}>
          <LandingHero onGetStarted={() => setShowSearch(true)} />
          <Features />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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