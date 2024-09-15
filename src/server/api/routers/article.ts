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
  getArticleById: protectedProcedure
    .input(
      z.object({
        id: z.string(), // idを文字列として入力（URL形式は不要）
      }),
    )
    .query(async ({ ctx, input }) => {
      const article = await ctx.db.article.findFirst({
        where: {
          id: input.id, // 入力として受け取ったidを検索条件に使用
          userId: ctx.session.user.id, // ログインユーザーのidと一致する記事を検索
        },
      });

      if (!article) {
        throw new Error("Article not found"); // 記事が見つからなかった場合のエラーハンドリング
      }

      return article;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(), // 更新対象の記事ID
        status: z.enum(["read", "reading", "notRead"]), // ステータスのバリデーション
        memo: z.string().optional(), // メモはオプション
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 認証されているか確認
      if (!ctx.session?.user?.id) {
        throw new Error("User not authenticated");
      }

      const article = await ctx.db.article.findUnique({
        where: { id: input.id },
      });

      if (!article) {
        throw new Error("Article not found");
      }

      if (article.userId !== ctx.session.user.id) {
        throw new Error("You do not have permission to update this article");
      }

      // IDに一致する記事を更新
      return ctx.db.article.update({
        where: {
          id: input.id, // 一致する記事のIDを検索
        },
        data: {
          status: input.status, // 新しいステータスをセット
          memo: input.memo ?? "", // メモが空の場合は空文字をセット
        },
      });
    }),
});
