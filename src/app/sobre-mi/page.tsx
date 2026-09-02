import type { Metadata } from "next";
import Image from "next/image";
import { PlaylistPageShell } from "@/components/playlist-page-shell";
import { Footer } from "@/components/footer";
import { getSiteContent } from "@/lib/site-content";
import { parseBioContent, type BioAwardIcon } from "@/lib/bio-content";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "La biografía de Pablo Cebrián, productor musical español: trayectoria, discos y colaboraciones.",
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    url: "/sobre-mi",
    title: "Sobre mí | Pablo Cebrián",
    description:
      "La biografía de Pablo Cebrián, productor musical español: trayectoria, discos y colaboraciones.",
    images: [
      {
        url: "/pablo-cebrian-sobre-mi.jpg",
        width: 1200,
        height: 1500,
        alt: "Pablo Cebrián",
      },
    ],
  },
  twitter: {
    title: "Sobre mí | Pablo Cebrián",
    description:
      "La biografía de Pablo Cebrián, productor musical español: trayectoria, discos y colaboraciones.",
    images: ["/pablo-cebrian-sobre-mi.jpg"],
  },
};

function AwardIcon({ icon }: { icon: BioAwardIcon }) {
  if (icon === "star") {
    return (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="var(--accent)"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M12 2l2.6 6.6L21.5 9l-5 4.6 1.5 7-6-3.4-6 3.4 1.5-7L2.5 9l6.9-.4z" />
      </svg>
    );
  }
  if (icon === "dot") {
    return (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="2.2"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.4" fill="var(--muted)" stroke="none" />
      </svg>
    );
  }
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--muted)"
      strokeWidth="2.4"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  );
}

export default async function SobreMiPage() {
  const raw = await getSiteContent("bio_structured");
  const bio = parseBioContent(raw);

  return (
    <PlaylistPageShell>
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pb-24">
        <div className="relative h-[420px] sm:h-[560px] md:h-[680px]">
          <Image
            src={bio.photoUrl}
            alt="Pablo Cebrián"
            fill
            sizes="(min-width: 1024px) 1000px, 100vw"
            priority
            className="object-contain"
            style={{
              objectPosition: "50% 42%",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 13%, rgba(0,0,0,1) 64%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 13%, rgba(0,0,0,1) 64%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />
          <div className="absolute inset-x-4 sm:inset-x-8 md:inset-x-16 bottom-0 flex flex-col gap-3 sm:gap-4">
            <p className="font-display text-2xl sm:text-3xl md:text-[40px] leading-tight text-foreground max-w-[26ch] text-pretty">
              {bio.headline}
            </p>
            <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-foreground/70 max-w-[52ch] text-pretty">
              {bio.subheadline}
            </p>
          </div>
        </div>

        {bio.paragraphs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-10 md:pt-12">
            {bio.paragraphs.map((p) => (
              <div
                key={p.id}
                className="prose-bio text-[15px] sm:text-base text-pretty"
                dangerouslySetInnerHTML={{ __html: p.text }}
              />
            ))}
          </div>
        )}

        {bio.awards.length > 0 && (
          <div className="mt-10 md:mt-11 py-4 border-t border-b border-border flex flex-wrap items-center justify-between gap-y-3.5 gap-x-5">
            {bio.awards.map((award) => (
              <div key={award.id} className="flex items-center gap-2">
                <AwardIcon icon={award.icon} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-foreground/60 whitespace-nowrap leading-tight">
                    {award.label}
                  </span>
                  <span className="text-[9px] tracking-[0.14em] text-muted whitespace-nowrap leading-none">
                    {award.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {bio.highlights.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 pt-10 md:pt-12">
            {bio.highlights.map((item) => (
              <div key={item.id} className="flex flex-col gap-2.5">
                <div className="text-[11px] tracking-[0.26em] text-accent uppercase">
                  {item.title}
                </div>
                <p className="text-sm leading-[1.8] text-foreground/70 text-pretty">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {bio.quote && (
          <div className="mt-12 md:mt-14 pt-8 pb-4 border-t border-border">
            <p className="font-display italic text-lg sm:text-xl leading-relaxed text-foreground/50 max-w-[56ch] text-pretty">
              {bio.quote}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </PlaylistPageShell>
  );
}
