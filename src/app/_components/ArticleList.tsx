"use client";
import { OgObject } from "open-graph-scraper/types";
import React, { useState } from "react";

export type ArticleList = {
  id: number;
  url: string;
  status: string;
  memo: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  ogp: OgObject | null;
};

type ArticleListProps = {
  articleList: ArticleList[];
};
export const ArticleList = ({ articleList }: ArticleListProps) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "すべて" },
    { key: "notRead", label: "読みたい" },
    { key: "reading", label: "進行中" },
    { key: "read", label: "読んだ" },
  ];

  return (
    <section>
      <div className="mb-6 flex flex-wrap gap-4">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`rounded-md px-4 py-2 font-semibold transition ${
              activeFilter === filter.key
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articleList
          .filter(
            (article) =>
              activeFilter === "all" || article.status === activeFilter,
          )
          .map((article) => (
            <div
              key={article.ogp?.alIosUrl}
              className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
            >
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
              <a
                href={article.ogp?.ogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          ))}
      </div>
    </section>
  );
};
