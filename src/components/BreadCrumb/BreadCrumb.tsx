import React from 'react';
import { MdHome } from 'react-icons/md';
import styles from './BreadCrumb.module.scss';

interface BreadcrumbItem {
  items: {
    title: string;
    href: string;
  }[];
}

export const BreadCrumb: React.FC<BreadcrumbItem> = ({ items }) => {
  return (
    <div className={styles.container}>
      <MdHome />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <a href={item.href} className={styles.breadcrumbLink}>
              <p className={styles.breadcrumbLink}>{item.title}</p>
            </a>
          ) : (
            <p className={styles.breadcrumbLink}>{item.title}</p>
          )}
          {index < items.length - 1 && <p className={styles.separator}>&gt;</p>}
        </React.Fragment>
      ))}
    </div>
  );
};
