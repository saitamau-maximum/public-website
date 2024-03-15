import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps {
  href: string;
  label: string;
  variant: 'green' | 'gray';
}

export const Button: React.FC<ButtonProps> = ({ href, label, variant }) => {
  const className = clsx(styles.button, {
    [styles.greenButton]: variant === 'green',
    [styles.grayButton]: variant === 'gray',
  });

  return (
    <Link href={href}>
      <span className={className} role="button" tabIndex={0}>
        {label}
      </span>
    </Link>
  );
};

export default Button;
