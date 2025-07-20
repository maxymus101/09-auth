import { Metadata } from "next";
import { fetchNoteByIdServer } from "../../../../lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

interface NoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteByIdServer(id);
  return {
    title: `Note: ${note.title}`,
    description: `${
      note.content.length > 30
        ? `${note.content.slice(0, 30)} ...`
        : `${note.content}`
    }`,
    openGraph: {
      title: `Note: ${note.title}`,
      description: `${
        note.content.length > 30
          ? `${note.content.slice(0, 30)} ...`
          : `${note.content}`
      }`,
      url: `https://08-zustand-fawn-six.vercel.app/notes/filter/${note.id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub`,
        },
      ],
    },
  };
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
