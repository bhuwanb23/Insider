import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import { CompanyProvider } from '../context/CompanyContext';
import { LinearGradient } from 'expo-linear-gradient';
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

  const renderContent = () => {
    switch (activeSection) {
      case SECTIONS.BASIC:
        return <BasicIdentity />;
      case SECTIONS.OVERVIEW:
        return <Overview />;
      case SECTIONS.LEGAL:
        return <LegalDetails />;
      case SECTIONS.LEADERSHIP:
        return <Leadership />;
      case SECTIONS.TIMELINE:
        return <Timeline />;
      case SECTIONS.AWARDS:
        return <Awards />;
      default:
        return <BasicIdentity />;
    }
  };

  return (
    <CompanyProvider>
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

        <View style={styles.content}>
          {renderContent()}
        </View>
      </LinearGradient>
    </CompanyProvider>
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
}); 