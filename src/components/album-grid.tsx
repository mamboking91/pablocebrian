"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Album } from "@/lib/types";
import { AlbumCover } from "./album-cover";

export function AlbumGrid({ albums }: { albums: Album[] }) {
  const pathname = usePathname();
  const prefix = pathname?.startsWith("/versionblanco") ? "/versionblanco" : "";

  if (albums.length === 0) {
    return (
      <p className="text-center text-muted py-16">
        Todavía no hay discos publicados.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      {albums.map((album, index) => (
        <Link
          key={album.id}
          href={`${prefix}/discografia/${album.slug}`}
          className="group fade-in-up"
          style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
        >
          <AlbumCover album={album} priority={index < 8} />
        </Link>
      ))}
    </div>
  );
}
