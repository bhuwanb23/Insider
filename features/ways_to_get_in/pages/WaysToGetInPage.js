import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CampusRecruitment from '../components/CampusRecruitment';
import JobPortals from '../components/JobPortals';
import Referrals from '../components/Referrals';
import HackathonsCompetitions from '../components/HackathonsCompetitions';
import ColdOutreach from '../components/ColdOutreach';
import InternshipConversion from '../components/InternshipConversion';
import ContractRoles from '../components/ContractRoles';
import { useWaysToGetIn } from '../context/WaysToGetInContext';

const SECTIONS = {
  CAMPUS: { title: 'Campus Recruitment', icon: '🎓', key: 'campusRecruitment' },
  PORTALS: { title: 'Job Portals', icon: '🔍', key: 'jobPortals' },
  REFERRALS: { title: 'Referrals', icon: '👥', key: 'referrals' },
  HACKATHONS: { title: 'Hackathons', icon: '🧩', key: 'hackathons' },
  OUTREACH: { title: 'Cold Outreach', icon: '✉️', key: 'coldOutreach' },
  INTERNSHIP: { title: 'Internship → Full-Time', icon: '🚀', key: 'internshipConversion' },
  CONTRACT: { title: 'Contract Roles', icon: '💼', key: 'contractRoles' },
};

const { width } = Dimensions.get('window');

export default function WaysToGetInPage({ route }) {
  const { waysData } = useWaysToGetIn();
  const [activeSection, setActiveSection] = useState(SECTIONS.CAMPUS || Object.values(SECTIONS)[0]);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Set initial topic if provided in route params
    if (route?.params?.initialTopic) {
      const section = SECTIONS[route.params.initialTopic];
      if (section) {
        setActiveSection(section);
      }
    }

    // Animate component entry
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [route?.params?.initialTopic]);

  const renderContent = () => {
    if (!waysData) return null;

    switch (activeSection?.key) {
      case 'campusRecruitment':
        return <CampusRecruitment />;
      case 'jobPortals':
        return <JobPortals />;
      case 'referrals':
        return <Referrals />;
      case 'hackathons':
        return <HackathonsCompetitions />;
      case 'coldOutreach':
        return <ColdOutreach />;
      case 'internshipConversion':
        return <InternshipConversion />;
      case 'contractRoles':
        return <ContractRoles />;
      default:
        return <CampusRecruitment />;
    }
  };

  const renderTab = (key, section) => {
    if (!section) return null;
    
    const isActive = activeSection?.key === section.key;
    
    return (
      <TouchableOpacity
        key={key}
        style={[
          styles.tab,
          isActive && styles.activeTab,
        ]}
        onPress={() => setActiveSection(section)}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={isActive ? ['#4158D0', '#C850C0'] : ['transparent', 'transparent']}
          style={styles.tabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.tabIcon}>{section.icon || '📍'}</Text>
          <Text
            style={[
              styles.tabText,
              isActive && styles.activeTabText,
            ]}
          >
            {section.title || 'Section'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#f8f9fa']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.tabsWrapper}>
        <ScrollView 
          horizontal 
          style={styles.tabsContainer}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {Object.entries(SECTIONS).map(([key, section]) => renderTab(key, section))}
        </ScrollView>
      </View>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            {renderContent()}
          </View>
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsWrapper: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 8,
  },
  tabsContainer: {
    maxHeight: 44,
  },
  tabsContent: {
    paddingHorizontal: 12,
  },
  tab: {
    marginHorizontal: 4,
    borderRadius: 22,
    overflow: 'hidden',
  },
  tabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: width * 0.22,
  },
  activeTab: {
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
}); 