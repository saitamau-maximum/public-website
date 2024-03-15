import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  href: string;
  label: string;
  variant: 'green' | 'gray';
}

export const Button: React.FC<ButtonProps> = ({ href, label, variant }) => {
  const className = clsx(
    styles.button,
    variant === 'green' && styles.greenButton,
    variant === 'gray' && styles.grayButton,
  );

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
};

export default Button;
