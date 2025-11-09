import axios from 'axios';
import { NewNote, Note, Tag } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
export const baseUrl: string = 'http://localhost:3000/';

interface NoteshttpResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string,
  tag?: string
): Promise<NoteshttpResponse> {
  const response = await axios.get<NoteshttpResponse>('notes/', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      tag,
    },
  });
  return response.data;
}

export async function fetchNoteById(noteId: Note['id']): Promise<Note> {
  const response = await axios.get<Note>(`notes/${noteId}`);
  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>('notes/', newNote);
  return response.data;
}

export async function deleteNote(noteId: Note['id']): Promise<Note> {
  const response = await axios.delete<Note>(`notes/${noteId}`);
  return response.data;
}
