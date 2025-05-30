import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RatingIndicator({ score, label, size = 'medium', showText = true }) {
  const getStars = () => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('star');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('star-half-full');
      } else {
        stars.push('star-outline');
      }
    }
    return stars;
  };

  const getStatusColor = () => {
    if (score >= 4) return '#4CAF50';
    if (score >= 3) return '#FFC107';
    return '#F44336';
  };

  const iconSize = size === 'large' ? 24 : size === 'medium' ? 18 : 14;

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {getStars().map((starType, index) => (
          <MaterialCommunityIcons
            key={index}
            name={starType}
            size={iconSize}
            color="#FFD700"
            style={styles.star}
          />
        ))}
      </View>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.score, { color: getStatusColor() }]}>
            {score.toFixed(1)}
          </Text>
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 1,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
}); 