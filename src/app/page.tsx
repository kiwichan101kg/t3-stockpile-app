import Link from "next/link";
import { ArticleList } from "./_components/ArticleList";
import { UrlBox } from "./_components/UrlBox";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-gray-100 p-6">
        {/* Header Section */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stockpile</h1>
            <p className="mt-2 text-gray-600">技術記事をたくさん集めよう🎉</p>
          </div>

          {/* ログイン・ログアウトボタン */}
          <div>
            <Link
              href={"api/auth/signin"}
              className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              ログイン
            </Link>
            <button className="rounded-md bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600">
              ログアウト
            </button>
          </div>
        </header>

        <UrlBox />

        {/* Article List Section */}
        <section>
          {/* フィルタリングボタン */}
          <div className="mb-6 flex flex-wrap space-x-4">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
              すべて
            </button>
            <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300">
              読んだ
            </button>
            <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300">
              読みたい
            </button>
          </div>
          <ArticleList />
        </section>
      </main>
    </HydrateClient>
  );
}
