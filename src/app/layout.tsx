import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jacobpoole.dev"),

  title: "Jacob Poole",
  description: "Frontend Developer specializing in React, Next.js, and modern UI experiences.",

  openGraph: {
    title: "Jacob Poole",
    description:
      "Frontend Developer specializing in React, Next.js, and modern UI experiences.",
    url: "https://www.jacobpoole.dev",
    siteName: "Jacob Poole Portfolio",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Jacob Poole Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jacob Poole",
    description:
      "Frontend Developer specializing in React, Next.js, and modern UI experiences.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
