import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link className={pathname.startsWith(href) ? 'active' : ''} href={href}>
      {children}
    </Link>
  );
}
