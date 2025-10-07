import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'jarvis',
    title: 'Jarvis',
    description: 'A modular voice-based AI assistant designed for real-time conversations and task automation.',
    techStack: ['Python', 'FastAPI', 'LangChain', 'Ollama'],
    type: 'Voice / AI Assistant',
    link: "https://github.com/Codeunia/Jarvis-FullStack-AI-Virtual-Assistant",
  },
  {
    id: 'alterego',
    title: 'AlterEgo',
    description: 'Your custom AI friend — capable of understanding tone, emotion, and context for lifelike interactions.',
    techStack: ['Python', 'LangChain', 'Sentiment API'],
    type: 'Emotional AI Chat',
    link: "https://github.com/AI-ash/AlterEgo",
  },
  {
    id: 'nomadai',
    title: 'NomadAi',
    description: 'An AI-powered travel companion that dynamically plans trips, explores insights, and builds adaptive itineraries.',
    techStack: ['Gemini API', 'Maps API', 'FastAPI'],
    type: 'Web / AI Automation',
    link: "https://github.com/AI-ash/NomadAI",
  },
  {
    id: 'homeaith',
    title: 'Home-AIth',
    description: 'A secure rental ecosystem that connects landlords and renters through AI transparency and smart contracts.',
    techStack: ['Firebase', 'JavaScript', 'Python'],
    type: 'Web / Real Estate / AI',
    link: "https://github.com/AI-ash/Home-AIth",
  },
];
