import { DUMMY_NEWS } from '@/dummy-news';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export default function NewsDetailPage({
  params,
}: {
  params: { newsSlug: string };
}) {
  const newsItem = DUMMY_NEWS.find((item) => item.slug === params.newsSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${params.newsSlug}/image`}>
          <img
            src={`/images/news/${newsItem.image}`}
            alt={`${newsItem.title}`}
          />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}
