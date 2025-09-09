import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const productRouter = t.router({
  product: t.router({
    list: t.procedure
      .input(
        z.object({
          search: z.string().optional(),
          category: z.string().optional(),
          sort: z.string().optional(),
          page: z.number().default(1),
          pageSize: z.number().default(12),
        }),
      )
      .query(() => {
        return { items: [], page: 1, pageCount: 0, total: 0 };
      }),
    get: t.procedure.input(z.string()).query(() => {
      throw new Error("Not found");
    }),
  }),
});

export type AppRouter = typeof productRouter;
