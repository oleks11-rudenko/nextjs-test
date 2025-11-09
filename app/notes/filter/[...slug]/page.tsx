import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { baseUrl, fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  return {
    title: `Notes: ${tag}`,
    description: 'Website for note management filtered by tag',
    openGraph: {
      title: `Notes: ${tag}`,
      description: 'Website for note management filtered by tag',
      url: `${baseUrl}filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes: ${tag}`,
        },
      ],
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { currentPage: 1, searchQuery: '', tag }],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
