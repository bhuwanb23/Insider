import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RatingIndicator({ score, label, size = 'medium', showText = true }) {
  // Always coerce score to a number
  const safeScore = typeof score === 'number' ? score : Number(score);
  const displayScore = !isNaN(safeScore) ? safeScore.toFixed(1) : 'N/A';

  const getStars = () => {
    const stars = [];
    const fullStars = Math.floor(safeScore);
    const hasHalfStar = safeScore % 1 >= 0.5;

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
    if (safeScore >= 4) return '#4CAF50';
    if (safeScore >= 3) return '#FFC107';
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
            {displayScore}
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