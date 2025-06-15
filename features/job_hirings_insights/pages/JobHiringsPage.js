import React, { useState } from 'react';
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

export default function JobHiringsPage({ navigation, route }) {
  console.log('[JobHiringsPage] route.params:', route.params);
  console.log('[JobHiringsPage] rawData received:', route.params?.rawData);
  console.log('[JobHiringsPage] jobHiringData:', route.params?.rawData?.jobHiringData);
  const [activeSection, setActiveSection] = useState(SECTIONS.ROLES);
  const rawData = route.params?.rawData;

  function JobHiringsContent() {
    const { loading, error, jobHiringData } = useJobHiring();
    console.log('[JobHiringsContent] loading:', loading, 'error:', error, 'jobHiringData:', jobHiringData);

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4158D0" />
          <Text style={styles.loadingText}>Loading hiring data...</Text>
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

    if (!jobHiringData) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No hiring data available</Text>
        </View>
      );
    }

    const renderContent = () => {
      switch (activeSection) {
        case SECTIONS.ROLES:
          return <CommonRoles />;
        case SECTIONS.INTERNSHIP:
          return <InternshipConversion />;
        case SECTIONS.CHANNELS:
          return <HiringChannels />;
        case SECTIONS.TRENDS:
          return <JobTrends />;
        case SECTIONS.TIMELINE:
          return <HiringTimeline />;
        case SECTIONS.PROCESS:
          return <HiringProcess />;
        case SECTIONS.RESUME:
          return <ResumeTips />;
        default:
          return <CommonRoles />;
      }
    };

    return (
      <LinearGradient
        colors={["#ffffff", "#f8f9fa"]}
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
                  colors={activeSection === SECTIONS[key] ? ["#4158D0", "#C850C0"] : ["transparent", "transparent"]}
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

  return (
    <JobHiringProvider rawData={rawData}>
      <JobHiringsContent />
    </JobHiringProvider>
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
    marginTop: 16,
    fontSize: 16,
    color: '#4158D0',
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
    color: 'red',
    textAlign: 'center',
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