/**
 * Carga los discos placeholder (con sus portadas reales) en Supabase:
 * sube cada imagen a Storage (bucket album-covers) e inserta/actualiza
 * la fila correspondiente en la tabla albums (upsert por slug, así es
 * seguro volver a ejecutarlo).
 *
 * Uso:
 *   SUPABASE_SERVICE_ROLE_KEY=xxx npx tsx scripts/seed-albums.ts
 *
 * Requiere NEXT_PUBLIC_SUPABASE_URL en .env.local (o en el entorno) y
 * la Service Role Key (Project Settings → API Keys) SOLO como variable
 * de entorno puntual — nunca se guarda en el repo.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { PLACEHOLDER_ALBUMS } from "../src/lib/placeholder-albums";

// Node < 22 no trae WebSocket nativo, y @supabase/supabase-js lo necesita
// para inicializar su cliente de Realtime (que este script no usa, pero se
// crea igualmente). Polyfill con `ws` para poder correr en Node 20.
if (!globalThis.WebSocket) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const WebSocket = require("ws");
  globalThis.WebSocket = WebSocket as unknown as typeof globalThis.WebSocket;
}

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  (() => {
    const envLocal = fs.readFileSync(
      path.resolve(process.cwd(), ".env.local"),
      "utf8",
    );
    const match = envLocal.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
    return match?.[1]?.trim();
  })();

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Falta NEXT_PUBLIC_SUPABASE_URL (en .env.local) o SUPABASE_SERVICE_ROLE_KEY (variable de entorno).",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const PUBLIC_DIR = path.resolve(process.cwd(), "public");

async function uploadCover(localCoverUrl: string): Promise<string> {
  const localPath = path.join(PUBLIC_DIR, localCoverUrl);
  const fileName = path.basename(localCoverUrl);
  const fileBuffer = fs.readFileSync(localPath);
  const contentType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

  const { error } = await supabase.storage
    .from("album-covers")
    .upload(fileName, fileBuffer, { contentType, upsert: true });
  if (error) throw error;

  const { data } = supabase.storage.from("album-covers").getPublicUrl(fileName);
  return data.publicUrl;
}

async function main() {
  let ok = 0;
  let failed = 0;

  for (const album of PLACEHOLDER_ALBUMS) {
    process.stdout.write(`${album.slug} … `);
    try {
      const cover_url = album.cover_url
        ? await uploadCover(album.cover_url)
        : null;

      const { id: _placeholderId, ...rest } = album;
      void _placeholderId;

      const { error } = await supabase
        .from("albums")
        .upsert({ ...rest, cover_url }, { onConflict: "slug" });

      if (error) throw error;
      console.log("OK");
      ok++;
    } catch (err) {
      console.log("FALLÓ:", err instanceof Error ? err.message : err);
      failed++;
    }
  }

  console.log(`\nListo. ${ok} discos cargados, ${failed} fallidos.`);
}

main();
