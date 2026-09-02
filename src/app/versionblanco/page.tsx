"use client";

import Link from "next/link";
import { PlaylistNavLink } from "@/components/playlist-nav-link";
import { PlaylistPanel } from "@/components/playlist-panel";
import { usePlaylist } from "@/components/playlist-context";
import { getActivePlaylistUrl } from "@/lib/playlist-content";

const linkClassName =
  "whitespace-nowrap text-[8px] min-[360px]:text-[9px] min-[420px]:text-[10px] min-[480px]:text-xs sm:text-sm md:text-base tracking-[0.04em] min-[420px]:tracking-[0.1em] min-[480px]:tracking-[0.22em] sm:tracking-[0.28em] uppercase text-foreground/70 hover:text-accent transition-colors";

export default function VersionBlancoHome() {
  const { open, content } = usePlaylist();
  const showFooter = open && !!getActivePlaylistUrl(content);

  return (
    <div className="flex-1 flex flex-col h-dvh min-h-0 overflow-hidden">
      <main
        className={`flex flex-col items-center justify-center gap-5 sm:gap-7 text-center px-6 overflow-x-hidden ${
          showFooter ? "shrink-0 py-8" : "flex-1 min-h-0"
        }`}
      >
        <h1 className="font-display font-medium tracking-wide text-foreground text-[32px] min-[380px]:text-[39px] min-[480px]:text-[51px] sm:text-[64px] md:text-[74px] lg:text-[84px] leading-none whitespace-nowrap">
          PABLO CEBRIÁN
        </h1>
        <div className="h-px w-40 sm:w-80 bg-accent" />
        <nav>
          <ul className="flex flex-nowrap items-center justify-center gap-1.5 min-[360px]:gap-2.5 min-[420px]:gap-4 min-[480px]:gap-5 sm:gap-10">
            <li>
              <Link href="/versionblanco/discografia" className={linkClassName}>
                Discografía
              </Link>
            </li>
            <PlaylistNavLink className={linkClassName} />
            <li>
              <Link href="/versionblanco/sobre-mi" className={linkClassName}>
                Sobre mí
              </Link>
            </li>
            <li>
              <Link href="/versionblanco/contacto" className={linkClassName}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </main>
      <PlaylistPanel />
    </div>
  );
}
