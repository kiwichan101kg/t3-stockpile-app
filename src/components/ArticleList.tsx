"use client";
import { api } from "@/trpc/react";
import { revalidatePath } from "next/cache";
import { OgObject } from "open-graph-scraper/types";
import React, { useState } from "react";
import { Pagination } from "./Pagenation";

export type ArticleWithOgp = {
  id: string;
  url: string;
  status: string;
  memo: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  ogp: OgObject | null;
};

type ArticleListProps = {
  articleList: ArticleWithOgp[];
};
export const ArticleList = ({ articleList }: ArticleListProps) => {
  const tabs = [
    { key: "all", label: "すべて" },
    { key: "notRead", label: "読みたい" },
    { key: "reading", label: "進行中" },
    { key: "read", label: "読んだ" },
  ];
  const [activeTabr, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // API
  const utils = api.useUtils();
  const deleteArticle = api.article.delete.useMutation({
    onSuccess: async () => {
      revalidatePath("/");
      // articleに関するキャッシュの削除
      await utils.article.getAllArticle.invalidate();
    },
  });

  // タブ切り替え
  const activeArticleList = articleList.filter(
    (article) => activeTabr === "all" || article.status === activeTabr,
  );

  // ページネーション
  const itemsPerPage = 6;
  // 合計ページ数
  const totalPages = Math.ceil(activeArticleList.length / itemsPerPage);
  // 現在表示されているデータ
  const getCurrentData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return activeArticleList.slice(start, end);
  };
  const currentData = getCurrentData();
  // 「＞」押下時
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  // 「＜」押下時
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  // ページ番号押下時
  const jumpToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };
  const props = {
    currentPage: currentPage,
    totalPages: totalPages,
    nextPage: nextPage,
    prevPage: prevPage,
    jumpToPage: jumpToPage,
  };

  const handleDelete = (id: string) => {
    deleteArticle.mutate({ id });
  };
  const handleSetActive = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  return (
    <section className="flex min-h-screen flex-col">
      <div className="mb-6 w-full">
        <div className="flex justify-center space-x-8 border-b-2 border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleSetActive(tab.key)}
              className={`pb-2 text-lg font-medium ${
                activeTabr === tab.key
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {currentData.length === 0 && (
        <p className="text-center text-gray-600">記事がありません</p>
      )}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {currentData.map((article) => (
          <div
            key={article.id}
            className="relative flex flex-col justify-between rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
          >
            {/* 削除ボタン（右上に配置） */}
            <button
              onClick={() => handleDelete(article.id)}
              className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-gray-100 p-1 transition hover:bg-red-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 text-gray-400 hover:text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* 記事の内容 */}
            <div>
              <h2 className="mb-2 mr-2 text-xl font-semibold">
                {article.ogp?.ogTitle ?? "No Title"}
              </h2>
              {article.ogp?.ogImage && article.ogp?.ogImage.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.ogp?.ogImage[0]?.url}
                  alt={article.ogp?.ogImage[0]?.alt ?? "OGP Image"}
                  className="mb-2 h-auto w-48"
                />
              ) : (
                <div className="mb-2 flex h-32 w-48 items-center justify-center rounded-sm bg-gray-200 text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* リンクボタン */}
            <div className="flex items-center justify-between pt-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100 hover:shadow-sm"
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

              <a
                href={`/article/${article.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100 hover:shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                メモを追加
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto p-2">
        <Pagination {...props} />
      </div>
    </section>
  );
};
