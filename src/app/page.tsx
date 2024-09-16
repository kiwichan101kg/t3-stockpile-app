import Link from "next/link";
import { ArticleList, ArticleWithOgp } from "./_components/ArticleList";
import { UrlBox } from "./_components/UrlBox";
import { api, HydrateClient } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { getOgps } from "@/lib/getOgp";
import { Pagination } from "./_components/Pagenation";

type Article = {
  id: string;
  url: string;
  status: string;
  memo: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome to Our Service
          </h2>
          <p className="mt-4 text-gray-600">
            Please sign in to continue and access personalized features.
          </p>
          <div className="mt-6">
            <Link
              href={"/api/auth/signin/google?callbackUrl=/"}
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Sign in with Google
            </Link>
          </div>
        </div>
      </div>
    );
  }
  const articleList: Article[] = await api.article.getAllArticle();
  const enrichedArticleList: ArticleWithOgp[] =
    await enrichArticlesWithOgp(articleList);

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gray-100 p-6">
        {/* Header Section */}
        <header className="mb-8 flex items-center justify-between">
          <Link href={"/"}>
            <h1 className="text-3xl font-bold text-gray-800">Tech📚Stock</h1>
            <p className="mt-2 text-gray-600">技術記事をたくさん集めよう🔥</p>
          </Link>

          {/* ログイン・ログアウトボタン */}
          <div>
            <Link
              href={"api/auth/signout"}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              ログアウト
            </Link>
          </div>
        </header>

        <UrlBox />
        <ArticleList articleList={enrichedArticleList} />
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

export const enrichArticlesWithOgp = async (articleList: Article[]) => {
  const urlArr = articleList.filter((item) => item.url).map((item) => item.url);
  const ogps = await getOgps(urlArr);
  const enrichedArticles = articleList.map((article) => {
    // 該当するURLのOGPデータを見つける
    const ogp = ogps.find((ogpItem) => ogpItem.ogUrl === article.url);
    return {
      ...article,
      ogp: ogp ?? null,
    };
  });
  return enrichedArticles;
};
