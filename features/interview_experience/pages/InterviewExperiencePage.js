import React, { useState, useEffect } from 'react';
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
import { useIsFocused, useRoute } from '@react-navigation/native';

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
  const [activeSection, setActiveSection] = useState(SECTIONS.JOURNEY);
  const isFocused = useIsFocused();
  const { interviewData, fetchCompanyData, loading, error } = useInterview();

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
          <Text style={styles.loadingText}>Loading interview experience data...</Text>
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

    if (!interviewData) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.noDataText}>No interview experience data available.</Text>
        </View>
      );
    }

    switch (activeSection) {
      case SECTIONS.JOURNEY:
        return <InterviewJourney data={interviewData.interviewJourney} />;
      case SECTIONS.EXPERIENCES:
        return <CandidateExperiences data={interviewData.candidateExperiences} />;
      case SECTIONS.TECHNICAL:
        return <TechnicalQuestions data={interviewData.technicalQuestions} />;
      case SECTIONS.ROLE_SPECIFIC:
        return <RoleSpecificQuestions data={interviewData.roleSpecificQuestions} />;
      case SECTIONS.BEHAVIORAL:
        return <BehavioralQuestions data={interviewData.behavioralQuestions} />;
      case SECTIONS.STATS:
        return <QuestionStats data={interviewData.questionStats} />;
      case SECTIONS.TIPS:
        return <MockInterviewTips data={interviewData.mockInterviewTips} />;
      default:
        return <InterviewJourney data={interviewData.interviewJourney} />;
    }
  };

  return (
    isFocused ? (
      <InterviewProvider>
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
      </InterviewProvider>
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
  placeholderContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginVertical: 8,
  },
}); 