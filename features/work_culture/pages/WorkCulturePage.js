import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import SimpleLoader from '../components/SimpleLoader';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkCulture } from '../context/WorkCultureContext';
import CultureOverviewSection from '../components/CultureOverviewSection';
import WorkLifeBalanceSection from '../components/WorkLifeBalanceSection';
import RemoteWorkSection from '../components/RemoteWorkSection';
import TeamCollaborationSection from '../components/TeamCollaborationSection';
import MentalHealthSection from '../components/MentalHealthSection';
import DiversitySection from '../components/DiversitySection';
import EmployeeStoriesSection from '../components/EmployeeStoriesSection';

const { width } = Dimensions.get('window');

const SECTIONS = {
  CULTURE: {
    title: 'Company Culture',
    icon: '🏢',
  },
  BALANCE: {
    title: 'Work-Life Balance',
    icon: '⚖️',
  },
  REMOTE: {
    title: 'Remote Work',
    icon: '🏠',
  },
  COLLABORATION: {
    title: 'Team Collaboration',
    icon: '🤝',
  },
  WELLNESS: {
    title: 'Mental Health',
    icon: '🧠',
  },
  DIVERSITY: {
    title: 'Diversity & Inclusion',
    icon: '🌈',
  },
  STORIES: {
    title: 'Employee Stories',
    icon: '👥',
  },
};

export default function WorkCulturePage({ route }) {
  const [activeSection, setActiveSection] = useState(SECTIONS.CULTURE);
  const { workCultureData } = useWorkCulture();

  if (!workCultureData) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <SimpleLoader />
      </View>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case SECTIONS.CULTURE:
        return <CultureOverviewSection data={workCultureData.cultureOverview} />;
      case SECTIONS.BALANCE:
        return <WorkLifeBalanceSection data={workCultureData.workLifeBalance} />;
      case SECTIONS.REMOTE:
        return <RemoteWorkSection data={workCultureData.remoteWork} />;
      case SECTIONS.COLLABORATION:
        return <TeamCollaborationSection data={workCultureData.teamCollaboration} />;
      case SECTIONS.WELLNESS:
        return <MentalHealthSection data={workCultureData.mentalHealth} />;
      case SECTIONS.DIVERSITY:
        return <DiversitySection data={workCultureData.diversity} />;
      case SECTIONS.STORIES:
        return <EmployeeStoriesSection data={workCultureData.employeeStories} />;
      default:
        return null;
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
                colors={
                  activeSection === SECTIONS[key]
                    ? ['#4158D0', '#C850C0']
                    : ['transparent', 'transparent']
                }
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
        <View style={styles.contentContainer}>{renderContent()}</View>
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