import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWorkCulture } from '../context/WorkCultureContext';
import RatingIndicator from '../components/RatingIndicator';
import EmployeeStoryCard from '../components/EmployeeStoryCard';
import Badge from '../../tech_stack/components/Badge';

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

export default function WorkCulturePage() {
  const [activeSection, setActiveSection] = useState(SECTIONS.CULTURE);
  const workCultureData = useWorkCulture();

  const renderCultureOverview = () => (
    <View style={styles.sectionContent}>
      <View style={styles.valuesList}>
        {workCultureData.cultureOverview.coreValues.map((value, index) => (
          <View key={index} style={styles.valueItem}>
            <Text style={styles.valueIcon}>{value.icon}</Text>
            <Text style={styles.valueTitle}>{value.value}</Text>
            <Text style={styles.valueDescription}>{value.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.culturalVibeContainer}>
        <Text style={styles.subheading}>Cultural Vibe</Text>
        <Text style={styles.vibeText}>
          {workCultureData.cultureOverview.culturalVibe.icon} {workCultureData.cultureOverview.culturalVibe.type}
        </Text>
        <View style={styles.attributesContainer}>
          {workCultureData.cultureOverview.culturalVibe.attributes.map((attr, index) => (
            <Badge key={index} label={attr} variant="primary" />
          ))}
        </View>
      </View>
    </View>
  );

  const renderWorkLifeBalance = () => (
    <View style={styles.sectionContent}>
      <View style={styles.ratingContainer}>
        <RatingIndicator
          score={workCultureData.workLifeBalance.rating}
          label="Overall Rating"
          size="large"
        />
        <Text style={styles.reviewCount}>
          Based on {workCultureData.workLifeBalance.totalReviews} reviews
        </Text>
      </View>

      <View style={styles.metricsContainer}>
        {workCultureData.workLifeBalance.metrics.map((metric, index) => (
          <View key={index} style={styles.metricItem}>
            <Text style={styles.metricLabel}>{metric.category}</Text>
            <RatingIndicator score={metric.score} showText={false} size="small" />
            <Badge label={metric.status} variant={metric.status === 'great' ? 'success' : 'primary'} />
          </View>
        ))}
      </View>
    </View>
  );

  const renderRemoteWork = () => (
    <View style={styles.sectionContent}>
      <View style={styles.policyContainer}>
        <Text style={styles.policyTitle}>
          {workCultureData.remoteWork.policy} 
          <MaterialCommunityIcons name="laptop" size={20} color="#4158D0" />
        </Text>
        
        <View style={styles.detailsGrid}>
          {Object.entries(workCultureData.remoteWork.details).map(([key, value]) => (
            <View key={key} style={styles.detailItem}>
              <MaterialCommunityIcons
                name={key === 'remoteAllowed' ? 'home-outline' : 'check-circle-outline'}
                size={24}
                color="#4158D0"
              />
              <Text style={styles.detailText}>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.subheading}>Benefits</Text>
          {workCultureData.remoteWork.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <MaterialCommunityIcons name="check" size={18} color="#4CAF50" />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderTeamCollaboration = () => (
    <View style={styles.sectionContent}>
      <View style={styles.scoreContainer}>
        <Text style={styles.subheading}>Team Spirit Score</Text>
        <RatingIndicator score={workCultureData.teamCollaboration.overallScore} size="large" />
      </View>

      <View style={styles.activitiesContainer}>
        {workCultureData.teamCollaboration.activities.map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <Text style={styles.activityIcon}>{activity.icon}</Text>
            <View style={styles.activityInfo}>
              <Text style={styles.activityType}>{activity.type}</Text>
              <Text style={styles.activityDetails}>
                {activity.frequency} • {activity.participation} participation
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderMentalHealth = () => (
    <View style={styles.sectionContent}>
      <View style={styles.wellnessScore}>
        <Text style={styles.subheading}>Wellness Support Rating</Text>
        <RatingIndicator score={workCultureData.mentalHealth.overallScore} size="large" />
      </View>

      <View style={styles.programsContainer}>
        {workCultureData.mentalHealth.programs.map((program, index) => (
          <View key={index} style={styles.programCard}>
            <Text style={styles.programIcon}>{program.icon}</Text>
            <View style={styles.programInfo}>
              <Text style={styles.programName}>{program.name}</Text>
              <Text style={styles.programDetails}>Coverage: {program.coverage}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderDiversity = () => (
    <View style={styles.sectionContent}>
      <View style={styles.statsContainer}>
        <Text style={styles.subheading}>Diversity Statistics</Text>
        {Object.entries(workCultureData.diversity.stats).map(([key, value]) => (
          <View key={key} style={styles.statItem}>
            <Text style={styles.statLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
            <Text style={styles.statValue}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.initiativesContainer}>
        {workCultureData.diversity.initiatives.map((initiative, index) => (
          <View key={index} style={styles.initiativeCard}>
            <Text style={styles.initiativeIcon}>{initiative.icon}</Text>
            <View style={styles.initiativeInfo}>
              <Text style={styles.initiativeName}>{initiative.name}</Text>
              <Text style={styles.initiativeMembers}>{initiative.members} members</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderEmployeeStories = () => (
    <View style={styles.sectionContent}>
      {workCultureData.employeeStories.map((story, index) => (
        <EmployeeStoryCard key={index} story={story} />
      ))}
    </View>
  );

  const renderContent = () => {
    switch (activeSection) {
      case SECTIONS.CULTURE:
        return renderCultureOverview();
      case SECTIONS.BALANCE:
        return renderWorkLifeBalance();
      case SECTIONS.REMOTE:
        return renderRemoteWork();
      case SECTIONS.COLLABORATION:
        return renderTeamCollaboration();
      case SECTIONS.WELLNESS:
        return renderMentalHealth();
      case SECTIONS.DIVERSITY:
        return renderDiversity();
      case SECTIONS.STORIES:
        return renderEmployeeStories();
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
  sectionContent: {
    marginBottom: 16,
  },
  // Culture Overview Styles
  valuesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  valueItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  valueIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  valueDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  // Work-Life Balance Styles
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  metricsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  metricLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  // Remote Work Styles
  policyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  detailItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  // Team Collaboration Styles
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  activitiesContainer: {
    marginTop: 16,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 12,
    color: '#666',
  },
  // Mental Health Styles
  wellnessScore: {
    alignItems: 'center',
    marginBottom: 24,
  },
  programsContainer: {
    marginTop: 16,
  },
  programCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  programIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  programDetails: {
    fontSize: 12,
    color: '#666',
  },
  // Diversity Styles
  statsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  initiativesContainer: {
    marginTop: 16,
  },
  initiativeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  initiativeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  initiativeInfo: {
    flex: 1,
  },
  initiativeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  initiativeMembers: {
    fontSize: 12,
    color: '#666',
  },
  // Common Styles
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  culturalVibeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vibeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  attributesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  benefitsContainer: {
    marginTop: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
}); 