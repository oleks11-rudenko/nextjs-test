import axios from 'axios';
import type { NewNote, Note } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(page: number, search: string): Promise<NotesHttpResponse> {
  const response = await axios.get<NotesHttpResponse>('notes/', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
    },
  });
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await axios.get<Note>(`notes/${noteId}`);
  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>('notes/', newNote);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`notes/${noteId}`);
  return response.data;
}
