import Link from "next/link";
import { ArticleList, type ArticleWithInfo } from "../components/ArticleList";
import { UrlBox } from "../components/UrlBox";
import { api, HydrateClient } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { getOgps } from "@/lib/getOgp";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { getXPosts, isXUrl } from "@/lib/getXpost";

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
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              <Link
                target="_blank"
                href="/info/terms"
                className="text-blue-500 hover:underline"
              >
                利用規約
              </Link>{" "}
              と{" "}
              <Link
                target="_blank"
                href="/info/privacy-policy"
                className="text-blue-500 hover:underline"
              >
                プライバシーポリシー
              </Link>{" "}
              に同意した上でログインしてください。
            </p>
          </div>
        </div>
      </div>
    );
  }
  const articleList: Article[] = await api.article.getAllArticle();
  const enrichedArticleList: ArticleWithInfo[] =
    await enrichArticlesWithOgp(articleList);

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gray-100 p-6">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-gray-600 sm:text-lg">
              技術記事をたくさん集めよう🔥
            </p>
          </div>
          <HamburgerMenu />
        </header>

        <UrlBox />
        <ArticleList articleList={enrichedArticleList} />
      </main>
      <Footer />
    </HydrateClient>
  );
}

const enrichArticlesWithOgp = async (articleList: Article[]) => {
  const urlArr = articleList.filter((item) => item.url).map((item) => item.url);

  // XのURL配列を取得
  const xUrlArr = urlArr.filter((url) => isXUrl(url));
  // X以外のURL配列は、urlArrからxUrlArrを除いた残り
  const otherUrlArr = urlArr.filter((url) => !xUrlArr.includes(url));

  const xPosts = await getXPosts(xUrlArr);
  const ogps = await getOgps(otherUrlArr);

  const enrichedArticles = articleList.map((article) => {
    // 該当するURLのOGPデータを見つける
    const ogp = ogps.find((ogpItem) => ogpItem.ogUrl === article.url);
    const xPost = xPosts.find((xPostItem) => xPostItem.url === article.url);
    return {
      ...article,
      info: ogp ?? xPost ?? null,
    };
  });
  return enrichedArticles;
};
