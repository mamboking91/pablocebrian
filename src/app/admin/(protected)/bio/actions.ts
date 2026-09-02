"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BioContent } from "@/lib/bio-content";

async function uploadPhotoIfPresent(formData: FormData): Promise<string | null> {
  const file = formData.get("photo") as File | null;
  if (!file || file.size === 0) return null;

  const supabase = await createClient();
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `bio-${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from("bio-photos")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from("bio-photos").getPublicUrl(path);
  return data.publicUrl;
}

export async function saveBioContent(formData: FormData) {
  const raw = String(formData.get("content") ?? "{}");
  const content = JSON.parse(raw) as BioContent;

  const photoUrl = await uploadPhotoIfPresent(formData);
  if (photoUrl) content.photoUrl = photoUrl;

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert(
      { key: "bio_structured", content: JSON.stringify(content) },
      { onConflict: "key" },
    );

  if (error) throw error;

  revalidatePath("/sobre-mi");
}
