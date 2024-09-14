import Link from "next/link";
import { ArticleList } from "./_components/ArticleList";
import { UrlBox } from "./_components/UrlBox";
import { api, HydrateClient } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { getOgps } from "@/lib/getOgp";

type Article = {
  id: number;
  url: string;
  status: string;
  memo: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export default async function Home() {
  const articleList: Article[] = await api.article.getAllArticle();
  const enrichedArticleList: ArticleList[] =
    await enrichArticlesWithOgp(articleList);
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
              href={"api/auth/signout"}
              className="rounded-md bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
            >
              ログアウト
            </Link>
          </div>
        </header>

        <UrlBox />
        <ArticleList articleList={enrichedArticleList} />
      </main>
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
