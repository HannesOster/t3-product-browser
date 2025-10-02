import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding categories...");
  const categoryNames = ["Elektronik", "Haushalt", "Sport", "Bücher"];
  // Delete old data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const categoriesRaw = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    categoryNames.map((name) => prisma.category.create({ data: { name } })),
  );
  // Sanitize category objects (only id and name)
  const categories = categoriesRaw.map((cat) => ({
    id: cat.id,
    name: cat.name,
  }));

  if (categories.length > 0) {
    console.log("🌱 Seeding products...");
    const products = Array.from({ length: 200 }).map((_, i) => {
      const selectedCategory =
        categories[Math.floor(Math.random() * categories.length)] ??
        categories[0];
      // Ensure categoryId is always a string
      const categoryId = selectedCategory ? selectedCategory.id : "";
      return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
        categoryId,
        quantityIncrement: faker.number.int({ min: 1, max: 10 }),
        imageUrl: `https://picsum.photos/id/${1 + i}/400/400`,
      };
    });
    await prisma.product.createMany({
      data: products,
    });
  } else {
    console.warn("⚠️ No categories found, no products seeded.");
  }

  console.log("✅ Seeding finished");
}
main()
  .catch((e) => console.error(e))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
