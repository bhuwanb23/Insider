import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterview } from '../context/InterviewContext';

const CandidateExperiences = () => {
  const { interviewData } = useInterview();
  const [expandedId, setExpandedId] = useState(null);

  if (!interviewData || !interviewData.candidateExperiences) {
    return <Text>No candidate experiences data available.</Text>;
  }

  const { candidateExperiences } = interviewData;

  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>🧑‍💻</Text>
        <Text style={styles.title}>Real Candidate Experiences</Text>
      </View>

      {candidateExperiences.map((experience, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleExpand(index)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#4158D0', '#C850C0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, expandedId === index && styles.expandedCard]}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.roleText}>{experience.role}</Text>
                <Text style={styles.sourceText}>via {experience.source} • {experience.date}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: experience.status === 'Selected' ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255, 71, 87, 0.2)' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: experience.status === 'Selected' ? '#2ed573' : '#ff4757' }
                ]}>{experience.status}</Text>
              </View>
            </View>

            {expandedId === index && (
              <View style={styles.expandedContent}>
                <Text style={styles.summaryText}>{experience.summary}</Text>
                <View style={styles.tagsContainer}>
                  {experience.tags.map((tag, tagIndex) => (
                    <View key={tagIndex} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.sentimentBadge}>
                  <Text style={styles.sentimentText}>{experience.sentiment}</Text>
                </View>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  expandedCard: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  sourceText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  sentimentBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  sentimentText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CandidateExperiences; 