import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterview } from '../context/InterviewContext';

const TechnicalQuestions = () => {
  const { interviewData } = useInterview();

  if (!interviewData || !interviewData.technicalQuestions) {
    return <Text>No technical questions data available.</Text>;
  }

  const { technicalQuestions } = interviewData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>👨‍💻</Text>
        <Text style={styles.title}>Technical Questions</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {technicalQuestions.map((question, index) => (
          <LinearGradient
            key={index}
            colors={['#4158D0', '#C850C0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.metaContainer}>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>{question.difficulty}</Text>
              </View>
              
              <View style={styles.frequencyBadge}>
                <Text style={styles.frequencyText}>Asked in {question.frequency} interviews</Text>
              </View>
            </View>

            <View style={styles.tagsContainer}>
              {question.tags.map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
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
  difficultyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  difficultyText: {
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
});

export default TechnicalQuestions; 