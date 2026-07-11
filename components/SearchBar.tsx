"use client";

import { useSearch } from "@/context/SearchContext";

export default function SearchBar() {
  const { search, setSearch } = useSearch();

  return (
    <div className="w-full">
      <label className="relative block">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-4.5 w-4.5"
          >
            <path
              d="M8.5 14a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11Zm3.85-1.65L17 17"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search your files"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full rounded-[18px] border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:shadow-[0_8px_24px_rgba(15,23,42,0.08)] focus:ring-4 focus:ring-indigo-500/10"
        />
      </label>
    </div>
  );
}