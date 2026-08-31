import { createClient } from "@/lib/supabase/server";
import { Album } from "./types";
import { PLACEHOLDER_ALBUMS } from "./placeholder-albums";

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function getAlbums(): Promise<Album[]> {
  if (!isSupabaseConfigured()) {
    return [...PLACEHOLDER_ALBUMS].sort((a, b) => a.sort_order - b.sort_order);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as Album[];
}

export async function getAlbumBySlug(slug: string): Promise<Album | null> {
  if (!isSupabaseConfigured()) {
    return PLACEHOLDER_ALBUMS.find((album) => album.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;
  return data as Album | null;
}
