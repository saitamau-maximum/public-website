import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サークルについて',
  description: '埼玉大学プログラミングサークル「Maximum」についての活動内容のページです。',
};

export default function About() {
   return <h1>About Page</h1>;
   
}
