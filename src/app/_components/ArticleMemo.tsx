"use client";
import React from "react";
import { ArticleWithOgp } from "./ArticleList";
import { formatDate } from "@/lib/formatDate";
import { useFormState } from "react-dom";
import { updateAction } from "@/lib/updateAction";

type ArticleMemoProps = {
  article: ArticleWithOgp;
};
const ArticleMemo = ({ article }: ArticleMemoProps) => {
  const [state, updateActionState] = useFormState(updateAction, {
    message: "",
    error: false,
  });
  return (
    <form action={updateActionState}>
      {/* メモ部分 */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <input name="id" type="hidden" value={article?.id ?? ""} />

        {/* ステータス更新のプルダウン */}
        <div className="mt-2">
          <select
            id="status"
            name="status"
            className="mb-4 w-1/4 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition duration-200 ease-in-out hover:shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={article.status}
          >
            <option value="notRead">読みたい</option>
            <option value="reading">進行中</option>
            <option value="read">読んだ</option>
          </select>
        </div>

        <textarea
          id="memo"
          name="memo"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="メモを入力"
          defaultValue={article?.memo ?? ""}
          rows={6}
        />

        {/* 更新日表示 */}
        <div className="mt-4 text-right text-sm text-gray-500">
          最終更新日:{" "}
          <span className="font-semibold">{formatDate(article.updatedAt)}</span>
        </div>
      </div>

      {/* 更新ボタン */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-blue-400 px-6 py-3 text-white shadow-lg transition duration-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          更新
        </button>
      </div>
    </form>
  );
};

export default ArticleMemo;
