import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News',
  description:
    '埼玉大学プログラミングサークル「Maximum」に関する様々なお知らせを配信しています。',
};

export default function News() {
  return (
    <div>
      <h1>News</h1>
    </div>
  );
}
