import Link from "next/link";

const links = [
  { href: "/discografia", label: "Discografía" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

export function Nav() {
  return (
    <header className="flex flex-col items-center gap-6 pt-16 pb-10 px-6 text-center">
      <Link href="/">
        <h1 className="font-display font-medium tracking-wide text-white text-[32px] min-[380px]:text-[36px] sm:text-[38px] md:text-[42px] lg:text-[46px] leading-none whitespace-nowrap">
          PABLO CEBRIÁN
        </h1>
      </Link>
      <div className="h-px w-40 sm:w-56 bg-accent" />
      <nav>
        <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="whitespace-nowrap text-[11px] min-[480px]:text-xs sm:text-sm md:text-base tracking-[0.18em] min-[480px]:tracking-[0.22em] sm:tracking-[0.28em] uppercase text-white/70 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
