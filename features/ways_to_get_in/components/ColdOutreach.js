import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWaysToGetIn } from '../context/WaysToGetInContext';

export default function ColdOutreach() {
  const { waysData } = useWaysToGetIn();
  const coldOutreach = waysData?.coldOutreach;

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleShareTemplate = async () => {
    if (!coldOutreach?.emailTemplate) return;

    try {
      await Share.share({
        title: coldOutreach.emailTemplate.subject,
        message: coldOutreach.emailTemplate.body,
      });
    } catch (error) {
      console.error('Error sharing template:', error);
    }
  };

  if (!coldOutreach) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.sectionIcon}>{coldOutreach.icon || '✉️'}</Text>
        <Text style={styles.title}>{coldOutreach.title || 'Cold Outreach'}</Text>
      </View>

      <LinearGradient
        colors={['#4158D0', '#C850C0']}
        style={styles.mainCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.description}>{coldOutreach.description}</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email Template</Text>
        <View style={styles.templateCard}>
          <View style={styles.templateHeader}>
            <Text style={styles.templateSubject} numberOfLines={2} ellipsizeMode="tail">
              Subject: {coldOutreach.emailTemplate?.subject}
            </Text>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShareTemplate}
              activeOpacity={0.7}
            >
              <Text style={styles.shareIcon}>📋</Text>
              <Text style={styles.shareText}>Copy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.templateBody}>
            <Text style={styles.templateText} selectable={true}>
              {coldOutreach.emailTemplate?.body}
            </Text>
          </View>
          <View style={styles.templateNote}>
            <Text style={styles.noteIcon}>💡</Text>
            <Text style={styles.noteText} numberOfLines={2} ellipsizeMode="tail">
              Remember to customize the placeholders marked with [brackets]
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Practices</Text>
        <View style={styles.tipsList}>
          {coldOutreach.tips?.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <LinearGradient
                colors={['rgba(65, 88, 208, 0.1)', 'rgba(200, 80, 192, 0.1)']}
                style={styles.tipGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.tipIcon}>✨</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.warningCard}>
        <Text style={styles.warningIcon}>⚠️</Text>
        <Text style={styles.warningText}>
          Always maintain professionalism and respect the recipient's time. Follow up only once if you don't receive a response.
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  mainCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  description: {
    fontSize: 13,
    color: '#fff',
    lineHeight: 18,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  templateCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  templateSubject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    flexWrap: 'wrap',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(65, 88, 208, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  shareIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  shareText: {
    fontSize: 12,
    color: '#4158D0',
    fontWeight: '600',
  },
  templateBody: {
    padding: 16,
    backgroundColor: 'rgba(65, 88, 208, 0.05)',
  },
  templateText: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
    flexWrap: 'wrap',
    width: '100%',
  },
  templateNote: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  noteIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  noteText: {
    fontSize: 12,
    color: '#1a1a1a',
    flex: 1,
    flexWrap: 'wrap',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  tipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  tipIcon: {
    fontSize: 14,
    color: '#4CAF50',
    marginRight: 8,
    lineHeight: 18,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  warningIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
  },
}); 