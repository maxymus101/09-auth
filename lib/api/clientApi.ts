import {
  DeletedNoteInfo,
  NewNoteContent,
  Note,
  PaginatedNotesResponse,
} from "../../types/note";
import { CheckSessionResp } from "../../types/session";
import { NewUser, UpdateUserProps, User, UserRes } from "../../types/user";
import { nextServer } from "./api";

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: string
): Promise<PaginatedNotesResponse> => {
  const response = await nextServer.get<PaginatedNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search !== "" && { search: search }),
      ...(tag ? { tag } : {}),
    },
  });

  return response.data;
};

export const createNote = async (content: NewNoteContent): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", content);
  return response.data;
};

export const deleteNote = async (id: number): Promise<DeletedNoteInfo> => {
  const response = await nextServer.delete<DeletedNoteInfo>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export async function register(newUser: NewUser): Promise<User> {
  const res = await nextServer.post<User>("/auth/register", newUser);
  return res.data;
}

export async function login(newUser: NewUser): Promise<UserRes> {
  const res = await nextServer.post<UserRes>("/auth/login", newUser);
  return res.data;
}

export async function checkSession(): Promise<CheckSessionResp> {
  const res = await nextServer.get<CheckSessionResp>("/auth/session");
  return res.data;
}

export async function fetchUser(): Promise<UserRes> {
  const res = await nextServer.get<UserRes>("/users/me");
  return res.data;
}

export async function logOut(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function updateUser(value: UpdateUserProps): Promise<UserRes> {
  const res = await nextServer.patch<UserRes>("/users/me", value);
  return res.data;
}
