import React from 'react';

export default function NewsDetailPage({
  params,
}: {
  params: { newsid: string };
}) {
  return <div>{params.newsid}</div>;
}
