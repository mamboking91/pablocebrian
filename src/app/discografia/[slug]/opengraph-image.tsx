import { ImageResponse } from "next/og";
import { getAlbumBySlug } from "@/lib/albums";
import RootImage from "../../opengraph-image";

export const alt = "Portada del disco — Pablo Cebrián";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album?.cover_url) {
    return RootImage();
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          padding: 64,
          background: "#000000",
        }}
      >
        <img
          src={album.cover_url}
          width={502}
          height={502}
          style={{ objectFit: "cover", boxShadow: "0 0 0 1px #262626" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 540,
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", fontSize: 46, fontWeight: 600 }}>
            {album.artist_names.join(", ")}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#b8860b" }}>
            {album.title}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
