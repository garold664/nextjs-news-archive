import ModalBackdrop from '@/components/modal-backdrop';
import { getNewsItem } from '@/lib/news';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function InterceptedImagePage({
  params,
}: {
  params: { newsSlug: string };
}) {
  const newsItemSlug = params.newsSlug;
  const newsItem = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
