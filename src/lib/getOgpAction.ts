"use server";
import ogs from "open-graph-scraper";
import { OgObject } from "open-graph-scraper/types";
import { z } from "zod";

const FormSchema = z.object({
  url: z.string(),
});

export async function getOgpAction(
  prevState: OgObject | null,
  formData: FormData,
) {
  const { url } = FormSchema.parse({
    url: formData.get("url"),
  });
  console.log(url);

  try {
    const { result } = await ogs({ url });
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error fetching OGP:", error);
    return null;
  }
}
