import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';
import NewsList from '@/components/news-list';
import { NewsItem } from '@/lib/types';
import Link from 'next/link';
import { Suspense } from 'react';

async function FilterHeader({ year, month }: { year: string; month: string }) {
  const availableYears = await getAvailableNewsYears();
  if (
    (year && !availableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error('Invalid filter');
  }
  let links = availableYears;

  if (year && month) {
    links = [];
  }

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((yearOrMonth) => (
            <li key={yearOrMonth}>
              <Link
                href={`/archive/${year ? year : yearOrMonth}/${
                  year ? yearOrMonth : ''
                }`}
              >
                {yearOrMonth}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }: { year: string; month: string }) {
  let news: NewsItem[];
  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news are found for the selected year</p>;
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

export default async function FilteredNewsPage({
  params,
}: {
  params: { filter: string[] | undefined };
}) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
