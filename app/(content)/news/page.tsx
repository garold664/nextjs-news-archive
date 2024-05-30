import NewsList from '@/components/news-list';
import { NewsItem } from '@/dummy-news';

export default async function NewsPage() {
  const response = await fetch('http://localhost:8080/news');
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  const news: NewsItem[] = await response.json();

  return (
    <>
      <h1>News Page</h1>
      {<NewsList news={news} />}
    </>
  );
}
