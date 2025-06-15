import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCoreCompanyDetails } from '../context/CoreCompanyDetailsContext';
import { useRoute } from '@react-navigation/native';
import BasicIdentity from '../components/BasicIdentity';
import Overview from '../components/Overview';
import LegalDetails from '../components/LegalDetails';
import Leadership from '../components/Leadership';
import Timeline from '../components/Timeline';
import Awards from '../components/Awards';
import { CoreCompanyDetailsProvider } from '../context/CoreCompanyDetailsContext';

const SECTIONS = {
  BASIC: { title: 'Basic', icon: '🏢' },
  OVERVIEW: { title: 'Overview', icon: '📋' },
  LEGAL: { title: 'Legal', icon: '⚖️' },
  LEADERSHIP: { title: 'Leaders', icon: '👥' },
  TIMELINE: { title: 'Timeline', icon: '📅' },
  AWARDS: { title: 'Awards', icon: '🏆' },
};

const { width } = Dimensions.get('window');

function parseCoreCompanyDetails(rawResponse) {
  if (!rawResponse) return null;
  try {
    if (typeof rawResponse === 'object' && !Array.isArray(rawResponse)) {
      return rawResponse;
    }
    let jsonStr = rawResponse;
    if (typeof rawResponse === 'string') {
      // Remove triple backticks if present
      const match = rawResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (match && match[1]) {
        jsonStr = match[1];
      }
      jsonStr = jsonStr.trim();
      // Remove bad control characters
      jsonStr = jsonStr.replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, ' ');
      // Fix unterminated URLs in 'source' fields (e.g., .../)") to .../")")
      jsonStr = jsonStr.replace(/("source":\s*"https?:[^"\s]+)\)/g, '$1"');
      // Remove trailing commas before } or ]
      jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
      // Remove leading/trailing quotes if present
      if ((jsonStr.startsWith('"') && jsonStr.endsWith('"')) ||
          (jsonStr.startsWith("'") && jsonStr.endsWith("'"))) {
        jsonStr = jsonStr.slice(1, -1);
      }
    }
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('Error parsing core company details:', err, rawResponse);
    return null;
  }
}

export default function CompanyDetailsPage({ route }) {
  const rawData = route.params?.rawData;
  // Parse here!
  const parsedCoreData = parseCoreCompanyDetails(rawData?.coreData?.raw || rawData?.coreData);

  return (
    <CoreCompanyDetailsProvider parsedData={parsedCoreData}>
      <CompanyDetailsContent route={route} />
    </CoreCompanyDetailsProvider>
  );
}

function CompanyDetailsContent({ route }) {
  const [activeSection, setActiveSection] = useState(SECTIONS.BASIC);
  const { company } = route.params;
  const { loading, error, companyData, fetchCompanyData } = useCoreCompanyDetails();
  console.log('[CompanyDetailsContent] loading:', loading, 'error:', error, 'companyData:', companyData);

  React.useEffect(() => {
    if (company && !companyData) {
      if (route.params?.rawData?.coreData?.raw) {
        fetchCompanyData(company, route.params.rawData.coreData.raw);
      } else {
        console.error('No core data available in navigation params');
      }
    }
  }, [company]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
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

      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
    </LinearGradient>
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
  centerContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});