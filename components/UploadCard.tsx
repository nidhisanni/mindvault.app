"use client";

import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase";
import { uploadDocument } from "@/services/document";

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    const openFilePicker = () => {
      fileInputRef.current?.click();
    };

  return (
    <div className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.docx"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        className="sr-only"
      />

      <div
        className="flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-slate-400 hover:bg-slate-100/80"
        onClick={openFilePicker}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFilePicker();
          }
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M12 10v7M9 13l3-3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="mt-4 text-sm font-semibold text-slate-950">Drop files here or choose a file</h3>
        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
          PDF, TXT, and DOCX files are supported.
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openFilePicker();
          }}
          className="mt-4 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          Choose file
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <p className="min-w-0 truncate text-slate-500">
          {file ? file.name : "No file selected"}
        </p>
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {uploading ? "Uploading..." : "Upload file"}
      </button>
    </div>
  );
}