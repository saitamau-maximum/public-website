import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Maximum',
    default: 'Maximum',
  },
  description: '埼玉大学プログラミングサークル「Maximum」の公式サイトです。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
