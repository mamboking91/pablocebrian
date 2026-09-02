import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { getSiteContent } from "@/lib/site-content";
import { parsePlaylistContent } from "@/lib/playlist-content";
import { PlaylistProvider } from "@/components/playlist-context";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Productor musical`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Pablo Cebrián",
    "productor musical",
    "producción musical",
    "discografía",
    "música española",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Productor musical`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Productor musical`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Productor musical",
  sameAs: [
    "https://instagram.com/pablocebrian",
    "https://facebook.com/pablo.cebrian.5",
    "https://twitter.com/pablogoldfinger",
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const playlistContent = parsePlaylistContent(
    await getSiteContent("playlist"),
  );

  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <PlaylistProvider content={playlistContent}>
          {children}
        </PlaylistProvider>
      </body>
    </html>
  );
}
