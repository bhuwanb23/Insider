import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Text, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useWaysToGetIn } from '../features/ways_to_get_in/context/WaysToGetInContext';

export default function CompanyTopicsPage({ company, onSelectTopic, onBack, navigation }) {
  const { waysData } = useWaysToGetIn();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderTopicCard = (key, data) => {
    const isValidData = data && data.icon && data.title && data.description;
    if (!isValidData) return null;

    return (
      <TouchableOpacity
        key={key}
        style={styles.card}
        onPress={() => onSelectTopic(key)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['rgba(65, 88, 208, 0.8)', 'rgba(200, 80, 192, 0.8)']}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.icon}>{data.icon}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {data.description}
          </Text>
          {data.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{data.badge}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  if (!waysData) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => {
          if (navigation) {
            navigation.goBack();
          } else if (onBack) {
            onBack();
          }
        }} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4158D0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{company}</Text>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(waysData)
          .filter(([_, data]) => data && data.title) // Filter out invalid data
          .map(([key, data]) => renderTopicCard(key, data))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(65, 88, 208, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  gridContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 0.8,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
    color: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
  },
});