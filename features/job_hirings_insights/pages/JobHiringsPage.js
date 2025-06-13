import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions, ActivityIndicator } from 'react-native';
import { JobHiringProvider, useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';
import CommonRoles from '../components/CommonRoles';
import InternshipConversion from '../components/InternshipConversion';
import HiringChannels from '../components/HiringChannels';
import JobTrends from '../components/JobTrends';
import HiringTimeline from '../components/HiringTimeline';
import HiringProcess from '../components/HiringProcess';
import ResumeTips from '../components/ResumeTips';
import { useIsFocused, useRoute } from '@react-navigation/native';

const SECTIONS = {
  ROLES: { title: 'Roles', icon: '💼' },
  INTERNSHIP: { title: 'Internship', icon: '🎓' },
  CHANNELS: { title: 'Channels', icon: '🔗' },
  TRENDS: { title: 'Trends', icon: '📈' },
  TIMELINE: { title: 'Timeline', icon: '📅' },
  PROCESS: { title: 'Process', icon: '📋' },
  RESUME: { title: 'Resume', icon: '📝' },
};

const { width } = Dimensions.get('window');

export default function JobHiringsPage({ route }) {
  const [activeSection, setActiveSection] = useState(SECTIONS.ROLES);
  const isFocused = useIsFocused();
  const { jobHiringData, fetchCompanyData, loading, error } = useJobHiring();

  useEffect(() => {
    const { company } = route.params || {};
    if (isFocused && company) {
      fetchCompanyData(company);
    }
  }, [isFocused, route?.params?.company, fetchCompanyData]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#4158D0" />
          <Text style={styles.loadingText}>Loading job hiring insights...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (!jobHiringData) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.noDataText}>No job hiring insights data available.</Text>
        </View>
      );
    }

    switch (activeSection) {
      case SECTIONS.ROLES:
        return <CommonRoles data={jobHiringData.commonRoles} />;
      case SECTIONS.INTERNSHIP:
        return <InternshipConversion data={jobHiringData.internshipConversion} />;
      case SECTIONS.CHANNELS:
        return <HiringChannels data={jobHiringData.hiringChannels} />;
      case SECTIONS.TRENDS:
        return <JobTrends data={jobHiringData.jobTrends} />;
      case SECTIONS.TIMELINE:
        return <HiringTimeline data={jobHiringData.hiringTimeline} />;
      case SECTIONS.PROCESS:
        return <HiringProcess data={jobHiringData.hiringProcess} />;
      case SECTIONS.RESUME:
        return <ResumeTips data={jobHiringData.resumeTips} />;
      default:
        return <CommonRoles data={jobHiringData.commonRoles} />;
    }
  };

  return (
    isFocused ? (
    <JobHiringProvider>
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
              {Object.entries(SECTIONS).map(([key, section]) => {
                const isActive = activeSection === SECTIONS[key];
                return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.tab,
                      isActive && styles.activeTab,
                ]}
                    onPress={(event) => {
                      if (event && event.currentTarget) {
                        event.currentTarget.blur();
                      }
                      setActiveSection(SECTIONS[key]);
                    }}
                    tabIndex={isActive ? 0 : -1}
                    importantForAccessibility={isActive ? 'yes' : 'no-hide-descendants'}
              >
                <LinearGradient
                      colors={isActive ? ['#4158D0', '#C850C0'] : ['transparent', 'transparent']}
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
          <View style={styles.contentContainer}>
            {renderContent()}
          </View>
        </ScrollView>
      </LinearGradient>
    </JobHiringProvider>
    ) : null
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#d9534f',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
}); 