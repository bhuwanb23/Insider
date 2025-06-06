import React, { createContext, useContext, useState } from 'react';
import { cleanForJsonParse, parseJsonResponse, validators } from '../../../utils/jsonParser';

const TechStackContext = createContext();

export const techStackData = {
  frontend: {
    title: 'Frontend Technologies',
    icon: 'laptop-code',
    categories: [
      {
        title: 'Web Development',
        tags: ['React 18', 'Angular 15', 'Vue 3', 'Next.js 13'],
        description: 'Modern frontend frameworks for web applications',
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
  },
  backend: {
    title: 'Backend & APIs',
    icon: 'server',
    categories: [
      {
        title: 'Programming Languages',
        tags: ['Node.js 18', 'Python 3.10', 'Java 17', 'Go 1.20', 'Ruby 3.2'],
        description: 'Server-side programming languages'
      },
      {
        title: 'Frameworks',
        tags: ['Django 4.2', 'Spring Boot 3', 'Express.js 4', 'Laravel 10'],
        description: 'Backend frameworks by language'
      },
      {
        title: 'API Architecture',
        tags: ['REST APIs', 'GraphQL', 'gRPC'],
        description: 'API patterns and protocols',
        badges: ['Auth Service', 'Payment Gateway']
      }
    ]
  },
  cloud: {
    title: 'Cloud & DevOps',
    icon: 'cloud',
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
  },
  database: {
    title: 'Database & Storage',
    icon: 'database',
    categories: [
      {
        title: 'SQL Databases',
        tags: ['PostgreSQL 15', 'MySQL 8', 'MS SQL 2022'],
        description: 'Relational databases for transactions',
        badges: ['Primary Storage']
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
  },
  analytics: {
    title: 'Data & Analytics',
    icon: 'chart-bar',
    categories: [
      {
        title: 'Data Pipeline Tools',
        tags: ['Apache Kafka', 'Airflow'],
        description: 'Data streaming and workflow automation',
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
  },
  team: {
    title: 'Team Tools',
    icon: 'users',
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
};

export function TechStackProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const value = {
    techStack: techStackData,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <TechStackContext.Provider value={value}>
      {children}
    </TechStackContext.Provider>
  );
}

export function useTechStack() {
  const context = useContext(TechStackContext);
  if (!context) {
    throw new Error('useTechStack must be used within a TechStackProvider');
  }
  return context;
} 