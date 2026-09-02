"use client";

import Link from "next/link";
import { PlaylistNavLink } from "@/components/playlist-nav-link";
import { PlaylistPanel } from "@/components/playlist-panel";
import { usePlaylist } from "@/components/playlist-context";
import { getActivePlaylistUrl } from "@/lib/playlist-content";

const linkClassName =
  "whitespace-nowrap text-[clamp(9px,3vw,13px)] sm:text-sm md:text-base tracking-[clamp(0.02em,0.6vw,0.16em)] sm:tracking-[0.28em] uppercase text-foreground/70 hover:text-accent transition-colors";

export default function VersionBlancoHome() {
  const { open, content, close } = usePlaylist();
  const showFooter = open && !!getActivePlaylistUrl(content);

  return (
    <div className="flex-1 flex flex-col h-dvh min-h-0 overflow-hidden">
      <main
        className={`flex flex-col items-center justify-center gap-5 sm:gap-7 text-center px-6 overflow-x-hidden ${
          showFooter ? "shrink-0 py-8" : "flex-1 min-h-0"
        }`}
      >
        <Link href="/versionblanco" onClick={close}>
          <h1 className="font-display font-medium tracking-wide text-foreground text-[32px] min-[380px]:text-[39px] min-[480px]:text-[51px] sm:text-[64px] md:text-[74px] lg:text-[84px] leading-none whitespace-nowrap">
            PABLO CEBRIÁN
          </h1>
        </Link>
        <div className="h-px w-40 sm:w-80 bg-accent" />
        <nav>
          <ul className="flex flex-nowrap items-center justify-center gap-[clamp(6px,2.2vw,20px)] sm:gap-10">
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
