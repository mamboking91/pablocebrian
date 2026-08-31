"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveBio(formData: FormData) {
  const content = String(formData.get("content") ?? "");

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ key: "bio", content }, { onConflict: "key" });

  if (error) throw error;

  revalidatePath("/sobre-mi");
}
