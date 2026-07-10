import { SupabaseClient } from "@supabase/supabase-js";

export async function uploadFile(
  supabase: SupabaseClient,
  file: File
) {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("documents")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  return {
    fileName,
    path: data.path,
  };
}

export async function deleteFile(
  supabase: SupabaseClient,
  storagePath: string
) {
  const { error } = await supabase.storage
    .from("documents")
    .remove([storagePath]);

  if (error) {
    throw error;
  }
}