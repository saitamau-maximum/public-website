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
        <a href="https://x.com/Maximum03400346" target="_blank" rel="noopener noreferrer">
          X(旧Twitter)
        </a>
        または以下のフォームからお願いします。
      </p>
      <div className="form">
        <form action="https://formspree.io/f/moqyqkzg" method="POST">
          <div>
            <label htmlFor="name">お名前</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="message">メッセージ</label>
            <textarea id="message" name="message" required />
          </div>
          <button type="submit">送信</button>
        </form>
      </div>
    </div>
  );
}
