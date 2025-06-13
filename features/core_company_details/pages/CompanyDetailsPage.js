import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCoreCompanyDetails } from '../context/CoreCompanyDetailsContext';
import { useRoute, useIsFocused } from '@react-navigation/native';
import BasicIdentity from '../components/BasicIdentity';
import Overview from '../components/Overview';
import LegalDetails from '../components/LegalDetails';
import Leadership from '../components/Leadership';
import Timeline from '../components/Timeline';
import Awards from '../components/Awards';

const SECTIONS = {
  BASIC: { title: 'Basic', icon: '🏢' },
  OVERVIEW: { title: 'Overview', icon: '📋' },
  LEGAL: { title: 'Legal', icon: '⚖️' },
  LEADERSHIP: { title: 'Leaders', icon: '👥' },
  TIMELINE: { title: 'Timeline', icon: '📅' },
  AWARDS: { title: 'Awards', icon: '🏆' },
};

const { width } = Dimensions.get('window');

export default function CompanyDetailsPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS.BASIC);
  const route = useRoute();
  const { company } = route.params || {};
  const { loading, error, companyData, fetchCompanyData } = useCoreCompanyDetails();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && company) {
      // Data should be pre-loaded from SearchPage; no need to refetch here.
    }
  }, [isFocused, company]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#4158D0" />
          <Text style={styles.loadingText}>Loading company details...</Text>
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

    if (!companyData) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.noDataText}>No company data available for {company}</Text>
        </View>
      );
    }

    switch (activeSection) {
      case SECTIONS.BASIC:
        return <BasicIdentity data={companyData.basicIdentity} />;
      case SECTIONS.OVERVIEW:
        return <Overview data={companyData.overview} />;
      case SECTIONS.LEGAL:
        return <LegalDetails data={companyData.legalDetails} />;
      case SECTIONS.LEADERSHIP:
        return <Leadership data={companyData.basicIdentity?.keyPeople} />;
      case SECTIONS.TIMELINE:
        return <Timeline data={companyData.timeline} />;
      case SECTIONS.AWARDS:
        return <Awards data={companyData.recognition} />;
      default:
        return <BasicIdentity data={companyData.basicIdentity} />;
    }
  };

  return (
    isFocused ? (
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{company}</Text>
        </View>

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

        <ScrollView style={styles.content}>
          {renderContent()}
        </ScrollView>
      </LinearGradient>
    ) : null
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
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