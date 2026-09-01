import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAlbums } from "@/lib/albums";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const albums = await getAlbums();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/discografia`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sobre-mi`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contacto`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const albumRoutes: MetadataRoute.Sitemap = albums.map((album) => ({
    url: `${SITE_URL}/discografia/${album.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...albumRoutes];
}
