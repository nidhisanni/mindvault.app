"use client";

import { useSearch } from "@/context/SearchContext";

export default function SearchBar() {
  const { search, setSearch } = useSearch();

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <input
        type="text"
        placeholder="Search your files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}