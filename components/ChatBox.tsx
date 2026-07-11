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
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">AI assistant</p>
          <p className="text-sm text-slate-500">Ask questions about the selected document.</p>
        </div>

        {selectedDocument ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Document selected
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            No document selected
          </span>
        )}
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <textarea
          className="min-h-[92px] w-full resize-none rounded-[18px] border border-slate-200 bg-white p-3.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          placeholder="Ask anything about the selected document..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Use the selected file as context for better answers.
          </p>

          <button
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
            onClick={askAI}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Thinking
              </span>
            ) : (
              "Ask AI"
            )}
          </button>
        </div>
      </div>

      {reply && (
        <div className="flex-1 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <p className="text-sm font-semibold text-slate-950">Response</p>
          </div>

          <div className="max-h-[420px] overflow-y-auto px-5 py-4 text-[15px] leading-7 text-slate-700 sm:text-base">
            <div className="whitespace-pre-wrap">{reply}</div>
          </div>
        </div>
      )}
    </div>
  );
}