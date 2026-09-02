"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlaylistNavLink } from "@/components/playlist-nav-link";

const linkClassName =
  "whitespace-nowrap text-[8px] min-[360px]:text-[9px] min-[420px]:text-[10px] min-[480px]:text-xs sm:text-sm md:text-base tracking-[0.04em] min-[420px]:tracking-[0.1em] min-[480px]:tracking-[0.22em] sm:tracking-[0.28em] uppercase text-foreground/70 hover:text-accent transition-colors";

export function Nav() {
  const pathname = usePathname();
  const prefix = pathname?.startsWith("/versionblanco") ? "/versionblanco" : "";

  return (
    <header className="flex flex-col items-center gap-6 pt-16 pb-10 px-6 text-center">
      <Link href={prefix || "/"}>
        <h1 className="font-display font-medium tracking-wide text-foreground text-[32px] min-[380px]:text-[36px] sm:text-[38px] md:text-[42px] lg:text-[46px] leading-none whitespace-nowrap">
          PABLO CEBRIÁN
        </h1>
      </Link>
      <div className="h-px w-40 sm:w-56 bg-accent" />
      <nav>
        <ul className="flex flex-nowrap items-center justify-center gap-1.5 min-[360px]:gap-2.5 min-[420px]:gap-4 min-[480px]:gap-5 sm:gap-10">
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
