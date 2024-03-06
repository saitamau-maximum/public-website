import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    '埼玉大学プログラミングサークル「Maximum」について、よくある質問をまとめたページです。',
};

export default function Faq() {
  return (
    <div>
      <h1>FAQ</h1>
    </div>
  );
}
