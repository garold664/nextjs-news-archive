import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';
import NewsList from '@/components/news-list';
import { NewsItem } from '@/lib/types';
import Link from 'next/link';
import React from 'react';

export default async function FilteredNewsPage({
  params,
}: {
  params: { filter: string[] | undefined };
}) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news: NewsItem[];

  let newsContent = <p>No news are found for the selected year</p>;

  let links = await getAvailableNewsYears();
  if (selectedYear && !selectedMonth) {
    links = getAvailableNewsMonths(selectedYear);
    news = await getNewsForYear(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  const availableNewsYears = await getAvailableNewsYears();

  if (
    (selectedYear && !availableNewsYears.includes(selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
  ) {
    throw new Error('Invalid filter');
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((yearOrMonth) => (
              <li key={yearOrMonth}>
                <Link
                  href={`/archive/${
                    selectedYear ? selectedYear : yearOrMonth
                  }/${selectedYear ? yearOrMonth : ''}`}
                >
                  {yearOrMonth}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
