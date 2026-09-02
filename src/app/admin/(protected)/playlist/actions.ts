"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PlaylistContent } from "@/lib/playlist-content";

export async function savePlaylistContent(formData: FormData) {
  const content: PlaylistContent = {
    provider: formData.get("provider") === "apple_music" ? "apple_music" : "spotify",
    url: String(formData.get("url") ?? "").trim(),
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert(
      { key: "playlist", content: JSON.stringify(content) },
      { onConflict: "key" },
    );

  if (error) throw error;

  revalidatePath("/", "layout");
}
