import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useInterview } from '../context/InterviewContext';

const RoleSpecificQuestions = () => {
  const { interviewData } = useInterview();

  if (!interviewData || !interviewData.roleSpecificQuestions) {
    return <Text>No role-specific questions data available.</Text>;
  }

  const { roleSpecificQuestions } = interviewData;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Role-Specific Questions</Text>
      {roleSpecificQuestions.map((role, index) => (
        <View key={index} style={styles.roleContainer}>
          <Text style={styles.roleTitle}>{role.role}</Text>
          {role.questions.map((question, qIndex) => (
            <View key={qIndex} style={styles.questionContainer}>
              <Text style={styles.question}>{question.question}</Text>
              <Text style={styles.frequency}>{question.frequency}</Text>
              <Text style={styles.difficulty}>{question.difficulty}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  roleContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  question: {
    fontSize: 16,
  },
  frequency: {
    fontSize: 16,
    color: '#666',
  },
  difficulty: {
    fontSize: 16,
    color: '#666',
  },
});

export default RoleSpecificQuestions; 