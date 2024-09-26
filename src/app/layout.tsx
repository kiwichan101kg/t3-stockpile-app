import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "Tech Stock",
  description:
    "技術記事を効率よく管理！読みたい記事をストックして、進行状況を整理し、学びの記録を残せるアプリ",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Tech Stock",
    description:
      "技術記事を効率よく管理！読みたい記事をストックして、進行状況を整理し、学びの記録を残せるアプリ",
    url: "https://tech-stock-app-six.vercel.app/",
    siteName: "Tech Stock",
    images: [
      {
        url: "/images/opengraph-image.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Stock",
    description:
      "技術記事を効率よく管理！読みたい記事をストックして、進行状況を整理し、学びの記録を残せるアプリ",
    images: ["/images/opengraph-image.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
      <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_GAID} />
    </html>
  );
}
