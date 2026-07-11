"use client";

import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
export default function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <nav className="sticky top-0 z-50 h-[68px] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sm font-semibold text-sky-700 shadow-sm">
            MV
          </div>

          <div className="leading-tight">
            <p className="text-base font-semibold text-slate-950">MindVault</p>
            <p className="text-xs text-slate-500">AI document workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
        {!isSignedIn ? (
  <>
    <SignInButton mode="modal">
      <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100">
        Sign In
      </button>
    </SignInButton>

    <SignUpButton mode="modal">
      <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
        Sign Up
      </button>
    </SignUpButton>
  </>
) : (
  <UserButton appearance={{ elements: { avatarBox: "h-10 w-10" } }} />
)}
</div>
      </div>
    </nav>
  );
}