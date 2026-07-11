import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import UploadCard from "@/components/UploadCard";
import DocumentList from "@/components/DocumentList";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1.5">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              Workspace
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              MindVault dashboard
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Search documents, upload new files, and ask questions from the same
              workspace without leaving the page.
            </p>
          </div>

        </div>

        <div className="mt-5">
          <SearchBar />
        </div>

        <div className="mt-5 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-stretch">
          <aside className="space-y-6 xl:flex xl:h-full xl:flex-col">
            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6 xl:flex xl:flex-1 xl:flex-col">
              <div className="mb-4 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">
                  Upload
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-950">
                  Add a document
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Upload PDF, TXT, or DOCX files to make them available for search
                  and chat.
                </p>
              </div>

              <UploadCard />
            </section>

            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6 xl:flex xl:flex-1 xl:flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">
                    Documents
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-950">
                    Your library
                  </h2>
                </div>
              </div>

              <DocumentList />
            </section>
          </aside>

          <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:flex xl:h-full xl:flex-col">
            <div className="mb-4 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">
                  Chat
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-950 sm:text-xl">
                  Ask questions about the selected document
                </h2>
              </div>

              <p className="text-sm text-slate-500">
                Keep one document selected for focused answers.
              </p>
            </div>

            <div className="xl:flex-1">
              <ChatBox />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}