import type { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend Development',
    skills: [
      { name: 'HTML/CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 75 },
      { name: 'React.js', level: 88 },
      { name: 'Next.js', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    category: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 45 },
      { name: 'Express.js', level: 40 },
      { name: 'REST API Design', level: 50 },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MongoDB', level: 40 },
      { name: 'MySQL (basic)', level: 30 },
    ],
  },
  {
    category: 'AI Tools',
    skills: [
      { name: 'GitHub Copilot', level: 75 },
      { name: 'ChatGPT / Claude', level: 80 },
      { name: 'v0.dev', level: 65 },
    ],
  },
  {
    category: 'Dev Tools',
    skills: [
      { name: 'Git & GitHub', level: 82 },
      { name: 'VS Code', level: 90 },
      { name: 'Figma (basic)', level: 60 },
      { name: 'Postman', level: 55 },
    ],
  },
];
