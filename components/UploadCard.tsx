"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase";
import { uploadDocument } from "@/services/document";

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { user } = useUser();

  const supabase = useSupabase();

  const handleUpload = async () => {
    if (!file || !user) return;
    setUploading(true);

    try {
      await uploadDocument({
        supabase,
        file,
        userId: user.id,
      });

      alert("File uploaded successfully!");
      setUploading(false);
    } catch (error: any) {
        console.error(error);
        alert(error?.message || String(error));
      }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 border-2 border-dashed rounded-xl p-10 text-center">
      <h2 className="text-xl font-semibold">Upload Files</h2>

      <p className="text-gray-500 mt-2">
        PDF, TXT and DOCX supported
      </p>

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      {file && <p className="mt-4">{file.name}</p>}

    <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-500"
    >
        {uploading ? "Uploading..." : "Upload File"}
    </button>
    </div>
  );
}