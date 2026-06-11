export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
}

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  type: string;
  description: string;
  technologies: string[];
  current: boolean;
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}
