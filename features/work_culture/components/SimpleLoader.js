import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function SimpleLoader({ message = 'Loading...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4158D0" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});