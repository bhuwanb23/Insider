import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import TechnologySection from '../components/TechnologySection';
import { useTechStack } from '../context/TechStackContext';

const { width } = Dimensions.get('window');

export default function TechStackPage() {
  const { techStack, loading, error } = useTechStack();
  const [activeSectionKey, setActiveSectionKey] = useState(null);

  // Set the first available section as active when techStack loads
  useEffect(() => {
    if (techStack && Object.keys(techStack).length > 0) {
      setActiveSectionKey(Object.keys(techStack)[0]);
    } else {
      setActiveSectionKey(null);
    }
  }, [techStack]);

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#4158D0" /><Text style={styles.centeredText}>Loading tech stack...</Text></View>;
  }
  if (error || !techStack || Object.keys(techStack).length === 0) {
    return <View style={styles.centered}><Text style={styles.centeredText}>{error || 'No tech stack data available.'}</Text></View>;
  }
  if (!activeSectionKey || !techStack[activeSectionKey]) {
    return <View style={styles.centered}><Text style={styles.centeredText}>No tech stack sections found or selected.</Text></View>;
  }

  const sectionKeys = Object.keys(techStack);
  const activeSection = techStack[activeSectionKey];

  const renderContent = (section) => {
    if (!section) return null;
    return (
      <TechnologySection data={section} />
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
          {sectionKeys.map((key) => {
            const section = techStack[key];
            const isActive = activeSectionKey === key;
            if (!section) return null;
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
                  colors={isActive ? ['#4158D0', '#C850C0'] : ['transparent', 'transparent']}
                  style={styles.tabGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.tabIcon}>{section.icon || ''}</Text>
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
          {renderContent(activeSection)}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
