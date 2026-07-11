"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/supabase";
import { useDocument } from "@/context/DocumentContext";
import { deleteFile } from "@/services/storage";
import { useSearch } from "@/context/SearchContext";
import { useUser } from "@clerk/nextjs";

type Document = {
  id: string;
  file_name: string;
  storage_path: string;
  created_at: string;
};

function getDocumentTypeLabel(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (extension === "pdf") return "PDF document";
  if (extension === "txt") return "Text document";
  if (extension === "docx") return "Word document";

  return "Document";
}

export default function DocumentList() {
  const supabase = useSupabase();
  const { user } = useUser();
  const { selectedDocument, setSelectedDocument } = useDocument();
  const { search } = useSearch();
  const [documents, setDocuments] = useState<Document[]>([]);

  async function handleDelete(id: string, storagePath: string) {
    console.log("DELETE CLICKED");
  
    try {
      console.log("Deleting storage...");
      await deleteFile(supabase, storagePath);
      console.log("Storage deleted");
  
      console.log("Deleting database row...");
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", id);
  
      console.log("Database response:", error);
  
      if (error) throw error;
  
      console.log("Updating UI...");
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  
      console.log("Done!");
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Failed to delete document.");
    }
  }
  useEffect(() => {
    if (!user) return;
    async function fetchDocuments() {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setDocuments(data);
    }

    fetchDocuments();
  }, [supabase]);
  
  const filteredDocuments = documents.filter((doc) =>
    doc.file_name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {filteredDocuments.length} document{filteredDocuments.length === 1 ? "" : "s"}
        </p>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="flex-1 rounded-[20px] border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
          <p className="text-sm font-medium text-slate-700">
            {search ? "No matching documents found." : "No documents uploaded yet."}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Upload a file to start building your workspace.
          </p>
        </div>
      ) : (
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDocument(doc.id)}
              className={`group cursor-pointer rounded-[20px] border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                selectedDocument === doc.id
                  ? "border-indigo-500 bg-indigo-50/80 shadow-sm ring-1 ring-indigo-500/10"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                    selectedDocument === doc.id
                      ? "border-indigo-200 bg-white text-indigo-600"
                      : "border-slate-200 bg-slate-50 text-slate-500"
                  }`}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path
                      d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950" title={doc.file_name}>
                        {doc.file_name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(doc.created_at).toLocaleString()}
                      </p>
                    </div>

                    {selectedDocument === doc.id && (
                      <span className="shrink-0 rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                        Selected
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="truncate text-xs font-medium text-slate-500">
                      {getDocumentTypeLabel(doc.file_name)}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(doc.id, doc.storage_path);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path d="M3 6h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M6 6l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M10 11v5M14 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}