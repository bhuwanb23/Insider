import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BADGE_COLORS = {
  default: {
    background: 'rgba(255, 255, 255, 0.2)',
    text: '#ffffff',
  },
  light: {
    background: 'rgba(255, 255, 255, 0.2)',
    text: '#ffffff',
  },
  primary: {
    background: 'rgba(65, 88, 208, 0.3)',
    text: '#ffffff',
  },
  secondary: {
    background: 'rgba(200, 80, 192, 0.3)',
    text: '#ffffff',
  },
  success: {
    background: 'rgba(16, 185, 129, 0.3)',
    text: '#ffffff',
  },
  warning: {
    background: 'rgba(245, 158, 11, 0.3)',
    text: '#ffffff',
  },
  info: {
    background: 'rgba(99, 102, 241, 0.3)',
    text: '#ffffff',
  },
};

export default function Badge({ label, variant = 'default' }) {
  const colors = BADGE_COLORS[variant.toLowerCase()] || BADGE_COLORS.default;

  return (
    <View style={[styles.badge, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 2,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    opacity: 0.9,
  },
}); 