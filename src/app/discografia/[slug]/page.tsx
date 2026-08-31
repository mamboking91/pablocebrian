import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AlbumCover } from "@/components/album-cover";
import { getAlbumBySlug } from "@/lib/albums";

const linkLabels: Record<string, string> = {
  spotify_url: "Spotify",
  apple_music_url: "Apple Music",
  youtube_url: "YouTube",
};

export default async function AlbumPage({
  params,
}: PageProps<"/discografia/[slug]">) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) notFound();

  const links = (
    ["spotify_url", "apple_music_url", "youtube_url"] as const
  ).filter((key) => album[key]);

  return (
    <>
      <Nav />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 gap-10 items-start">
          <div className="max-w-sm mx-auto sm:mx-0 w-full">
            <AlbumCover album={album} priority />
          </div>
          <div>
            <h2 className="font-display text-3xl mb-2">
              {album.artist_names.join(", ")}
            </h2>
            <p className="text-muted mb-6">{album.title}</p>

            <dl className="space-y-2 text-sm mb-8">
              {album.role && (
                <div className="flex gap-2">
                  <dt className="text-muted w-28 shrink-0">Rol</dt>
                  <dd>{album.role}</dd>
                </div>
              )}
              {album.release_year && (
                <div className="flex gap-2">
                  <dt className="text-muted w-28 shrink-0">Año</dt>
                  <dd>{album.release_year}</dd>
                </div>
              )}
              {album.label && (
                <div className="flex gap-2">
                  <dt className="text-muted w-28 shrink-0">Sello</dt>
                  <dd>{album.label}</dd>
                </div>
              )}
            </dl>

            {links.length > 0 && (
              <ul className="flex flex-wrap gap-4">
                {links.map((key) => (
                  <li key={key}>
                    <a
                      href={album[key]!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs tracking-[0.2em] uppercase text-accent hover:text-accent-soft transition-colors border border-accent-soft/50 px-4 py-2"
                    >
                      {linkLabels[key]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
