import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サークルについて',
  description: 'Maximum Website',
};

export default function About() {
  return <h1>About Page</h1>;
}
