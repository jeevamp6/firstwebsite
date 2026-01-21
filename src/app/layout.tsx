import type { Metadata } from "next";
import { Inter } from "next/font/google"; // [NEW]
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" }); // [NEW]

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
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>

    </html>
  );
}
