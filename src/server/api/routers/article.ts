import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const articleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        url: z.string().url(), // URLの形式をチェック
        status: z.enum(["read", "reading", "notRead"]), // ステータスのバリデーション
        memo: z.string().optional(), // メモはオプション
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 認証されているか確認
      if (!ctx.session?.user?.id) {
        throw new Error("User not authenticated");
      }

      // 新しい記事を作成
      return ctx.db.article.create({
        data: {
          url: input.url,
          status: input.status,
          memo: input.memo,
          user: {
            connect: { id: ctx.session.user.id },
          },
        },
      });
    }),
  getAllArticle: protectedProcedure.query(async ({ ctx }) => {
    const articleList = await ctx.db.article.findMany({
      orderBy: { createdAt: "desc" },
      where: { user: { id: ctx.session.user.id } },
    });
    return articleList;
  }),
});
