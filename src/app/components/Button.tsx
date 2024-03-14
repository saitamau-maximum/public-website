// Button.tsx
import Link from 'next/link';
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  href: string; 
  label: string;
  variant: 'green' | 'gray';
}

export const Button: React.FC<ButtonProps> = ({ href, label, variant }) => {
  const className = `${styles.button} ${variant === 'green' ? styles.greenButton : styles.grayButton}`;
  return (
    <Link href={href} passHref>
      <button className={className}>{label}</button>
    </Link>
  );
};

export default Button;
