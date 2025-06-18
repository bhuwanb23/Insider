import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewsProvider } from '../context/NewsContext';
import TopHeadlines from '../components/TopHeadlines';
import SocialSentiment from '../components/SocialSentiment';
import HighlightSnippets from '../components/HighlightSnippets';
import StudentImpact from '../components/StudentImpact';
import { useNews } from '../context/NewsContext';

const SECTIONS = {
  HEADLINES: { title: 'Top Headlines', icon: '📰' },
  SENTIMENT: { title: 'Social Sentiment', icon: '💬' },
  SNIPPETS: { title: 'Key Highlights', icon: '✨' },
  IMPACT: { title: 'Student Impact', icon: '🎓' },
};

export default function NewsHighlightsPage({ route }) {
  console.log('[NewsHighlightsPage] route.params:', route.params);
  console.log('[NewsHighlightsPage] rawData received:', route.params?.rawData);
  console.log('[NewsHighlightsPage] newsData:', route.params?.rawData?.newsData);
  return (
    <NewsProvider rawData={route.params?.rawData}>
      <NewsHighlightsContent />
    </NewsProvider>
  );
}

function NewsHighlightsContent() {
  const [activeSection, setActiveSection] = useState('HEADLINES');
  const { newsData, loading, error } = useNews();
  console.log('[NewsHighlightsContent] loading:', loading, 'error:', error, 'newsData:', newsData);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContentContainer}
      >
        {Object.entries(SECTIONS).map(([key, { title, icon }]) => (
          <TouchableOpacity
            key={key}
            onPress={() => setActiveSection(key)}
            style={[styles.tab, activeSection === key && styles.activeTab]}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={activeSection === key ? ['#4158D0', '#C850C0'] : ['#ffffff', '#ffffff']}
              style={styles.tabGradient}
            >
              <Text style={[styles.tabText, activeSection === key && styles.activeTabText]}>
                {icon} {title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SafeAreaView style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {activeSection === 'HEADLINES' && <TopHeadlines />}
          {activeSection === 'SENTIMENT' && <SocialSentiment />}
          {activeSection === 'SNIPPETS' && <HighlightSnippets />}
          {activeSection === 'IMPACT' && <StudentImpact />}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '100',
    backgroundColor: '#f5f5f5',
  },
  tabsContainer: {
    maxHeight: 44,
    marginBottom: 12,
  },
  tabsContentContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tab: {
    marginHorizontal: 3,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  activeTab: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 0,
  },
});