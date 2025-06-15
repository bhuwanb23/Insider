import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TechnologyCard from '../components/TechnologyCard';
import Badge from '../components/Badge';
import { TechStackProvider, useTechStack } from '../context/TechStackContext';

const { width } = Dimensions.get('window');

const SECTIONS = {
  FRONTEND: {
    title: 'Frontend Technologies',
    icon: '💻',
    data: {
      categories: [
        {
          title: 'Web Development',
          tags: ['React 18', 'Angular 15', 'Vue 3', 'Next.js 13'],
          description: 'Modern frontend frameworks',
          badges: ['Web']
        },
        {
          title: 'UI Libraries',
          tags: ['Tailwind CSS 3', 'Bootstrap 5', 'Material UI 5'],
          description: 'Styling and component libraries',
          badges: ['Design System']
        },
        {
          title: 'Mobile Development',
          tags: ['React Native 0.71', 'Flutter 3', 'Swift 5', 'Kotlin 1.8'],
          description: 'Cross-platform and native mobile development',
          badges: ['Mobile']
        }
      ],
      badges: ['Web', 'Mobile', 'Internal Dashboard']
    }
  },
  BACKEND: {
    title: 'Backend & APIs',
    icon: '⚙️',
    data: {
      categories: [
        {
          title: 'Programming Languages',
          tags: ['Node.js 18', 'Python 3.10', 'Java 17', 'Go 1.20', 'Ruby 3.2'],
          description: 'Server-side programming languages',
          badges: ['Core Backend']
        },
        {
          title: 'Frameworks',
          tags: ['Django 4.2', 'Spring Boot 3', 'Express.js 4', 'Laravel 10'],
          description: 'Backend frameworks by language',
          badges: ['API Services']
        },
        {
          title: 'API Architecture',
          tags: ['REST APIs', 'GraphQL', 'gRPC'],
          description: 'API patterns and protocols',
          badges: ['Auth Service', 'Payment Gateway']
        }
      ]
    }
  },
  CLOUD: {
    title: 'Cloud & DevOps',
    icon: '☁️',
    data: {
      categories: [
        {
          title: 'Cloud Infrastructure',
          tags: ['AWS', 'Azure', 'GCP', 'DigitalOcean'],
          description: 'Cloud service providers',
          badges: ['Infra Tools']
        },
        {
          title: 'DevOps Tools',
          tags: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions'],
          description: 'Container orchestration and IaC',
          badges: ['CI/CD']
        },
        {
          title: 'Monitoring Stack',
          tags: ['Datadog', 'Prometheus', 'Grafana'],
          description: 'System monitoring and alerting',
          badges: ['Monitoring']
        }
      ]
    }
  },
  DATABASE: {
    title: 'Database & Storage',
    icon: '💾',
    data: {
      categories: [
        {
          title: 'SQL Databases',
          tags: ['PostgreSQL 15', 'MySQL 8', 'MS SQL 2022'],
          description: 'Primary transactional databases',
          badges: ['Transactions']
        },
        {
          title: 'NoSQL Solutions',
          tags: ['MongoDB 6', 'Redis 7', 'Cassandra 4'],
          description: 'For caching and flexible data',
          badges: ['Caching', 'Document Store']
        },
        {
          title: 'Storage Solutions',
          tags: ['AWS S3', 'Firebase Storage'],
          description: 'Object storage for files and media',
          badges: ['File Storage']
        }
      ]
    }
  },
  ANALYTICS: {
    title: 'Data & Analytics',
    icon: '📊',
    data: {
      categories: [
        {
          title: 'Data Pipelines',
          tags: ['Apache Kafka', 'Airflow'],
          description: 'Data streaming and ETL',
          badges: ['ETL']
        },
        {
          title: 'Business Intelligence',
          tags: ['Tableau', 'Looker', 'Power BI'],
          description: 'Data visualization and reporting',
          badges: ['Client Reporting']
        },
        {
          title: 'Machine Learning',
          tags: ['TensorFlow 2', 'PyTorch 2'],
          description: 'ML frameworks and libraries',
          badges: ['Data Science']
        }
      ],
      badges: ['Internal Insights', 'Client Reporting', 'Data Science']
    }
  },
  TEAM: {
    title: 'Team Tools',
    icon: '👥',
    data: {
      categories: [
        {
          title: 'Communication',
          tags: ['Slack', 'Zoom', 'Microsoft Teams'],
          description: 'Team communication platforms',
          badges: ['Collaboration']
        },
        {
          title: 'Design Tools',
          tags: ['Figma', 'Adobe XD'],
          description: 'UI/UX design and prototyping',
          badges: ['Design']
        },
        {
          title: 'Project Management',
          tags: ['Jira', 'Trello', 'Notion'],
          description: 'Task tracking and documentation',
          badges: ['Planning']
        },
        {
          title: 'Version Control',
          tags: ['GitHub', 'GitLab', 'Bitbucket'],
          description: 'Code repositories and collaboration',
          badges: ['Code Management']
        }
      ]
    }
  }
};

export default function TechStackPage({ route }) {
  console.log('[TechStackPage] route.params:', route.params);
  console.log('[TechStackPage] rawData received:', route.params?.rawData);
  console.log('[TechStackPage] techStackData:', route.params?.rawData?.techStackData);
  return (
    <TechStackProvider rawData={route.params?.rawData}>
      <TechStackPageContent />
    </TechStackProvider>
  );
}

function TechStackPageContent() {
  const { techStack } = useTechStack();
  console.log('[TechStackPageContent] techStack:', techStack);
  const sections = Object.entries(techStack).reduce((acc, [key, value]) => {
    acc[key.toUpperCase()] = {
      title: value.title,
      icon: value.icon,
      data: {
        categories: value.categories,
        badges: value.badges
      }
    };
    return acc;
  }, {});
  
  const [activeSection, setActiveSection] = useState(sections.FRONTEND);

  const renderContent = (section) => {
    return (
      <View>
        {section.data.categories.map((category, index) => (
          <TechnologyCard
            key={index}
            title={category.title}
            tags={category.tags}
            description={category.description}
            badges={category.badges}
          />
        ))}
        {section.data.badges && (
          <View style={styles.sectionBadges}>
            {section.data.badges.map((badge, index) => (
              <Badge key={index} label={badge} variant="primary" />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#f8f9fa']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.tabsWrapper}>
        <ScrollView 
          horizontal 
          style={styles.tabsContainer}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {Object.entries(SECTIONS).map(([key, section]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.tab,
                activeSection === SECTIONS[key] && styles.activeTab,
              ]}
              onPress={() => setActiveSection(SECTIONS[key])}
            >
              <LinearGradient
                colors={activeSection === SECTIONS[key] ? ['#4158D0', '#C850C0'] : ['transparent', 'transparent']}
                style={styles.tabGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.tabIcon}>{section.icon}</Text>
                <Text
                  style={[
                    styles.tabText,
                    activeSection === SECTIONS[key] && styles.activeTabText,
                  ]}
                >
                  {section.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {renderContent(activeSection)}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsWrapper: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 8,
  },
  tabsContainer: {
    maxHeight: 44,
  },
  tabsContent: {
    paddingHorizontal: 12,
  },
  tab: {
    marginHorizontal: 4,
    borderRadius: 22,
    overflow: 'hidden',
  },
  tabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: width * 0.22,
  },
  activeTab: {
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 8,
  },
});