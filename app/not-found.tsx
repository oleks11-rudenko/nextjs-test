import { Metadata } from 'next';
import { baseUrl } from '@/lib/api';
import css from './NotFound.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page not found',
  openGraph: {
    title: 'Page not found',
    description: 'This page not found',
    url: `${baseUrl}`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      </div>
    </main>
  );
}
