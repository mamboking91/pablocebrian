import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DiscographyBrowser } from "@/components/discography-browser";
import { getAlbums } from "@/lib/albums";

export const metadata = {
  title: "Discografía | Pablo Cebrián",
};

export default async function VersionBlancoDiscografiaPage() {
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
