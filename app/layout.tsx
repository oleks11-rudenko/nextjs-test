import type { Metadata } from 'next';
import 'modern-normalize';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Roboto } from 'next/font/google';
import './globals.css';
import { baseUrl } from '@/lib/api';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Website for note management',
  openGraph: {
    title: 'NoteHub',
    description: 'Website for note management',
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

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanStackProvider>
        <body className={roboto.variable}>
          <Header />
          {children}
          {modal}
          <Footer />
        </body>
      </TanStackProvider>
    </html>
  );
}
