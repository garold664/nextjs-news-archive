import { getAllNews, getNewsItem } from '@/lib/news';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function NewsDetailPage({
  params,
}: {
  params: { newsSlug: string };
}) {
  const newsItem = await getNewsItem(params.newsSlug);

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
