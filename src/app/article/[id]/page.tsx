import { getOgp } from "@/lib/getOgp";
import { api, HydrateClient } from "@/trpc/server";
import { Article } from "@prisma/client";
import ArticleMemo from "@/app/_components/ArticleMemo";
import { ArticleWithOgp } from "@/app/_components/ArticleList";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};
export default async function Page({ params }: Props) {
  const response: Article = await api.article.getArticleById({ id: params.id });
  const ogp = await getOgp(response.url);
  const article: ArticleWithOgp = { ...response, ogp: ogp };

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gray-100 p-6">
        {/* Header Section */}
        <header className="mb-8 flex items-center justify-between">
          <Link href={"/"}>
            <h1 className="text-3xl font-bold text-gray-900">Tech📚Stock</h1>
            <p className="mt-2 text-gray-600">技術記事をたくさん集めよう🔥</p>
          </Link>
        </header>

        <div className="container mx-auto max-w-2xl p-6">
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            {/* 記事のタイトル */}
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {ogp?.ogTitle ?? "No Title"}
            </h2>

            {/* 記事の内容 */}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
              {article?.ogp?.ogImage && article?.ogp?.ogImage.length > 0 && (
                <img
                  src={article.ogp.ogImage[0]?.url}
                  alt={article.ogp.ogImage[0]?.alt ?? "OGP Image"}
                  className="h-auto w-60 rounded-md border"
                />
              )}

              <div className="mt-4 md:mt-0">
                <p className="mb-4 text-gray-600">
                  {article?.ogp?.ogDescription ?? "No Description"}
                </p>
              </div>
            </div>

            {/* ボタンの配置 */}
            <div className="mt-4 flex justify-between space-x-4">
              {/* 記事を読むボタン */}
              <div className="w-1/4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100 hover:shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  記事を読む
                </a>
              </div>
            </div>
          </div>

          <ArticleMemo article={article} />
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
          {/* コピーライト部分 */}
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Tech📚Stock. All rights reserved.
          </p>

          {/* リンク部分 */}
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              利用規約
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              プライバシーポリシー
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              サポート
            </a>
          </div>
        </div>
      </footer>
    </HydrateClient>
  );
}
