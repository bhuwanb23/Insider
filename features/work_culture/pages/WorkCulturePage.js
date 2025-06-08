import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
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

// Define a mapping from workCultureData keys to section components and display info
const SECTION_COMPONENTS = {
  cultureOverview: { title: 'Company Culture', icon: '🏢', component: CultureOverviewSection },
  workLifeBalance: { title: 'Work-Life Balance', icon: '⚖️', component: WorkLifeBalanceSection },
  remoteWork: { title: 'Remote Work', icon: '🏠', component: RemoteWorkSection },
  teamCollaboration: { title: 'Team Collaboration', icon: '🤝', component: TeamCollaborationSection },
  mentalHealth: { title: 'Mental Health', icon: '🧠', component: MentalHealthSection },
  diversity: { title: 'Diversity & Inclusion', icon: '🌈', component: DiversitySection },
  employeeStories: { title: 'Employee Stories', icon: '👥', component: EmployeeStoriesSection },
};

export default function WorkCulturePage() {
  const { workCultureData, loading, error } = useWorkCulture();
  const [activeSectionKey, setActiveSectionKey] = useState(null);

  // Set the first available section as active when workCultureData loads
  useEffect(() => {
    if (workCultureData && Object.keys(workCultureData).length > 0) {
      const availableSectionKeys = Object.keys(SECTION_COMPONENTS).filter(key => workCultureData[key]);
      if (availableSectionKeys.length > 0) {
        setActiveSectionKey(availableSectionKeys[0]);
      } else {
        setActiveSectionKey(null);
      }
    } else {
      setActiveSectionKey(null);
    }
  }, [workCultureData]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4158D0" />
        <Text style={styles.centeredText}>Loading work culture data...</Text>
      </View>
    );
  }

  if (error || !workCultureData || Object.keys(workCultureData).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>{error || 'No work culture data available.'}</Text>
      </View>
    );
  }
  
  // Ensure activeSectionKey is set before rendering content
  if (!activeSectionKey || !SECTION_COMPONENTS[activeSectionKey]) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>No work culture sections found or selected.</Text>
      </View>
    );
  }

  const ActiveComponent = SECTION_COMPONENTS[activeSectionKey].component;
  const currentSectionData = workCultureData[activeSectionKey];
  const availableSectionKeys = Object.keys(SECTION_COMPONENTS).filter(key => workCultureData[key]);

  const renderContent = () => {
    if (ActiveComponent && currentSectionData) {
      return <ActiveComponent data={currentSectionData} />;
    }
    return null;
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
          {availableSectionKeys.map((key) => {
            const section = SECTION_COMPONENTS[key];
            const isActive = activeSectionKey === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.tab,
                  isActive && styles.activeTab,
                ]}
                onPress={() => setActiveSectionKey(key)}
                tabIndex={isActive ? 0 : -1}
                importantForAccessibility={isActive ? 'yes' : 'no-hide-descendants'}
              >
                <LinearGradient
                  colors={
                    isActive
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
                      isActive && styles.activeTabText,
                    ]}
                  >
                    {section.title}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
}); 