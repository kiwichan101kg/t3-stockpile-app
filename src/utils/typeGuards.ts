/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { XPostObject } from "@/lib/getXpost";
import { YouTubeObject } from "@/lib/getYoutube";
import { OgObject } from "open-graph-scraper/types";

// 型ガード
export function isXPostObject(data: any): data is XPostObject {
  return (
    data && typeof data.url === "string" && typeof data.author_name === "string"
  );
}

// 型ガード
export function isOgObject(data: any): data is OgObject {
  return data && typeof data.ogTitle === "string";
}

// 型ガード
export function isYoutubeObject(data: any): data is YouTubeObject {
  return (
    data &&
    typeof data.html === "string" &&
    typeof data.author_name === "string"
  );
}
