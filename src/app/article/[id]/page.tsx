import { getOgp } from "@/lib/getOgp";
import { api, HydrateClient } from "@/trpc/server";
import { type Article } from "@prisma/client";
import ArticleMemo from "@/components/ArticleMemo";
import { type ArticleWithInfo } from "@/components/ArticleList";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { isOgObject, isXPostObject } from "@/utils/typeGuards";
import { ReactParser } from "@/components/ReactParser";
import { getXPost, isXUrl, XPostObject } from "@/lib/getXpost";
import { OgObject } from "open-graph-scraper/types";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

const getArticleInfo = async (
  url: string,
): Promise<OgObject | XPostObject | null> => {
  if (isXUrl(url)) {
    const xPost = await getXPost(url);
    return xPost;
  }
  const ogp = await getOgp(url);
  return ogp;
};

export default async function Page({ params }: Props) {
  const response: Article = await api.article.getArticleById({ id: params.id });
  const articleInfo = await getArticleInfo(response.url);
  const article: ArticleWithInfo = { ...response, info: articleInfo };

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gray-100 p-6">
        {/* Header Section */}
        <header className="mb-8 flex items-center justify-between">
          {/* 戻るボタン */}
          <Link
            href={"/"}
            className="inline-flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </header>

        <div className="container mx-auto max-w-2xl sm:p-0 md:p-6">
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            {/* 記事のタイトル */}
            {isOgObject(article.info) && (
              <>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  {article.info?.ogTitle ?? "No Title"}
                </h2>
                {/* 記事の内容 */}

                <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
                  {article.info?.ogImage && article.info?.ogImage.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.info?.ogImage[0]?.url}
                      alt={article.info?.ogImage[0]?.alt ?? "info Image"}
                      className="mb-2 h-auto w-60"
                    />
                  ) : (
                    <div className="mb-2 flex h-32 w-60 items-center justify-center rounded-sm bg-gray-200 text-gray-500">
                      No Image
                    </div>
                  )}

                  <div className="mt-4 md:mt-0">
                    <p className="mb-4 text-gray-600">
                      {article?.info?.ogDescription ?? "No Description"}
                    </p>
                  </div>
                </div>
              </>
            )}
            {isXPostObject(article.info) && (
              <div>
                <ReactParser tweetHTML={article.info?.html || ""} />
              </div>
            )}

            {/* ボタンの配置 */}
            <div className="mt-4 flex justify-between space-x-4">
              {/* 記事を読むボタン */}
              <div className="w-1/2 md:w-1/4">
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
      <Footer />
    </HydrateClient>
  );
}
