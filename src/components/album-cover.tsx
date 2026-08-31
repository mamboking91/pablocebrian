import Image from "next/image";
import { Album } from "@/lib/types";

export function AlbumCover({
  album,
  priority = false,
}: {
  album: Album;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-background-elevated border border-border">
      {album.cover_url ? (
        <Image
          src={album.cover_url}
          alt={`${album.artist_names.join(", ")} — ${album.title}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="font-display text-center text-sm sm:text-base text-muted leading-snug">
            {album.title}
          </span>
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/85 px-4 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <p className="font-display text-base sm:text-lg text-white leading-snug">
          {album.artist_names.join(", ")}
        </p>
        <p className="text-sm text-white/80">{album.title}</p>
        {album.role && (
          <p className="text-[10px] tracking-[0.14em] uppercase text-accent leading-relaxed">
            {album.role}
          </p>
        )}
      </div>
    </div>
  );
}
