import React, { createContext, useContext, useState } from 'react';

// Function to parse tech stack data from API response
const parseTechStackResponse = (content) => {
  try {
    if (typeof content === 'object' && content !== null) {
      return content;
    }
    // Remove triple backticks if present
    const match = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    let jsonStr = match ? match[1] : content;
    jsonStr = jsonStr.trim();
    // Remove bad control characters (e.g., tabs)
    jsonStr = jsonStr.replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, ' ');
    if ((jsonStr.startsWith('"') && jsonStr.endsWith('"')) ||
        (jsonStr.startsWith("'") && jsonStr.endsWith("'"))) {
      jsonStr = jsonStr.slice(1, -1);
    }
    // Parse the JSON string
    let parsedData = JSON.parse(jsonStr);
    // If parsedData is a string (stringified JSON), parse again
    if (typeof parsedData === 'string') {
      parsedData = JSON.parse(parsedData);
    }
    console.log('Successfully parsed tech stack data');
    return parsedData;
  } catch (error) {
    console.error('Error parsing tech stack data:', error, content);
    return null;
  }
};

const TechStackContext = createContext();

export function TechStackProvider({ children, rawData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [techStack, setTechStack] = useState(null);

  // Parse and update tech stack data when rawData changes
  React.useEffect(() => {
    if (rawData?.techStackData?.raw) {
      const content = rawData.techStackData.raw;
      const parsedData = parseTechStackResponse(content);
      if (parsedData) {
        setTechStack(parsedData);
      } else {
        setTechStack(null);
      }
    } else {
      setTechStack(null);
    }
  }, [rawData]);

  const value = {
    techStack,
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