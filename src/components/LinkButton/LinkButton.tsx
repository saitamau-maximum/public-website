import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import styles from './LinkButton.module.css';

interface ButtonProps {
  href: string;
  variant: 'green' | 'gray';
  children: React.ReactNode;
}

export const LinkButton: React.FC<ButtonProps> = ({ href, variant , children }) => {
  const className = clsx(
    styles.button,
    variant === 'green' && styles.greenButton,
    variant === 'gray' && styles.grayButton,
  );

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default LinkButton;
