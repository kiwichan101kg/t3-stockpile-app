"use client";
import { createAction } from "@/lib/createAction";
import { ogpAction } from "@/lib/ogpAction";
import { useRouter } from "next/navigation";
import { OgObject } from "open-graph-scraper/types";
import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { LoadingOverlay } from "./LoadingOverlay";

export const UrlBox = () => {
  const [ogpState, ogpActionState] = useFormState(ogpAction, null);
  const [state, createActionState] = useFormState(createAction, {
    message: "",
    error: false,
    key: "",
  });
  const [url, setUrl] = useState("");
  const [ogp, setOgp] = useState<OgObject | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setUrl("");
    setOgp(null);
    router.refresh();
  }, [state.key]);

  useEffect(() => {
    if (ogpState) {
      setOgp(ogpState);
    }
  }, [ogpState]);

  const handleInputUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (newUrl === "") {
      setOgp(null);
    }
  };

  const hundleSubmitUrl = (formData: FormData) => {
    startTransition(() => {
      ogpActionState(formData);
    });
  };

  const hundleSubmitSave = (formData: FormData) => {
    startTransition(() => {
      createActionState(formData);
    });
  };

  return (
    <section>
      <form
        action={hundleSubmitUrl}
        className="relative mb-6 flex w-full max-w-md items-center"
      >
        {/* 入力フィールド */}
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleInputUrl}
          placeholder="URLを入力"
          className="w-full rounded-full border border-gray-300 bg-white px-6 py-3 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* ボタン */}
        <button
          type="submit"
          className={`absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full ${
            !url || isPending
              ? "text-white disabled:bg-gray-300 disabled:hover:bg-gray-300"
              : "bg-blue-400 text-white transition duration-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
          disabled={!url || isPending} // urlがない場合に非活性にする
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </form>

      {ogp && (
        <form
          action={hundleSubmitSave}
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
            >
              <option value="notRead">読みたい</option>
              <option value="reading">進行中</option>
              <option value="read">読んだ</option>
            </select>
          </div>

          <div className="mb-4">
            <textarea
              name="memo"
              placeholder="メモを入力"
              className="h-24 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-white shadow-lg transition duration-300 ${
                isPending
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
              disabled={isPending}
            >
              {isPending ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      )}

      {isPending && <LoadingOverlay />}
    </section>
  );
};
