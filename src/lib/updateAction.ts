"use server";
import { z } from "zod";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  message: string;
  error: boolean;
};
const FormSchema = z.object({
  id: z.string(),
  status: z.enum(["read", "reading", "notRead"]), // ステータスのバリデーション
  memo: z.string(),
});

export async function updateAction(prevState: State, formData: FormData) {
  const { id, status, memo } = FormSchema.parse({
    id: formData.get("id"),
    status: formData.get("status"),
    memo: formData.get("memo"),
  });
  console.log(id, status, memo);

  try {
    await api.article.update({ id, status, memo });
    revalidatePath("/");
  } catch (error) {
    console.error("Error fetching:", error);
    return {
      message: "保存に失敗しました",
      error: true,
    };
  }
  redirect("/");
}
