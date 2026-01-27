
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'User' | 'Admin' | 'Moderator';
  joinedDate: string;
  postsCount: number;
}

export interface EditHistory {
  content: string;
  editedAt: string;
}

export interface Post {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  createdAt: string;
  editHistory: EditHistory[];
}

export interface Thread {
  id: string;
  sectionId: string;
  title: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  repliesCount: number;
  viewsCount: number;
  lastPost?: {
    authorName: string;
    date: string;
  };
}

export interface ForumCategory {
  id: string;
  title: string;
  icon: string;
  sections: ForumSection[];
}

export interface ForumSection {
  id: string;
  title: string;
  description: string;
  topicsCount: number;
  postsCount: number;
  lastPost?: {
    title: string;
    author: string;
    date: string;
  };
}
