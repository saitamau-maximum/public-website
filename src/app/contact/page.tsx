import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    '埼玉大学プログラミングサークル「Maximum」へのお問い合わせのページです。',
};

export default function Contact() {
  return (
    <div>
      <h1>Contact us</h1>
    </div>
  );
}
