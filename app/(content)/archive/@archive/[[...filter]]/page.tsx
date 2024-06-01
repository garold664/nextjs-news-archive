import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';
import NewsList from '@/components/news-list';
import { NewsItem } from '@/lib/types';
import Link from 'next/link';

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

  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  if (selectedYear && selectedMonth) {
    links = [];
  }

  if (selectedYear && !selectedMonth) {
    links = getAvailableNewsMonths(selectedYear);
  }

  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
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
      <FilteredNews year={selectedYear} month={selectedMonth} />
    </>
  );
}
