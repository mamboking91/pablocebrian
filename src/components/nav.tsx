"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlaylistNavLink } from "@/components/playlist-nav-link";
import { usePlaylist } from "@/components/playlist-context";

const linkClassName =
  "whitespace-nowrap text-[clamp(9px,3vw,13px)] sm:text-sm md:text-base tracking-[clamp(0.02em,0.6vw,0.16em)] sm:tracking-[0.28em] uppercase text-foreground/70 hover:text-accent transition-colors";

export function Nav() {
  const pathname = usePathname();
  const prefix = pathname?.startsWith("/versionblanco") ? "/versionblanco" : "";
  const { close } = usePlaylist();

  return (
    <header className="flex flex-col items-center gap-6 pt-16 pb-10 px-6 text-center">
      <Link href={prefix || "/"} onClick={close}>
        <h1 className="font-display font-medium tracking-wide text-foreground text-[32px] min-[380px]:text-[36px] sm:text-[38px] md:text-[42px] lg:text-[46px] leading-none whitespace-nowrap">
          PABLO CEBRIÁN
        </h1>
      </Link>
      <div className="h-px w-40 sm:w-56 bg-accent" />
      <nav>
        <ul className="flex flex-nowrap items-center justify-center gap-[clamp(6px,2.2vw,20px)] sm:gap-10">
          <li>
            <Link href={`${prefix}/discografia`} className={linkClassName}>
              Discografía
            </Link>
          </li>
          <PlaylistNavLink className={linkClassName} />
          <li>
            <Link href={`${prefix}/sobre-mi`} className={linkClassName}>
              Sobre mí
            </Link>
          </li>
          <li>
            <Link href={`${prefix}/contacto`} className={linkClassName}>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
