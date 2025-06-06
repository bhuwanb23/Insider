import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterview } from '../context/InterviewContext';

const BehavioralQuestions = () => {
  const { interviewData } = useInterview();

  if (!interviewData || !interviewData.behavioralQuestions) {
    return <Text>No behavioral questions data available.</Text>;
  }

  const { behavioralQuestions } = interviewData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🧠</Text>
        <Text style={styles.title}>Behavioral & HR Questions</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {behavioralQuestions.map((question, index) => (
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
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    lineHeight: 22,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
  frequencyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  frequencyText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
  tipContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 6,
    marginTop: 6,
  },
  tipLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  tipText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 16,
  },
});

export default BehavioralQuestions; 