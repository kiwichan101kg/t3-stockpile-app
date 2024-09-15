"use server";
import { OgObject } from "open-graph-scraper/types";
import { z } from "zod";
import { getOgp } from "./getOgp";

const FormSchema = z.object({
  url: z.string(),
});

export async function ogpAction(
  prevState: OgObject | null,
  formData: FormData,
) {
  const { url } = FormSchema.parse({
    url: formData.get("url"),
  });

  try {
    const result = await getOgp(url);

    return result;
  } catch (error) {
    console.error("Error fetching OGP:", error);
    return null;
  }
}
