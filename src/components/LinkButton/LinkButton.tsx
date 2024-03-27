import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';
import styles from './LinkButton.module.css';

interface ButtonProps extends Omit<LinkProps, 'href'> {
  href: string;
  variant: 'green' | 'gray';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const LinkButton: React.FC<ButtonProps> = ({
  href,
  variant,
  size = 'medium',
  children,
  ...props
}) => {
  const className = clsx(
    styles.button,
    styles[size],
    variant === 'green' && styles.greenButton,
    variant === 'gray' && styles.grayButton,
  );

  return (
    <Link {...props} href={href} className={className}>
      {children}
    </Link>
  );
};

export default LinkButton;
