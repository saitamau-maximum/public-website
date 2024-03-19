import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';
import styles from './LinkButton.module.css';

interface ButtonProps extends Omit<LinkProps, 'href'> {
  href: string;
  variant: 'green' | 'gray';
  children: React.ReactNode;
}

export const LinkButton: React.FC<ButtonProps> = ({
  href,
  variant,
  children,
  ...props
}) => {
  const className = clsx(
    styles.button,
    variant === 'green' && styles.greenButton,
    variant === 'gray' && styles.grayButton,
  );

  return (
    <Link href={href} {...props} className = {className}>
      {children}
    </Link>
  );
};

export default LinkButton;
