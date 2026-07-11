import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { DocumentProvider } from "@/context/DocumentContext";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";

export const metadata: Metadata = {
  title: "MindVault",
  description: "AI-powered memory search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SearchProvider>
            <DocumentProvider>
              {children}
            </DocumentProvider>
          </SearchProvider>
         </body>
      </html>
    </ClerkProvider>
  );
}