import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(65, 88, 208, 0.8)', 'rgba(200, 80, 192, 0.8)']}
        style={styles.gradient}
      >
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.text}>{message}</Text>
      </LinearGradient>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  gradient: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoadingSpinner; 