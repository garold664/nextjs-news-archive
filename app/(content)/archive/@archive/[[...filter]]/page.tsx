import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';
import NewsList from '@/components/news-list';
import { NewsItem } from '@/dummy-news';
import Link from 'next/link';
import React from 'react';

export default function YearPage({
  params,
}: {
  params: { filter: string[] | undefined };
}) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];
  // console.log(selectedMonth);

  let news: NewsItem[];

  let newsContent = <p>No news are found for the selected year</p>;

  let links = getAvailableNewsYears();
  if (selectedYear && !selectedMonth) {
    links = getAvailableNewsMonths(selectedYear);
    news = getNewsForYear(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    // links = getAvailableNewsMonths(selectedYear);
    links = [];
    // console.log(news);
  }

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
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
