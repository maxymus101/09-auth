"use client";

import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../app/loading";
import { fetchNoteById } from "../../lib/api/clientApi";

type NotePreviewProps = {
  id: string;
  onClose: () => void;
};

export default function NotePreview({ id, onClose }: NotePreviewProps) {
  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <Loader />}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note?.title}</h2>
              <button className={css.backBtn} onClick={onClose}>
                Go back
              </button>
            </div>
            <p className={css.content}>{note?.content}</p>
            <p className={css.date}>{note?.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
}
