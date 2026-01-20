import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReelDocs",
  description: "Reels + Resources for Gen Z",
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
