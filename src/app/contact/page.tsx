import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    '埼玉大学プログラミングサークル「Maximum」へのお問い合わせのページです。',
};

export default function Contact() {
  return (
    <div>
      <h1>お問い合わせ</h1>
      <p>
        お問い合わせは
        <a
          href='https://x.com/Maximum03400346'
          target='_blank'
          rel='noopener noreferrer'
        >
          X(旧Twitter)
        </a>
        からお願いします。
      </p>
    </div>
  );
}
