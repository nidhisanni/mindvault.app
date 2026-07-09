import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import UploadCard from "@/components/UploadCard";

export default function Home() {
  return (
    <main>
      <Navbar />

      <div className="px-6">
        <SearchBar />
        <UploadCard />
      </div>
    </main>
  );
}