"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/supabase";
import { useDocument } from "@/context/DocumentContext";
import { deleteFile } from "@/services/storage";
import { useSearch } from "@/context/SearchContext";

type Document = {
  id: string;
  file_name: string;
  storage_path: string;
  created_at: string;
};

export default function DocumentList() {
  const supabase = useSupabase();
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
    async function fetchDocuments() {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
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
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Documents</h2>

      {filteredDocuments.length === 0 ? (
        <p>{search
          ? "No matching documents found."
          : "No documents uploaded yet."}</p>
      ) : (
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <div
            key={doc.id}
            onClick={() => setSelectedDocument(doc.id)}
            className={`p-4 rounded-lg shadow border cursor-pointer transition ${
              selectedDocument === doc.id
                ? "bg-blue-100 border-blue-500"
                : "bg-white"
            }`}
          >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{doc.file_name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(doc.created_at).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(doc.id, doc.storage_path);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}