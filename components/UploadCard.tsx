"use client";
import { useState } from "react";
import { uploadFile } from "@/services/storage";
export default function UploadCard() {
    const [file, setFile] = useState<File | null>(null);
    const handleUpload = async () => {
        console.log("Upload button clicked");
        if (!file) return;
    
        try {
          await uploadFile(file);
          alert("File uploaded successfully!");
        } catch (error) {
          console.error(error);
          alert("Upload failed.");
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
            }}/>
            {file && <p className="mt-4">{file.name}</p>}
            <button
                onClick={handleUpload}
                className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
                Upload File
            </button>
      </div>
    );
  }