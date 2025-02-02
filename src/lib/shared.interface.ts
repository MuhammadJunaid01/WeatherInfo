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
