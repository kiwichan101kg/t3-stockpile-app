import { getOgps } from "@/lib/getOgp";
import React from "react";

export const ArticleList = async () => {
  const urlArr = [
    "https://zenn.dev/kiwichan101kg/articles/e8273a4ada7458",
    "https://zenn.dev/kiwichan101kg/articles/1d79197bf4eb4a",
    "https://zenn.dev/kiwichan101kg/articles/2f39ff1fb57009",
  ];

  const ogps = await getOgps(urlArr);
  console.log(ogps);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {ogps.map((ogp) => (
        <div
          key={ogp.alIosUrl}
          className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
        >
          <h2 className="mb-2 text-xl font-semibold">
            {ogp?.ogTitle ?? "No Title"}
          </h2>
          <p className="mb-2 text-gray-600">{ogp?.ogDescription ?? ""}</p>
          {ogp?.ogImage && ogp?.ogImage.length > 0 && (
            <img
              src={ogp?.ogImage[0]?.url}
              alt={ogp?.ogImage[0]?.alt ?? "OGP Image"}
              className="mb-2 h-auto w-48"
            />
          )}
          <a
            href={ogp?.ogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};
