import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterview } from '../context/InterviewContext';

export default function BehavioralQuestions() {
  const { interviewData } = useInterview();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🧠</Text>
        <Text style={styles.title}>Behavioral & HR Questions</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {interviewData.behavioralQuestions.map((question, index) => (
          <LinearGradient
            key={index}
            colors={['#4158D0', '#C850C0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.metaContainer}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{question.category}</Text>
              </View>
              
              <View style={styles.frequencyBadge}>
                <Text style={styles.frequencyText}>Asked in {question.frequency} interviews</Text>
              </View>
            </View>

            <View style={styles.tipContainer}>
              <Text style={styles.tipLabel}>💡 Tip:</Text>
              <Text style={styles.tipText}>{question.tip}</Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  frequencyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  frequencyText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  tipContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  tipLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 3,
  },
  tipText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 17,
  },
}); 