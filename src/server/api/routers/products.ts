import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

const prisma = new PrismaClient();

export const productsRouter = t.router({
  getList: t.procedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        sort: z.enum(["price-asc", "price-desc"]).optional(),
        page: z.number().default(1),
        pageSize: z.number().default(12),
      }),
    )
    .query(async ({ input }) => {
      const { search, category, sort, page, pageSize } = input;
      const where: PrismaClient["product"]["findMany"]["arguments"]["where"] =
        {};
      if (search) {
        where.name = { contains: search, mode: "insensitive" };
      }
      if (category) {
        where.category = category;
      }

      // Sortierung
      let orderBy: { price?: "asc" | "desc" } | undefined = undefined;
      if (sort === "price-asc") orderBy = { price: "asc" };
      if (sort === "price-desc") orderBy = { price: "desc" };

      // Pagination
      const skip = (page - 1) * pageSize;

      const [items, total] = await Promise.all([
        prisma.product.findMany({
          where,
          orderBy,
          skip,
          take: pageSize,
        }),
        prisma.product.count({ where }),
      ]);

      return {
        items,
        page,
        pageCount: Math.ceil(total / pageSize),
        total,
      };
    }),

  get: t.procedure.input(z.string()).query(async ({ input: id }) => {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Not found");
    }

    return product;
  }),
});

export type AppRouter = typeof productsRouter;
