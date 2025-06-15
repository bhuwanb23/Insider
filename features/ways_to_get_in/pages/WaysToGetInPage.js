import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import CampusRecruitment from '../components/CampusRecruitment';
import JobPortals from '../components/JobPortals';
import Referrals from '../components/Referrals';
import HackathonsCompetitions from '../components/HackathonsCompetitions';
import ColdOutreach from '../components/ColdOutreach';
import InternshipConversion from '../components/InternshipConversion';
import ContractRoles from '../components/ContractRoles';
import { useWaysToGetIn } from '../context/WaysToGetInContext';
import { WaysToGetInProvider } from '../context/WaysToGetInContext';

const SECTIONS = {
  CAMPUS: { title: 'Campus Recruitment', icon: '🎓', key: 'campusRecruitment' },
  PORTALS: { title: 'Job Portals', icon: '🔍', key: 'jobPortals' },
  REFERRALS: { title: 'Referrals', icon: '👥', key: 'referrals' },
  HACKATHONS: { title: 'Hackathons', icon: '🧩', key: 'hackathons' },
  OUTREACH: { title: 'Cold Outreach', icon: '✉️', key: 'coldOutreach' },
  INTERNSHIP: { title: 'Internship - Full-Time', icon: '🚀', key: 'internshipConversion' },
  CONTRACT: { title: 'Contract Roles', icon: '💼', key: 'contractRoles' },
};

const { width } = Dimensions.get('window');

export default function WaysToGetInPage({ route }) {
  console.log('[WaysToGetInPage] route.params:', route.params);
  console.log('[WaysToGetInPage] rawData received:', route.params?.rawData);
  console.log('[WaysToGetInPage] waysData:', route.params?.rawData?.waysData);
  return (
    <WaysToGetInProvider rawData={route.params?.rawData}>
      <WaysToGetInContent route={route} />
    </WaysToGetInProvider>
  );
}

function WaysToGetInContent({ route }) {
  const { waysData, loading, error } = useWaysToGetIn();
  console.log('[WaysToGetInContent] loading:', loading, 'error:', error, 'waysData:', waysData);
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading ways to get in...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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

      <SafeAreaView
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
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 12,
  },
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
    paddingBottom: 8,
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
    paddingHorizontal: 16,
    paddingTop: 0,
  },
});