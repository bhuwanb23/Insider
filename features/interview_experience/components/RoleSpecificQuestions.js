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
        contentContainerStyle={styles.roleTabsContent}
      >
        {interviewData.roleSpecificQuestions.map((roleData, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedRole(roleData.role)}
            style={styles.roleTab}
            activeOpacity={0.8}
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
  roleTabsContainer: {
    maxHeight: 44,
    marginBottom: 12,
  },
  roleTabsContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  roleTab: {
    marginHorizontal: 4,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  roleTabGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  roleTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedRoleTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  questionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  questionCard: {
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
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
    lineHeight: 19,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  difficultyText: {
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
}); 