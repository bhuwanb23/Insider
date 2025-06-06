import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterview } from '../context/InterviewContext';

const MockInterviewTips = () => {
  const { interviewData } = useInterview();

  if (!interviewData || !interviewData.mockInterviewTips) {
    return <Text>No mock interview tips data available.</Text>;
  }

  const { mockInterviewTips } = interviewData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🧾</Text>
        <Text style={styles.title}>Mock Interview Tips</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {mockInterviewTips.map((tip, index) => (
          <LinearGradient
            key={index}
            colors={['#4158D0', '#C850C0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.sectionTitle}>{tip.title}</Text>
            
            {tip.tips ? (
              <View style={styles.tipsContainer}>
                {tip.tips.map((tip, tipIndex) => (
                  <View key={tipIndex} style={styles.tipItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.tipsContainer}>
                {tip.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.tipItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.tipText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
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
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  tipsContainer: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
    lineHeight: 20,
  },
  tipText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MockInterviewTips; 