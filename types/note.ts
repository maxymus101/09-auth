export interface Note {
  id: string;
  title: string; // Заголовок нотатки
  content: string; // Текст нотатки
  createdAt: string; // Дата створення
  updatedAt: string; // Дата останнього оновлення
  tag: NoteTag;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface NewNoteContent {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface PaginatedNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  totalResults: number;
  tag?: string;
}

export interface DeletedNoteInfo {
  deletedNoteId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}
