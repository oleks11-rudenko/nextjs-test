'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import css from './NotesPage.module.css';
import { useParams } from 'next/navigation';

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { slug } = useParams<{ slug: string[] }>();
  const tag = slug[0] === 'all' ? undefined : slug[0];

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', { page: currentPage, search: searchQuery, tag }],
    queryFn: () => fetchNotes(currentPage, searchQuery, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages || 0;

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox initialValue={searchQuery} onSearchChange={handleSearchChange} />
        {totalPages > 1 && isSuccess && (
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data?.notes && <NoteList notes={data.notes} />}
    </div>
  );
}
