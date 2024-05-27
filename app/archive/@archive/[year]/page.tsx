import { getNewsForYear } from '@/app/lib/news';
import Link from 'next/link';
import React from 'react';

export default function YearPage({ params }: { params: { year: string } }) {
  const newsList = getNewsForYear(params.year);
  return (
    <ul>
      {newsList.map((newsItem) => (
        <li key={newsItem.slug}>
          <Link href={`/news/${newsItem.slug}`}>{newsItem.title}</Link>
        </li>
      ))}
    </ul>
  );
}
