import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CampusRecruitment from '../components/CampusRecruitment';
import JobPortals from '../components/JobPortals';
import Referrals from '../components/Referrals';
import HackathonsCompetitions from '../components/HackathonsCompetitions';
import ColdOutreach from '../components/ColdOutreach';
import InternshipConversion from '../components/InternshipConversion';
import ContractRoles from '../components/ContractRoles';

const SECTIONS = {
  CAMPUS: { title: 'Campus Recruitment', icon: '🎓' },
  PORTALS: { title: 'Job Portals', icon: '🔍' },
  REFERRALS: { title: 'Referrals', icon: '👥' },
  HACKATHONS: { title: 'Hackathons', icon: '🧩' },
  OUTREACH: { title: 'Cold Outreach', icon: '✉️' },
  INTERNSHIP: { title: 'Internship → Full-Time', icon: '🚀' },
  CONTRACT: { title: 'Contract Roles', icon: '💼' },
};

const { width } = Dimensions.get('window');

export default function WaysToGetInPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS.CAMPUS);

  const renderContent = () => {
    switch (activeSection) {
      case SECTIONS.CAMPUS:
        return <CampusRecruitment />;
      case SECTIONS.PORTALS:
        return <JobPortals />;
      case SECTIONS.REFERRALS:
        return <Referrals />;
      case SECTIONS.HACKATHONS:
        return <HackathonsCompetitions />;
      case SECTIONS.OUTREACH:
        return <ColdOutreach />;
      case SECTIONS.INTERNSHIP:
        return <InternshipConversion />;
      case SECTIONS.CONTRACT:
        return <ContractRoles />;
      default:
        return <CampusRecruitment />;
    }
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
          {Object.entries(SECTIONS).map(([key, section]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.tab,
                activeSection === SECTIONS[key] && styles.activeTab,
              ]}
              onPress={() => setActiveSection(SECTIONS[key])}
            >
              <LinearGradient
                colors={activeSection === SECTIONS[key] ? ['#4158D0', '#C850C0'] : ['transparent', 'transparent']}
                style={styles.tabGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.tabIcon}>{section.icon}</Text>
                <Text
                  style={[
                    styles.tabText,
                    activeSection === SECTIONS[key] && styles.activeTabText,
                  ]}
                >
                  {section.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
      </ScrollView>
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