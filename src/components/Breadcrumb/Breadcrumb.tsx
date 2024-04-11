import React from 'react';
import { MdHome } from 'react-icons/md';
import styles from './Breadcrumb.module.scss';
import Link from 'next/link';

interface BreadcrumbItem {
  items: {
    title: string;
    href: string;
  }[];
}

export const Breadcrumb: React.FC<BreadcrumbItem> = ({ items }) => {
  return (
    <nav className={styles.container}>
      <MdHome />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link href={item.href} className={styles.breadcrumbLink}>{item.title}</Link>
          ) : (
            <span className={styles.breadcrumbLink}>{item.title}</span>
          )}
          {index < items.length - 1 && <p className={styles.separator}>&gt;</p>}
        </React.Fragment>
      ))}
    </nav>
  );
};
