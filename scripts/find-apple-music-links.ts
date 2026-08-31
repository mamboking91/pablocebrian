/**
 * Busca cada disco en la API pública de iTunes Search (gratuita, sin
 * credenciales) y propone el enlace de Apple Music más probable.
 * Solo IMPRIME un informe para revisar a mano — no escribe en la DB.
 *
 * Uso: npx tsx scripts/find-apple-music-links.ts
 */
import { PLACEHOLDER_ALBUMS } from "../src/lib/placeholder-albums";

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function searchItunes(term: string, country: string) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term,
  )}&entity=album&limit=10&country=${country}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results as {
    collectionName: string;
    artistName: string;
    collectionViewUrl: string;
  }[];
}

function scoreMatch(
  albumTitle: string,
  artist: string,
  result: { collectionName: string; artistName: string },
) {
  const nTitle = normalize(albumTitle);
  const nArtist = normalize(artist);
  const rTitle = normalize(result.collectionName);
  const rArtist = normalize(result.artistName);

  let score = 0;
  if (rTitle === nTitle) score += 3;
  else if (rTitle.includes(nTitle) || nTitle.includes(rTitle)) score += 2;

  if (rArtist === nArtist) score += 3;
  else if (rArtist.includes(nArtist) || nArtist.includes(rArtist)) score += 2;
  else if (nArtist.split(" ").some((w) => w.length > 2 && rArtist.includes(w)))
    score += 1;

  return score;
}

async function main() {
  const rows: string[] = [];

  for (const album of PLACEHOLDER_ALBUMS) {
    const primaryArtist = album.artist_names[0];
    const term = `${primaryArtist} ${album.title}`;

    let results = await searchItunes(term, "es");
    if (results.length === 0) results = await searchItunes(term, "us");

    let best: { collectionName: string; artistName: string; collectionViewUrl: string } | null = null;
    let bestScore = -1;
    for (const r of results) {
      const s = scoreMatch(album.title, primaryArtist, r);
      if (s > bestScore) {
        bestScore = s;
        best = r;
      }
    }

    const confidence = bestScore >= 5 ? "ALTA" : bestScore >= 3 ? "media" : "BAJA/ninguna";
    rows.push(
      `${album.slug}\t${confidence}\t"${album.title}" — ${primaryArtist}\t→\t${
        best ? `"${best.collectionName}" — ${best.artistName}\t${best.collectionViewUrl}` : "(sin resultado)"
      }`,
    );
    // Evita saturar la API pública.
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log(rows.join("\n"));
}

main();
