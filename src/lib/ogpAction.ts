"use server";
import { OgObject } from "open-graph-scraper/types";
import { z } from "zod";
import { getOgp } from "./getOgp";
import { getXPost, isXUrl, XPostObject } from "./getXpost";
import { getYouTube, isYouTubeUrl, YouTubeObject } from "./getYoutube";

const FormSchema = z.object({
  url: z.string(),
});

export async function ogpAction(
  prevState: OgObject | XPostObject | YouTubeObject | null,
  formData: FormData,
) {
  const { url } = FormSchema.parse({
    url: formData.get("url"),
  });

  // ツイート取得
  if (isXUrl(url)) {
    try {
      const result = await getXPost(url);
      return result;
    } catch (error) {
      console.error("Error fetching Twitter:", error);
      return null;
    }
  }

  // youtube情報取得
  if (isYouTubeUrl(url)) {
    try {
      const result = await getYouTube(url);
      return result;
    } catch (error) {
      console.error("Error fetching Youtube:", error);
      return null;
    }
  }

  // OGP取得
  try {
    const result = await getOgp(url);
    return result;
  } catch (error) {
    console.error("Error fetching OGP:", error);
    return null;
  }
}
