import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const GRADIENTS = {
  blue: ['#4091FF', '#3F7EF8'],
  purple: ['#8257E5', '#D658D6'],
  orange: ['#FF9140', '#FBC748'],
  teal: ['#0984e3', '#00b894'],
  violet: ['#4158D0', '#C850C0'],
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
    gradient: GRADIENTS.blue,
    description: 'Where & how to get hired'
  },
  { 
    key: 'interview', 
    label: 'Interview Experience & Questions', 
    icon: '🧠',
    gradient: GRADIENTS.purple,
    description: 'Real questions and interview rounds'
  },
  { 
    key: 'culture', 
    label: 'Work Culture & Life', 
    icon: '🌿',
    gradient: GRADIENTS.teal,
    description: 'Intern experience, work-life balance'
  },
  { 
    key: 'reviews', 
    label: 'Employee Stories & Reviews', 
    icon: '⭐',
    gradient: GRADIENTS.orange,
    description: 'Real voices from the inside'
  },
  { 
    key: 'techstack', 
    label: 'Tech Stack & Tools Used', 
    icon: '🛠️',
    gradient: GRADIENTS.violet,
    description: 'Know what they use'
  },
  { 
    key: 'waysin', 
    label: 'Ways to Get In', 
    icon: '🚪',
    gradient: GRADIENTS.blue,
    description: 'Entry channels like referrals, portals'
  },
  { 
    key: 'insights', 
    label: 'Recent News & Highlights', 
    icon: '📈',
    gradient: GRADIENTS.purple,
    description: 'Campus drives, innovations'
  },
];

export default function CompanyTopicsList({ company, onSelectTopic }) {
  const navigation = useNavigation();

  const handleTopicPress = (topicKey) => {
    if (topicKey === 'core') {
      navigation.navigate('CompanyDetails');
    } else if (topicKey === 'jobs') {
      navigation.navigate('JobHirings');
    } else if (topicKey === 'interview') {
      navigation.navigate('InterviewExperience');
    } else {
      onSelectTopic(topicKey);
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
        activeOpacity={0.9}
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
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(246, 249, 252, 0.9)', 'rgba(236, 240, 243, 0.9)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Animatable.Text animation="fadeInDown" style={styles.header}>
        <Text style={styles.icon}>🏢</Text> {company}
      </Animatable.Text>
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
    paddingTop: 40,
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  icon: {
    fontSize: 32,
  },
  subHeader: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.85,
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardWrapper: {
    marginBottom: 16,
    width: '100%',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    backgroundColor: 'white',
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardIcon: {
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
}); 