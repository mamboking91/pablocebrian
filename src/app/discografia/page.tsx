import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DiscographyBrowser } from "@/components/discography-browser";
import { getAlbums } from "@/lib/albums";

export const metadata: Metadata = {
  title: "Discografía",
  description:
    "Discografía completa de Pablo Cebrián: discos producidos, escritos y tocados a lo largo de su carrera.",
  alternates: { canonical: "/discografia" },
  openGraph: {
    url: "/discografia",
    title: "Discografía | Pablo Cebrián",
    description:
      "Discografía completa de Pablo Cebrián: discos producidos, escritos y tocados a lo largo de su carrera.",
  },
  twitter: {
    title: "Discografía | Pablo Cebrián",
    description:
      "Discografía completa de Pablo Cebrián: discos producidos, escritos y tocados a lo largo de su carrera.",
  },
};

export default async function DiscografiaPage() {
  const albums = await getAlbums();

  return (
    <>
      <Nav />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pb-24">
        <DiscographyBrowser albums={albums} />
      </main>
      <Footer />
    </>
  );
}
