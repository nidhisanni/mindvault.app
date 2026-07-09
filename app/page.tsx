import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase.storage.listBuckets();

  console.log(data);
  console.log(error);

  return (
    <main className="p-10">
      <h1>Second Brain</h1>
      <p>Check your terminal.</p>
    </main>
  );
}