"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readAlbumForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const artistNames = String(formData.get("artist_names") ?? "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
  const releaseYear = formData.get("release_year");

  return {
    title,
    slug: slugify(title),
    artist_names: artistNames,
    role: String(formData.get("role") ?? "").trim() || null,
    release_year: releaseYear ? Number(releaseYear) : null,
    label: String(formData.get("label") ?? "").trim() || null,
    spotify_url: String(formData.get("spotify_url") ?? "").trim() || null,
    apple_music_url:
      String(formData.get("apple_music_url") ?? "").trim() || null,
    youtube_url: String(formData.get("youtube_url") ?? "").trim() || null,
    show_spotify: formData.get("show_spotify") === "on",
    show_apple_music: formData.get("show_apple_music") === "on",
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

async function uploadCoverIfPresent(
  formData: FormData,
  slug: string,
): Promise<string | null> {
  const file = formData.get("cover") as File | null;
  if (!file || file.size === 0) return null;

  const supabase = await createClient();
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `${slug}-${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from("album-covers")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from("album-covers").getPublicUrl(path);
  return data.publicUrl;
}

export async function createAlbum(formData: FormData) {
  const supabase = await createClient();
  const values = readAlbumForm(formData);
  const cover_url = await uploadCoverIfPresent(formData, values.slug);

  const { error } = await supabase.from("albums").insert({ ...values, cover_url });
  if (error) throw error;

  revalidatePath("/discografia");
  revalidatePath("/");
  redirect("/admin/discos?toast=created");
}

export async function updateAlbum(id: string, formData: FormData) {
  const supabase = await createClient();
  const values = readAlbumForm(formData);
  const cover_url = await uploadCoverIfPresent(formData, values.slug);

  const { error } = await supabase
    .from("albums")
    .update(cover_url ? { ...values, cover_url } : values)
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/discografia");
  revalidatePath(`/discografia/${values.slug}`);
  revalidatePath("/");
  redirect("/admin/discos?toast=updated");
}

export async function setAlbumFlag(
  id: string,
  field: "featured" | "published",
  value: boolean,
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("albums")
    .update({ [field]: value })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/discos");
  revalidatePath("/discografia");
  revalidatePath("/");
}

export async function reorderAlbums(orderedIds: string[]) {
  const supabase = await createClient();

  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("albums").update({ sort_order: index }).eq("id", id),
    ),
  );

  const failed = results.find((result) => result.error);
  if (failed?.error) throw failed.error;

  revalidatePath("/admin/discos");
  revalidatePath("/discografia");
  revalidatePath("/");
}

export async function deleteAlbum(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("albums").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/discografia");
  revalidatePath("/");
  redirect("/admin/discos?toast=deleted");
}
