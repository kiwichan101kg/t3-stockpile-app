"use client";
import { createAction } from "@/lib/createAction";
import { ogpAction } from "@/lib/ogpAction";
import { useRouter } from "next/navigation";
import { OgObject } from "open-graph-scraper/types";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export const UrlBox = () => {
  const [ogpState, ogpActionState] = useFormState(ogpAction, null);
  const [state, createActionState] = useFormState(createAction, {
    message: "",
    error: false,
    key: "",
  });
  const [url, setUrl] = useState("");
  const [ogp, setOgp] = useState<OgObject | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log(state);
    setUrl("");
    setOgp(null);
    router.refresh();
  }, [state.key]);

  useEffect(() => {
    if (ogpState) {
      setOgp(ogpState);
    }
  }, [ogpState]);

  return (
    <section>
      <form
        action={ogpActionState}
        className="mb-6 flex flex-col items-start gap-4 md:flex-row"
      >
        <div className="relative mb-4 w-full max-w-md md:mb-0">
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
        <form
          action={createActionState}
          className="mb-6 max-w-md rounded-lg bg-white p-4 shadow-md"
        >
          <h2 className="mb-2 text-xl font-semibold">
            {ogp?.ogTitle ?? "No Title"}
          </h2>

          <input type="hidden" name="url" value={ogp?.ogUrl ?? ""} />

          <div className="mb-4 flex">
            {ogp?.ogImage && ogp?.ogImage.length > 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ogp?.ogImage[0]?.url}
                alt={ogp?.ogImage[0]?.alt ?? "OGP Image"}
                className="mb-2 h-auto w-48"
              />
            )}
          </div>

          <div className="mb-4">
            <select
              name="status"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="read" // 初期値を設定（例: 読みたい）
            >
              <option value="read">読みたい</option>
              <option value="reading">進行中</option>
              <option value="notRead">読んだ</option>
            </select>
          </div>

          <div className="mb-4">
            <textarea
              name="memo"
              placeholder="メモを入力"
              className="h-24 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            保存
          </button>
        </form>
      )}
    </section>
  );
};
