import Link from "next/link";

const links = [
  { href: "/versionblanco/discografia", label: "Discografía" },
  { href: "/versionblanco/sobre-mi", label: "Sobre mí" },
  { href: "/versionblanco/contacto", label: "Contacto" },
];

export default function VersionBlancoHome() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-7 min-h-dvh text-center px-6 overflow-x-hidden">
      <h1 className="font-display font-medium tracking-wide text-foreground text-[32px] min-[380px]:text-[39px] min-[480px]:text-[51px] sm:text-[64px] md:text-[74px] lg:text-[84px] leading-none whitespace-nowrap">
        PABLO CEBRIÁN
      </h1>
      <div className="h-px w-40 sm:w-80 bg-accent" />
      <nav>
        <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="whitespace-nowrap text-[11px] min-[480px]:text-xs sm:text-sm md:text-base tracking-[0.18em] min-[480px]:tracking-[0.22em] sm:tracking-[0.28em] uppercase text-foreground/70 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
