"use client";
import Link from "next/link";
import { OgObject } from "open-graph-scraper/types";
import React, { useState } from "react";

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
  const [activeTabr, setActiveTab] = useState("all");

  const tabs = [
    { key: "all", label: "すべて" },
    { key: "notRead", label: "読みたい" },
    { key: "reading", label: "進行中" },
    { key: "read", label: "読んだ" },
  ];

  return (
    <section>
      <div className="mb-6 w-full">
        <div className="flex justify-center space-x-8 border-b-2 border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
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

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {articleList
          .filter(
            (article) => activeTabr === "all" || article.status === activeTabr,
          )
          .map((article) => (
            <div
              key={article.id}
              className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <div>
                <h2 className="mb-2 text-xl font-semibold">
                  {article.ogp?.ogTitle ?? "No Title"}
                </h2>
                {article.ogp?.ogImage && article.ogp?.ogImage.length > 0 && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.ogp?.ogImage[0]?.url}
                    alt={article.ogp?.ogImage[0]?.alt ?? "OGP Image"}
                    className="mb-2 h-auto w-48"
                  />
                )}
              </div>

              <div className="flex items-center justify-between pt-4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100 hover:shadow-sm"
                >
                  {/* アイコンの追加 */}
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
                  {/* アイコンの追加 */}
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
    </section>
  );
};
