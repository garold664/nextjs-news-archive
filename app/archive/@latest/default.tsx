import { getLatestNews } from '@/app/lib/news';
import NewsList from '@/components/news-list';

export default function LatestPage() {
  const latestNews = getLatestNews();
  return (
    <>
      <h2>LatestPage</h2>
      <NewsList news={latestNews} />
    </>
  );
}
