/**
 * Mock data for development and testing
 * This file contains sample data that mimics API responses
 */

// Import project images directly
import aiAssistantImage from '../assets/images/projects/ai-personal-assistant.webp';
import webScraperImage from '../assets/images/projects/webScraper.jpg';
import hacktheburghImage from '../assets/images/projects/hacktheburgh.jpg';
import spiritOfProgressImage from '../assets/images/projects/SpiritOfProgressHackathon.jpeg';

const mockData = {
  projects: [
    {
      id: 1,
      name: "AI Personal Assistant",
      description: "A voice-activated personal assistant built with Python and TensorFlow. This project uses natural language processing to understand and respond to user commands.",
      technologies: "Python, TensorFlow, NLP, Speech Recognition",
      github_url: "https://github.com/Ganto23/ai-personal-assistant",
      image: aiAssistantImage,
      order: 1
    },
    {
      id: 2,
      name: "Web Scraper Tool",
      description: "An automated web scraper built with Node.js that extracts data from websites. Features include scheduling, data filtering, and export to multiple formats.",
      technologies: "JavaScript, Node.js, Express, MongoDB",
      github_url: "https://github.com/Ganto23/web-scraper",
      image: webScraperImage,
      order: 2
    },
    {
      id: 3,
      name: "HackTheBurgh Winner",
      description: "An innovative project that won the HackTheBurgh hackathon. This application helps users track and reduce their carbon footprint through daily activities.",
      technologies: "React, Firebase, Material UI, Charts.js",
      github_url: "https://github.com/Ganto23/carbon-tracker",
      image: hacktheburghImage,
      order: 3
    },
    {
      id: 4,
      name: "Spirit of Progress",
      description: "A collaborative project developed during a hackathon focused on sustainability. This platform connects eco-friendly initiatives with potential volunteers.",
      technologies: "React, Django, PostgreSQL, Docker",
      github_url: "https://github.com/Ganto23/spirit-of-progress",
      image: spiritOfProgressImage,
      order: 4
    }
  ]
};

export default mockData;