export const interviewData = {
  journey: {
    steps: [
      {
        title: "Application Screening",
        duration: "3-5 days",
        description: "Resume review and initial shortlisting",
        icon: "📝",
        status: "First Step"
      },
      {
        title: "Online Assessment",
        duration: "45 minutes",
        description: "Technical MCQs and coding problems",
        icon: "💻",
        status: "Technical"
      },
      {
        title: "Technical Interview",
        duration: "1 hour",
        description: "DSA, System Design, and Core CS",
        icon: "👨‍💻",
        status: "Technical"
      },
      {
        title: "HR Interview",
        duration: "30 minutes",
        description: "Cultural fit and salary discussion",
        icon: "🤝",
        status: "Final"
      },
      {
        title: "Final Decision",
        duration: "1-2 days",
        description: "Offer letter and documentation",
        icon: "✅",
        status: "Result"
      }
    ]
  },
  candidateExperiences: [
    {
      role: "SDE Intern - 2024",
      source: "Glassdoor",
      date: "Dec 2023",
      status: "Selected",
      sentiment: "Positive",
      summary: "The interview process was well-structured. Started with an online coding round followed by two technical interviews. Questions focused on DSA and problem-solving. HR round was conversational and friendly.",
      tags: ["Well Organized", "Technical Focus", "Quick Process"]
    },
    {
      role: "Product Designer",
      source: "LinkedIn",
      date: "Nov 2023",
      status: "Selected",
      sentiment: "Challenging",
      summary: "Intensive design challenge followed by portfolio review. Had to present a complete design solution. Team was very encouraging and provided good feedback.",
      tags: ["Design Challenge", "Portfolio Focus", "Good Feedback"]
    },
    {
      role: "Full Stack Developer",
      source: "Reddit",
      date: "Oct 2023",
      status: "Rejected",
      sentiment: "Neutral",
      summary: "Complex system design round. Good learning experience overall. Need to improve on architectural patterns and scalability concepts.",
      tags: ["System Design", "Learning Experience", "Technical Depth"]
    }
  ],
  technicalQuestions: [
    {
      category: "DSA",
      difficulty: "Medium",
      frequency: "80%",
      question: "Implement a function to check if a binary tree is balanced",
      tags: ["Trees", "Recursion"]
    },
    {
      category: "System Design",
      difficulty: "Hard",
      frequency: "65%",
      question: "Design a distributed cache system",
      tags: ["Scalability", "Distributed Systems"]
    },
    {
      category: "SQL",
      difficulty: "Easy",
      frequency: "75%",
      question: "Write a query to find duplicate records in a table",
      tags: ["Database", "Queries"]
    }
  ],
  roleSpecificQuestions: [
    {
      role: "Product Manager",
      questions: [
        {
          question: "How would you prioritize features for a new product?",
          frequency: "70%",
          difficulty: "Medium"
        },
        {
          question: "Describe a product you recently launched",
          frequency: "60%",
          difficulty: "Easy"
        }
      ]
    },
    {
      role: "UI/UX Designer",
      questions: [
        {
          question: "Walk us through your design process",
          frequency: "85%",
          difficulty: "Medium"
        },
        {
          question: "How do you handle user feedback?",
          frequency: "55%",
          difficulty: "Easy"
        }
      ]
    },
    {
      role: "Software Engineer",
      questions: [
        {
          question: "How do you handle user feedback?",
          frequency: "55%",
          difficulty: "Easy"
        }
      ]
    }
  ],
  behavioralQuestions: [
    {
      question: "Tell me about a challenging project you worked on",
      frequency: "90%",
      category: "Leadership",
      tip: "Use the STAR method to structure your answer"
    },
    {
      question: "How do you handle conflicts in a team?",
      frequency: "75%",
      category: "Teamwork",
      tip: "Focus on resolution and learning"
    },
    {
      question: "Why do you want to join our company?",
      frequency: "95%",
      category: "Motivation",
      tip: "Research company values and culture"
    }
  ],
  questionStats: {
    topCategories: [
      {
        name: "Data Structures",
        percentage: 80,
        trend: "increasing"
      },
      {
        name: "System Design",
        percentage: 65,
        trend: "stable"
      },
      {
        name: "Problem Solving",
        percentage: 90,
        trend: "stable"
      }
    ],
    difficultyDistribution: {
      easy: 30,
      medium: 45,
      hard: 25
    }
  },
  mockInterviewTips: [
    {
      title: "Technical Preparation",
      tips: [
        "Practice coding on a whiteboard",
        "Review core CS concepts",
        "Solve problems within time constraints"
      ]
    },
    {
      title: "Communication",
      tips: [
        "Think aloud while solving problems",
        "Ask clarifying questions",
        "Structure your answers clearly"
      ]
    },
    {
      title: "Common Pitfalls",
      items: [
        "Not considering edge cases",
        "Jumping to code without planning",
        "Poor time management"
      ]
    }
  ]
}; 