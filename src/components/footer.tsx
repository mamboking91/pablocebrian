const socials = [
  { href: "https://instagram.com/pablocebrian", label: "Instagram" },
  { href: "https://facebook.com/pablo.cebrian.5", label: "Facebook" },
  { href: "https://twitter.com/pablogoldfinger", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center gap-3 px-6 py-12 text-center">
      <ul className="flex items-center gap-6">
        {socials.map((social) => (
          <li key={social.href}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-muted hover:text-accent transition-colors"
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted/70">
        © {new Date().getFullYear()} Pablo Cebrián
      </p>
      <p className="text-xs text-muted/70">
        Creado por{" "}
        <a
          href="https://arpwebcanarias.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground/80 transition-colors hover:text-accent"
        >
          <span className="text-accent">ARP</span> web
        </a>
      </p>
    </footer>
  );
}
