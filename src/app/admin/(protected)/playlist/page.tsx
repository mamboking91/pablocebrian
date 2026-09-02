import { PlaylistForm } from "@/components/admin/playlist-form";
import { getSiteContent } from "@/lib/site-content";
import { parsePlaylistContent } from "@/lib/playlist-content";
import { savePlaylistContent } from "./actions";

export const metadata = {
  title: "Admin · Playlist",
};

export const dynamic = "force-dynamic";

export default async function AdminPlaylistPage() {
  const raw = await getSiteContent("playlist");
  const content = parsePlaylistContent(raw);

  return (
    <div>
      <h1 className="font-display text-2xl mb-2">Playlist</h1>
      <p className="text-sm text-muted mb-6">
        Elige si el enlace &ldquo;Playlist&rdquo; del menú muestra tu
        playlist de Spotify o de Apple Music. Si dejas el enlace vacío, la
        opción desaparece del menú.
      </p>
      <PlaylistForm initialContent={content} action={savePlaylistContent} />
    </div>
  );
}
