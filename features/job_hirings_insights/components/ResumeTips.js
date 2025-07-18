import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useJobHiring } from '../context/JobHiringContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResumeTips() {
  const { jobHiringData } = useJobHiring();
  const { resumeTips } = jobHiringData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>📌</Text>
        <Text style={styles.title}>Resume Tips & Highlights</Text>
      </View>

      {/* Preferences Section */}
      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>What We Look For</Text>
        <View style={styles.preferencesList}>
          {resumeTips.preferences.map((pref, index) => (
            <View key={index} style={styles.preferenceItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.preferenceText}>{pref}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Tools Section */}
      <View style={styles.toolsSection}>
        <Text style={styles.subSectionTitle}>Screening Tools</Text>
        {resumeTips.tools.map((tool, index) => (
          <View key={index} style={styles.toolCard}>
            <View style={styles.toolHeader}>
              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={styles.toolPurpose}>{tool.purpose}</Text>
            </View>
            {tool.keywords && (
              <View style={styles.keywordsContainer}>
                {tool.keywords.map((keyword, idx) => (
                  <View key={idx} style={styles.keywordTag}>
                    <Text style={styles.keywordText}>{keyword}</Text>
                  </View>
                ))}
              </View>
            )}
            {tool.focusAreas && (
              <View style={styles.keywordsContainer}>
                {tool.focusAreas.map((area, idx) => (
                  <View key={idx} style={styles.keywordTag}>
                    <Text style={styles.keywordText}>{area}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Optimization Tips */}
      <View style={styles.optimizationSection}>
        <Text style={styles.subSectionTitle}>Quick Optimization Tips</Text>
        <View style={styles.tipsGrid}>
          {resumeTips.optimization.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <Text style={styles.tipNumber}>{index + 1}</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  preferencesList: {
    gap: 8,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
    lineHeight: 20,
  },
  preferenceText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  toolsSection: {
    marginBottom: 20,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  toolCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  toolHeader: {
    marginBottom: 8,
  },
  toolName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  toolPurpose: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordTag: {
    backgroundColor: '#4158D0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  keywordText: {
    fontSize: 12,
    color: '#fff',
    flexShrink: 1,
  },
  optimizationSection: {
    marginBottom: 8,
  },
  tipsGrid: {
    gap: 12,
  },
  tipCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4158D0',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
}); 