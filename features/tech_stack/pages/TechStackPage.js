import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TechnologyCard from '../components/TechnologyCard';
import Badge from '../components/Badge';
import { TechStackProvider, useTechStack } from '../context/TechStackContext';

const { width } = Dimensions.get('window');

export default function TechStackPage({ route }) {
  console.log('[TechStackPage] route.params:', route.params);
  console.log('[TechStackPage] rawData received:', route.params?.rawData);
  console.log('[TechStackPage] techStackData:', route.params?.rawData?.techStackData);
  return (
    <TechStackProvider rawData={route.params?.rawData}>
      <TechStackPageContent />
    </TechStackProvider>
  );
}

function TechStackPageContent() {
  const { techStack } = useTechStack();
  // Always call hooks at the top
  const sections = techStack
    ? Object.entries(techStack).reduce((acc, [key, value]) => {
        acc[key.toUpperCase()] = {
          title: value.title,
          icon: value.icon,
          data: {
            categories: value.categories,
            badges: value.badges
          }
        };
        return acc;
      }, {})
    : {};
  const sectionKeys = Object.keys(sections);
  // Default to FRONTEND if present, else first section
  const defaultSectionKey = sectionKeys.includes('FRONTEND') ? 'FRONTEND' : sectionKeys[0];
  const [activeSectionKey, setActiveSectionKey] = React.useState(defaultSectionKey);
  React.useEffect(() => {
    // If techStack changes, reset to default section
    setActiveSectionKey(sectionKeys.includes('FRONTEND') ? 'FRONTEND' : sectionKeys[0]);
  }, [techStack]);
  const activeSection = sections[activeSectionKey];

  if (!techStack) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading tech stack...</Text>
      </View>
    );
  }

  const renderContent = (section) => {
    return (
      <View>
        {section.data.categories.map((category, index) => (
          <TechnologyCard
            key={index}
            title={category.title}
            tags={category.tags}
            description={category.description}
            badges={category.badges}
          />
        ))}
        {section.data.badges && (
          <View style={styles.sectionBadges}>
            {section.data.badges.map((badge, index) => (
              <Badge key={index} label={badge} variant="primary" />
            ))}
          </View>
        )}
      </View>
    );
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
          {sectionKeys.map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.tab,
                activeSectionKey === key && styles.activeTab,
              ]}
              onPress={() => setActiveSectionKey(key)}
            >
              <LinearGradient
                colors={activeSectionKey === key ? ['#4158D0', '#C850C0'] : ['transparent', 'transparent']}
                style={styles.tabGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.tabIcon}>{sections[key].icon}</Text>
                <Text
                  style={[
                    styles.tabText,
                    activeSectionKey === key && styles.activeTabText,
                  ]}
                >
                  {sections[key].title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {activeSection && renderContent(activeSection)}
        </View>
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
  sectionBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 8,
  },
});