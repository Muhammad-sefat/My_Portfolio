export interface Project {
  _id?: string;
  id?: string | number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
}
