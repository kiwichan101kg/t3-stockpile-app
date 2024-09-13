"use client";
import { ogpAction } from "@/lib/ogpAction";
import React from "react";
import { useFormState } from "react-dom";

export const UrlBox = () => {
  const [ogp, formAction] = useFormState(ogpAction, null);
  console.log("OGP", ogp);

  return (
    <section>
      <form
        action={formAction}
        className="mb-6 flex flex-col items-start gap-4 md:flex-row"
      >
        <div className="relative mb-4 w-full max-w-md md:mb-0">
          <input
            type="text"
            name="url"
            placeholder="URLを入力"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          追加
        </button>
      </form>

      {ogp && (
        <div className="mb-6 max-w-md rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">
            {ogp?.ogTitle ?? "No Title"}
          </h2>

          <div className="mb-4 flex">
            {ogp?.ogImage && ogp?.ogImage.length > 0 && (
              <img
                src={ogp?.ogImage[0]?.url}
                alt={ogp?.ogImage[0]?.alt ?? "OGP Image"}
                className="mb-2 h-auto w-48"
              />
            )}
          </div>

          <div className="mb-4">
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="読みたい" // 初期値を設定（例: 読みたい）
            >
              <option value="読みたい">読みたい</option>
              <option value="読んだ">読んだ</option>
            </select>
          </div>

          <div className="mb-4">
            <textarea
              placeholder="メモを入力"
              className="h-24 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
            保存
          </button>
        </div>
      )}
    </section>
  );
};
