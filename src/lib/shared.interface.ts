export interface NewsArticleSource {
  id: string | null;
  name: string;
}

export interface INewsArticle {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: NewsArticleSource;
  title: string;
  url: string;
  urlToImage: string;
}
export interface IGenericNewsResponse<T> {
  articles: T;
  status?: string;
  totalResults: number;
}
export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}
export interface INewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
