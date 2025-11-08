import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes, tags } from '@/lib/api';
import NotesPageClient from './NotesPage.Client';
import { Tag } from '@/types/note';

interface NotesPageProps {
  params: Promise<{ slug: Tag[] | 'All' }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug[0] === 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { currentPage: 1, searchQuery: '', tag }],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient />
    </HydrationBoundary>
  );
}
