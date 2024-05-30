'use client';

import React, { useEffect, useState } from 'react';

import NewsList from '@/components/news-list';
import { NewsItem } from '@/dummy-news';

// import { DUMMY_NEWS } from '@/dummy-news';
// import Image from 'next/image';

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>(null);
  const [news, setNews] = useState<NewsItem[]>(null);
  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/news');

      if (!response.ok) {
        setError('Failed to fetch news');
        setIsLoading(false);
      }

      const news = await response.json();
      setNews(news);
      setIsLoading(false);
    }

    fetchNews();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>News Page</h1>
      {news && news.length > 0 && <NewsList news={news} />}
    </>
  );
}
