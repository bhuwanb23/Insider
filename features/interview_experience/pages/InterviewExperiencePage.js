import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { InterviewProvider, useInterview } from '../context/InterviewContext';
import InterviewJourney from '../components/InterviewJourney';
import CandidateExperiences from '../components/CandidateExperiences';
import TechnicalQuestions from '../components/TechnicalQuestions';
import RoleSpecificQuestions from '../components/RoleSpecificQuestions';
import BehavioralQuestions from '../components/BehavioralQuestions';
import QuestionStats from '../components/QuestionStats';
import MockInterviewTips from '../components/MockInterviewTips';

const SECTIONS = {
  JOURNEY: { title: 'Interview Journey', icon: '🛤️' },
  EXPERIENCES: { title: 'Candidate Stories', icon: '🧑‍💻' },
  TECHNICAL: { title: 'Technical Questions', icon: '👨‍💻' },
  ROLE_SPECIFIC: { title: 'Role Questions', icon: '🎯' },
  BEHAVIORAL: { title: 'HR Questions', icon: '🧠' },
  STATS: { title: 'Question Stats', icon: '📊' },
  TIPS: { title: 'Mock Interview', icon: '🧾' },
};

const { width } = Dimensions.get('window');

export default function InterviewExperiencePage({ route }) {
  console.log('[InterviewExperiencePage] route.params:', route.params);
  console.log('[InterviewExperiencePage] rawData received:', route.params?.rawData);
  console.log('[InterviewExperiencePage] interviewData:', route.params?.rawData?.interviewData);
  return (
    <InterviewProvider rawData={route.params?.rawData}>
      <InterviewContent />
    </InterviewProvider>
  );
}

// Separate component to use the context
function InterviewContent() {
  const { loading, error, interviewData } = useInterview();
  console.log('[InterviewContent] loading:', loading, 'error:', error, 'interviewData:', interviewData);
  const [activeSection, setActiveSection] = useState(SECTIONS.JOURNEY);

  // Show loading indicator while data is being processed
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4158D0" />
        <Text style={styles.loadingText}>Loading interview data...</Text>
      </View>
    );
  }

  // Show error message if there was a problem
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Ensure we have interview data before rendering
  if (!interviewData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No interview data available</Text>
      </View>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case SECTIONS.JOURNEY:
        return <InterviewJourney />;
      case SECTIONS.EXPERIENCES:
        return <CandidateExperiences />;
      case SECTIONS.TECHNICAL:
        return <TechnicalQuestions />;
      case SECTIONS.ROLE_SPECIFIC:
        return <RoleSpecificQuestions />;
      case SECTIONS.BEHAVIORAL:
        return <BehavioralQuestions />;
      case SECTIONS.STATS:
        return <QuestionStats />;
      case SECTIONS.TIPS:
        return <MockInterviewTips />;
      default:
        return <InterviewJourney />;
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
  placeholderContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginVertical: 8,
  },
});