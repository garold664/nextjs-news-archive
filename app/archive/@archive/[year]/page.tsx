import { getNewsForYear } from '@/app/lib/news';
import NewsList from '@/components/news-list';
import Link from 'next/link';
import React from 'react';

export default function YearPage({ params }: { params: { year: string } }) {
  const newsList = getNewsForYear(params.year);
  return <NewsList news={newsList} />;
}
