import { DUMMY_NEWS } from '@/dummy-news';
import { notFound } from 'next/navigation';
import React from 'react';

export default function ImagePage({
  params,
}: {
  params: { newsSlug: string };
}) {
  const newsItemSlug = params.newsSlug;
  const newsItem = DUMMY_NEWS.find((item) => item.slug === newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
