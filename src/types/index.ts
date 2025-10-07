export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  type: string;
  link?: string;
}

export interface ArticleInput {
  topic: string;
  creatorName: string;
  previousBlogUrl?: string;
  previousBlogContent?: string;
}

export interface GeneratedArticle {
  id: string;
  topic: string;
  content: string;
  creatorName: string;
  createdAt: string;
  suggestedTopics?: string[];
}
