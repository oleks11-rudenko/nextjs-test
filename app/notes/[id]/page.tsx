import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { baseUrl, fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NotePageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description: `Content: ${note.content}`,
    openGraph: {
      title: `Note: ${note.title}`,
      description: `Content: ${note.content}`,
      url: `${baseUrl}filter/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Note: ${note.title}`,
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: NotePageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', { id }],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
