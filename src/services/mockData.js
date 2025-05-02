/**
 * Mock data for development and testing
 * This file contains sample data that mimics API responses
 */

// Import project images directly
import aiAssistantImage from '../assets/images/projects/ai-personal-assistant.webp';
import webScraperImage from '../assets/images/projects/webScraper.jpg';
import hacktheburghImage from '../assets/images/projects/hacktheburgh.jpg';
import spiritOfProgressImage from '../assets/images/projects/SpiritOfProgressHackathon.jpeg';

// For new projects, we'll use existing images as placeholders
// You should replace these with actual screenshots of your projects
const orderBookImage = webScraperImage; // Placeholder
const optionsPricingImage = aiAssistantImage; // Placeholder  
const aiInvestmentImage = hacktheburghImage; // Placeholder

const mockData = {
  projects: [
    {
      id: 1,
      name: "AI Personal Assistant",
      description: "A voice-activated personal assistant built with Python and TensorFlow. This project uses natural language processing to understand and respond to user commands.",
      technologies: "Python, TensorFlow, NLP, Speech Recognition",
      github_url: "https://github.com/Ganto23/Godfrey_Antomarlin",
      image: aiAssistantImage,
      order: 5
    },
    {
      id: 2,
      name: "Web Scraper Tool",
      description: "An automated web scraper built with Node.js that extracts data from websites. Features include scheduling, data filtering, and export to multiple formats.",
      technologies: "JavaScript, Node.js, Express, MongoDB",
      github_url: "https://github.com/Ganto23/Godfrey_Antomarlin",
      image: webScraperImage,
      order: 4
    },
    {
      id: 3,
      name: "HackTheBurgh Project",
      description: "An innovative project that won the HackTheBurgh hackathon. This application helps users track and reduce their carbon footprint through daily activities.",
      technologies: "React, Firebase, Material UI, Charts.js",
      github_url: "https://github.com/Ganto23/Godfrey_Antomarlin",
      image: hacktheburghImage,
      order: 7
    },
    {
      id: 4,
      name: "Spirit of Progress Hackathon RU",
      description: "A collaborative project developed during a hackathon focused on sustainability. This platform connects eco-friendly initiatives with potential volunteers.",
      technologies: "React, Django, PostgreSQL, Docker",
      github_url: "https://github.com/Ganto23/Godfrey_Antomarlin",
      image: spiritOfProgressImage,
      order: 6
    },
    {
      id: 5,
      name: "Order Book Simulator",
      description: "An interactive simulator that visualizes order book dynamics in financial markets. Users can experiment with different order types and market conditions.",
      technologies: "Python, Streamlit, Pandas, Plotly",
      github_url: "https://github.com/Ganto23/order-book-simulator",
      live_url: "https://order-book-sim.streamlit.app/",
      image: orderBookImage,
      order: 1
    },
    {
      id: 6,
      name: "Options Pricing Simulator",
      description: "A tool for pricing financial options using various mathematical models. It provides visual representations of option pricing dynamics and risk factors.",
      technologies: "Python, Streamlit, NumPy, SciPy, Matplotlib",
      github_url: "https://github.com/Ganto23/options-pricing-simulator",
      live_url: "https://options-pricing-sim.streamlit.app/",
      image: optionsPricingImage,
      order: 2
    },
    {
      id: 7,
      name: "AI Investment Advisor",
      description: "An AI-powered tool that provides investment recommendations based on user preferences and market conditions. Features include risk assessment and portfolio optimization.",
      technologies: "Python, Streamlit, TensorFlow, Scikit-learn, Financial Data APIs",
      github_url: "https://github.com/Ganto23/ai-investment-advisor",
      live_url: "https://ai-investment-advisor.streamlit.app/",
      image: aiInvestmentImage,
      order: 3
    }
  ]
};

export default mockData;