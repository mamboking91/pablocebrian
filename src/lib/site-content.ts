import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/albums";

export async function getSiteContent(key: string): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("key", key)
    .maybeSingle();

  if (error) throw error;
  return data?.content?.trim() ? data.content : null;
}
