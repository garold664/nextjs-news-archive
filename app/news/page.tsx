import Link from 'next/link';
import React from 'react';

import { DUMMY_NEWS } from '@/dummy-news';
// import Image from 'next/image';

export default function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      <ul className="news-list">
        {DUMMY_NEWS.map((newsItem) => (
          <li key={newsItem.id}>
            <Link href={`news/${newsItem.slug}`}>
              {newsItem.title}

              <img
                src={`/images/news/${newsItem.image}`}
                alt={newsItem.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
