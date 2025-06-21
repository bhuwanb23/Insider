import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoadingSpinner from '../common/LoadingSpinner';

const { width } = Dimensions.get('window');

const GRADIENTS = {
  violet: ['#4158D0', '#C850C0'],
  sunset: ['#FF512F', '#F09819'],
  ocean: ['#2E3192', '#1BFFFF'],
  forest: ['#134E5E', '#71B280'],
  berry: ['#8E2DE2', '#4A00E0'],
  coral: ['#FF416C', '#FF4B2B'],
  sky: ['#0082c8', '#667db6'],
};

// Map topic keys to their respective navigation routes and screens
const TOPIC_ROUTES = {
  core: {
    screen: 'CompanyDetails',
    params: { path: 'features/core_company_details' }
  },
  jobs: {
    screen: 'JobHirings',
    params: { path: 'features/job_hirings_insights' }
  },
  interview: {
    screen: 'InterviewExperience',
    params: { path: 'features/interview_experience' }
  },
  culture: {
    screen: 'WorkCulture',
    params: { path: 'features/work_culture' }
  },
  techstack: {
    screen: 'TechStack',
    params: { path: 'features/tech_stack' }
  },
  waysin: {
    screen: 'WaysToGetIn',
    params: { 
      path: 'features/ways_to_get_in',
      initialTopic: 'CAMPUS' // Match the SECTIONS key in WaysToGetInPage
    }
  },
  insights: {
    screen: 'NewsHighlights',
    params: { path: 'features/news_highlights' }
  }
};

const topics = [
  {
    key: 'core',
    label: 'Core Company Profile',
    icon: '🏢',
    gradient: GRADIENTS.violet,
    description: 'What the company does'
  },
  {
    key: 'jobs',
    label: 'Jobs & Hiring Insights',
    icon: '💼',
    gradient: GRADIENTS.sunset,
    description: 'Where & how to get hired'
  },
  {
    key: 'interview',
    label: 'Interview Experience & Questions',
    icon: '🧠',
    gradient: GRADIENTS.ocean,
    description: 'Real questions and interview rounds'
  },
  {
    key: 'culture',
    label: 'Work Culture & Life',
    icon: '🌿',
    gradient: GRADIENTS.forest,
    description: 'Intern experience, work-life balance'
  },
  {
    key: 'techstack',
    label: 'Tech Stack & Tools Used',
    icon: '🛠️',
    gradient: GRADIENTS.berry,
    description: 'Know what they use'
  },
  {
    key: 'waysin',
    label: 'Ways to Get In',
    icon: '🚪',
    gradient: GRADIENTS.coral,
    description: 'Entry channels like referrals, portals'
  },
  {
    key: 'insights',
    label: 'Recent News & Highlights',
    icon: '📈',
    gradient: GRADIENTS.sky,
    description: 'Campus drives, innovations'
  },
];

export default function CompanyTopicsList({ company, allData, onBack }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 3500);
      return () => clearTimeout(timer);
    }, [])
  );

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const handleTopicPress = (topicKey) => {
    const route = TOPIC_ROUTES[topicKey];
    if (route) {
      // Map topicKey to the correct rawData key
      const rawDataKeyMap = {
        core: 'coreData',
        jobs: 'jobHiringData',
        interview: 'interviewData',
        culture: 'cultureData',
        techstack: 'techStackData',
        waysin: 'waysData',
        insights: 'newsData'
      };
      const rawDataKey = rawDataKeyMap[topicKey];
      const rawData = allData && rawDataKey ? { [rawDataKey]: allData[rawDataKey] } : undefined;

      navigation.navigate(route.screen, {
        company,
        ...route.params,
        rawData, // Pass the correct rawData for the topic
        timestamp: new Date().getTime()
      });
    } else {
      console.warn(`No route found for topic: ${topicKey}`);
    }
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 150}
      style={styles.cardWrapper}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleTopicPress(item.key)}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={item.gradient}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={24} 
            color="rgba(255, 255, 255, 0.8)" 
            style={styles.arrowIcon}
          />
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <LoadingSpinner message="Loading topics..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(246, 249, 252, 0.9)', 'rgba(236, 240, 243, 0.9)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#4158D0" />
        </TouchableOpacity>
        <Animatable.Text animation="fadeInDown" style={styles.headerText}>
          <Text style={styles.icon}>🏢</Text> {company}
        </Animatable.Text>
      </View>

      <Animatable.Text animation="fadeIn" delay={200} style={styles.subHeader}>
        Explore topics about {company}
      </Animatable.Text>

      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 8 : 8,
    paddingBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(65, 88, 208, 0.95)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  icon: {
    fontSize: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subHeader: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 8,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardWrapper: {
    marginBottom: 12,
    width: '100%',
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    backgroundColor: 'white',
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardIcon: {
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 16,
  },
  arrowIcon: {
    marginLeft: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
}); 