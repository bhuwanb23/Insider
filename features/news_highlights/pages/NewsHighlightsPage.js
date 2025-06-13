import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopHeadlines from '../components/TopHeadlines';
import SocialSentiment from '../components/SocialSentiment';
import HighlightSnippets from '../components/HighlightSnippets';
import StudentImpact from '../components/StudentImpact';
import { useNews } from '../context/NewsContext';
import { useIsFocused, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function NewsHighlightsPage({ route }) {
  const { newsData, loading, error, fetchCompanyData } = useNews();
  const [activeSectionKey, setActiveSectionKey] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    const { company } = route.params || {};
    if (isFocused && company) {
      fetchCompanyData(company);
    }
  }, [isFocused, route?.params?.company, fetchCompanyData]);

  useEffect(() => {
    if (newsData && Object.keys(newsData).length > 0) {
      const dynamicSections = {
        headlines: { title: 'Latest Headlines', icon: '📰', component: TopHeadlines },
        socialSentiment: { title: 'Social Sentiment', icon: '💬', component: SocialSentiment },
        highlights: { title: 'Key Highlights', icon: '🏆', component: HighlightSnippets },
        studentImpact: { title: 'Student Impact', icon: '🧠', component: StudentImpact },
      };

      const availableSectionKeys = Object.keys(dynamicSections).filter(key => newsData[key]);
      
      if (availableSectionKeys.length > 0) {
        setActiveSectionKey(availableSectionKeys[0]);
      } else {
        setActiveSectionKey(null);
      }
    }
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [newsData, fadeAnim]);

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#4158D0" /><Text style={styles.centeredText}>Loading news highlights...</Text></View>;
  }
  if (error || !newsData || Object.keys(newsData).length === 0) {
    return <View style={styles.centered}><Text style={styles.centeredText}>{error || 'No news highlights data available.'}</Text></View>;
  }
  
  if (!activeSectionKey || !newsData[activeSectionKey]) {
     return <View style={styles.centered}><Text style={styles.centeredText}>No news highlights sections found or selected.</Text></View>;
  }

  const dynamicSections = {
    headlines: { title: 'Latest Headlines', icon: '📰', component: TopHeadlines },
    socialSentiment: { title: 'Social Sentiment', icon: '💬', component: SocialSentiment },
    highlights: { title: 'Key Highlights', icon: '🏆', component: HighlightSnippets },
    studentImpact: { title: 'Student Impact', icon: '🧠', component: StudentImpact },
  };

  const availableSectionKeys = Object.keys(dynamicSections).filter(key => newsData[key]);
  const ActiveComponent = dynamicSections[activeSectionKey]?.component;

  const renderContent = () => {
    if (ActiveComponent) {
      return <ActiveComponent data={newsData[activeSectionKey]} />;
    }
    return null;
  };

  return (
    isFocused ? (
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
            {availableSectionKeys.map((key) => {
              const section = dynamicSections[key];
              const isActive = activeSectionKey === key;
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
                    setActiveSectionKey(key);
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

        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim }
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              {renderContent()}
            </View>
          </ScrollView>
        </Animated.View>
      </LinearGradient>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  centeredText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
}); 