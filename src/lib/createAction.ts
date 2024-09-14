"use server";
import { z } from "zod";
import { api } from "@/trpc/server";
import { v4 as uuidv4 } from "uuid";

export type State = {
  message: string;
  error: boolean;
  key: string;
};
const FormSchema = z.object({
  url: z.string(),
  status: z.enum(["read", "reading", "notRead"]), // ステータスのバリデーション
  memo: z.string(),
});

export async function createAction(prevState: State, formData: FormData) {
  const { url, status, memo } = FormSchema.parse({
    url: formData.get("url"),
    status: formData.get("status"),
    memo: formData.get("memo"),
  });
  console.log(url, status, memo);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const uuid: string = uuidv4();

  try {
    await api.article.create({ url, status, memo });
    return {
      message: "保存に成功しました",
      error: false,
      // 成功時はkeyを更新することでクライアントサイドで更新を検知する
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      key: uuidv4(),
    };
  } catch (error) {
    console.error("Error fetching:", error);
    return {
      message: "保存に失敗しました",
      error: true,
      key: uuid,
    };
  }
}
