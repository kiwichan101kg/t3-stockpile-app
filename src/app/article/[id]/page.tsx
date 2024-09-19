import { getOgp } from "@/lib/getOgp";
import { api, HydrateClient } from "@/trpc/server";
import { Article } from "@prisma/client";
import ArticleMemo from "@/components/ArticleMemo";
import { ArticleWithOgp } from "@/components/ArticleList";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};
const commentArr = [
  "技術記事をたくさん集めてスキルアップ📚✨",
  "今日も1日コツコツ頑張ろう💪🔥",
  "新しい知識を吸収して成長しよう🌱📖",
  "頑張っている自分をしっかり褒めよう🎉✨",
  "少しずつ積み重ねていけば、大きな成果に繋がるよ🚀🌟",
  "継続は力なり！今日も一歩前進しよう🏃‍♂️📈",
  "自分のペースでゆっくり進もう🌸🍀",
];
const getRandomComment = () => {
  return commentArr[Math.floor(Math.random() * commentArr.length)];
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
          <div>
            <Logo />
            <p className="mt-2 text-gray-600">{getRandomComment()}</p>
          </div>{" "}
        </header>

        <div className="container mx-auto max-w-2xl p-6">
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            {/* 記事のタイトル */}
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {ogp?.ogTitle ?? "No Title"}
            </h2>

            {/* 記事の内容 */}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
              {article.ogp?.ogImage && article.ogp?.ogImage.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.ogp?.ogImage[0]?.url}
                  alt={article.ogp?.ogImage[0]?.alt ?? "OGP Image"}
                  className="mb-2 h-auto w-60"
                />
              ) : (
                <div className="mb-2 flex h-32 w-60 items-center justify-center rounded-sm bg-gray-200 text-gray-500">
                  No Image
                </div>
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
