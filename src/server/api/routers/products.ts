import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

const prisma = new PrismaClient();

export const productsRouter = t.router({
  edit: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        categoryId: z.string().optional(),
        imageUrl: z.string().optional(),
        quantityIncrement: z.number().optional(),
        bestseller: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const product = await prisma.product.update({
        where: { id },
        data,
      });
      return product;
    }),
  getBestsellers: t.procedure.query(async () => {
    const items = await prisma.product.findMany({
      where: { bestseller: true },
      include: { category: true },
    });
    return items.map((item) => ({
      ...item,
      category: item.category?.name,
    }));
  }),
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
      if (category && category !== "none") {
        where.categoryId = category;
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
          include: { category: true },
        }),
        prisma.product.count({ where }),
      ]);

      return {
        items: items.map((item) => ({
          ...item,
          category: item.category?.name,
        })),
        page,
        pageCount: Math.ceil(total / pageSize),
        total,
      };
    }),

  getById: t.procedure.input(z.string()).query(async ({ input: id }) => {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new Error("Not found");
    }

    return {
      ...product,
      category: product.category?.name,
    };
  }),
  create: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        price: z.number().min(0),
        category: z.string().min(1), // categoryId
        imageUrl: z.string().url(),
        quantityIncrement: z.number().min(1).default(1),
      }),
    )
    .mutation(async ({ input }) => {
      const product = await prisma.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          categoryId: input.category,
          imageUrl: input.imageUrl,
          quantityIncrement: input.quantityIncrement,
        },
      });
      return product;
    }),
  // Get all categories
  getCategories: t.procedure.query(async () => {
    const categories = await prisma.category.findMany();
    return { categories };
  }),
  // Create category endpoint
  createCategory: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const category = await prisma.category.create({
        data: {
          name: input.name,
        },
      });
      return { category };
    }),
  delete: t.procedure.input(z.string()).mutation(async ({ input: id }) => {
    await prisma.product.delete({
      where: { id },
    });
    return { success: true };
  }),
});

export type AppRouter = typeof productsRouter;
