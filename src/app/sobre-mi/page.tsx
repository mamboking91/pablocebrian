import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getSiteContent } from "@/lib/site-content";
import { DEFAULT_BIO_HTML } from "@/lib/default-bio";

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

export default async function SobreMiPage() {
  const bioHtml = (await getSiteContent("bio")) ?? DEFAULT_BIO_HTML;

  return (
    <>
      <Nav />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-[400px_1fr] gap-10 md:gap-16 items-start">
          <div className="relative w-full aspect-[4/5] bg-background-elevated border border-border overflow-hidden">
            <Image
              src="/pablo-cebrian-sobre-mi.jpg"
              alt="Pablo Cebrián"
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose-bio text-center"
            dangerouslySetInnerHTML={{ __html: bioHtml }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
