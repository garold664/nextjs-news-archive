import { NewsItem } from '@/dummy-news';
import Link from 'next/link';
import React from 'react';

export default function NewsList({ news }: { news: NewsItem[] }) {
  return (
    <ul className="news-list">
      {news.map((newsItem) => (
        <li key={newsItem.id}>
          <Link href={`news/${newsItem.slug}`}>
            {newsItem.title}

            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
