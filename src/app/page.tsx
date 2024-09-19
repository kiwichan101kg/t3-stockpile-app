import Link from "next/link";
import { ArticleList, ArticleWithOgp } from "../components/ArticleList";
import { UrlBox } from "../components/UrlBox";
import { api, HydrateClient } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { getOgps } from "@/lib/getOgp";
import { Logo } from "@/components/Logo";

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
        <div className="rounded-lg bg-white px-12 py-8 shadow-lg">
          <div>
            <Logo />
            <p className="mt-2 text-gray-600">技術記事をたくさん集めよう🔥</p>
          </div>
          <div className="mt-6">
            <Link
              href={"/api/auth/signin/google?callbackUrl=/"}
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-6 py-3 text-lg font-medium text-white transition duration-300 hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Googleログインではじめる
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
          <div>
            <Logo />
            <p className="mt-2 text-gray-600">技術記事をたくさん集めよう🔥</p>
          </div>

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
            <Link
              href={"/info/terms"}
              target="_blank"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              利用規約
            </Link>
            <Link
              href={"/info/privacy-policy"}
              target="_blank"
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </footer>
    </HydrateClient>
  );
}

const enrichArticlesWithOgp = async (articleList: Article[]) => {
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
