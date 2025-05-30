import React, { createContext, useContext } from 'react';

const WaysToGetInContext = createContext();

export const useWaysToGetIn = () => {
  const context = useContext(WaysToGetInContext);
  if (!context) {
    throw new Error('useWaysToGetIn must be used within a WaysToGetInProvider');
  }
  return context;
};

export const WaysToGetInProvider = ({ children }) => {
  const waysData = {
    campusRecruitment: {
      title: "Campus Recruitment",
      description: "Through university tie-ups and placement cells",
      icon: "🎓",
      badge: "Usually Final-Year",
      details: [
        "Pre-placement talks and workshops",
        "On-campus interviews",
        "Multiple rounds: aptitude, technical, HR",
        "Batch placements",
      ],
      tips: [
        "Maintain good academic record",
        "Participate in campus activities",
        "Build projects and portfolio",
        "Practice for aptitude tests",
      ],
    },
    jobPortals: {
      title: "Job Portals",
      description: "Posted via LinkedIn, Naukri, Indeed, or company career page",
      icon: "🔍",
      platforms: [
        { name: "LinkedIn", url: "https://linkedin.com/jobs" },
        { name: "AngelList", url: "https://angel.co" },
        { name: "Glassdoor", url: "https://glassdoor.com" },
      ],
      tips: [
        "Keep profile updated",
        "Set job alerts",
        "Follow company pages",
        "Network actively",
      ],
    },
    referrals: {
      title: "Referrals",
      description: "Get recommended by an existing employee",
      icon: "👥",
      howToAsk: [
        "Research the company and role thoroughly",
        "Prepare your pitch and resume",
        "Connect professionally",
        "Follow up appropriately",
      ],
      tips: [
        "Build genuine connections",
        "Attend networking events",
        "Join professional communities",
        "Maintain relationships",
      ],
    },
    hackathons: {
      title: "Hackathons & Competitions",
      description: "Participate in hiring contests hosted on platforms like HackerRank, Unstop, Devfolio",
      icon: "🧩",
      platforms: [
        { name: "HackerRank", url: "https://hackerrank.com" },
        { name: "Unstop", url: "https://unstop.com" },
        { name: "Devfolio", url: "https://devfolio.co" },
      ],
      activeContests: [], // To be populated dynamically
    },
    coldOutreach: {
      title: "Cold Outreach",
      description: "Emailing relevant hiring managers with a strong pitch",
      icon: "✉️",
      emailTemplate: {
        subject: "Interested in [Role] opportunities at [Company]",
        body: `Dear [Name],

I hope this email finds you well. I came across the [Role] position at [Company] and I'm very interested in joining your team.

[2-3 sentences about relevant experience and why you're a good fit]

I've attached my resume for your review. I would greatly appreciate the opportunity to discuss how I can contribute to [Company].

Best regards,
[Your Name]`,
      },
      tips: [
        "Research thoroughly",
        "Personalize each message",
        "Be concise and professional",
        "Follow up after a week",
      ],
    },
    internshipConversion: {
      title: "Internship → Full-Time",
      description: "Many interns are converted to full-time roles",
      icon: "🚀",
      badge: "High Conversion Rate",
      tips: [
        "Deliver high-quality work",
        "Show initiative",
        "Build relationships",
        "Express interest in full-time role",
      ],
      conversionStats: {
        rate: "75%",
        factors: [
          "Performance during internship",
          "Team fit",
          "Business requirements",
          "Budget availability",
        ],
      },
    },
    contractRoles: {
      title: "Freelancing / Contract Roles",
      description: "Short-term opportunities via Upwork, Toptal or directly",
      icon: "💼",
      badge: "Flexible Work",
      platforms: [
        { name: "Upwork", url: "https://upwork.com" },
        { name: "Toptal", url: "https://toptal.com" },
        { name: "Fiverr", url: "https://fiverr.com" },
      ],
      tips: [
        "Build strong portfolio",
        "Start with small projects",
        "Maintain high ratings",
        "Communicate professionally",
      ],
    },
  };

  return (
    <WaysToGetInContext.Provider value={waysData}>
      {children}
    </WaysToGetInContext.Provider>
  );
}; 