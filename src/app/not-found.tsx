import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'Maximum Website',
};

export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
