import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterview } from '../context/InterviewContext';

export default function RoleSpecificQuestions() {
  const { interviewData } = useInterview();
  const [selectedRole, setSelectedRole] = useState(interviewData.roleSpecificQuestions[0]?.role);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🎯</Text>
        <Text style={styles.title}>Role-Specific Questions</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.roleTabsContainer}
      >
        {interviewData.roleSpecificQuestions.map((roleData, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedRole(roleData.role)}
            style={styles.roleTab}
          >
            <LinearGradient
              colors={selectedRole === roleData.role ? ['#4158D0', '#C850C0'] : ['#f1f2f6', '#f1f2f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.roleTabGradient}
            >
              <Text 
                style={[
                  styles.roleTabText,
                  selectedRole === roleData.role && styles.selectedRoleTabText
                ]}
              >
                {roleData.role}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.questionsContainer} showsVerticalScrollIndicator={false}>
        {interviewData.roleSpecificQuestions
          .find(r => r.role === selectedRole)
          ?.questions.map((question, index) => (
            <LinearGradient
              key={index}
              colors={['#4158D0', '#C850C0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.questionCard}
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
            </LinearGradient>
          ))}
      </ScrollView>
    </View>
  );
}

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
  roleTabsContainer: {
    maxHeight: 44,
    marginBottom: 16,
  },
  roleTab: {
    marginHorizontal: 4,
    borderRadius: 22,
    overflow: 'hidden',
  },
  roleTabGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 22,
  },
  roleTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedRoleTabText: {
    color: '#fff',
  },
  questionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  questionCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
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
}); 