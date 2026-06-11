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

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}
