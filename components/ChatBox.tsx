"use client";

import { useState } from "react";
import { useDocument } from "@/context/DocumentContext";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedDocument } = useDocument();

  async function askAI() {
    if (!selectedDocument) {
      alert("Please select a document first.");
      return;
    }
  
    try {
      setLoading(true);
  
      const res = await fetch("/api/chat-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          documentId: selectedDocument,
        }),
      });
  
      const data = await res.json();
  
      setReply(data.reply);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Ask AI</h2>

      <input
        className="w-full border rounded-lg p-3"
        placeholder="Ask anything about the selected document..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

<button
  onClick={askAI}
  disabled={loading}
  className="mt-4 bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-500"
>
  {loading ? "Thinking..." : "Ask"}
</button>
      {reply && (
        <div className="mt-6 border-t pt-4">
          <p className="font-semibold">AI Reply</p>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}