import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding products...");
  const products = Array.from({ length: 200 }).map((_, i) => ({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
    category: faker.commerce.department(),
    quantityIncrement: faker.number.int({ min: 1, max: 10 }),
    imageUrl: `https://picsum.photos/id/${1 + i}/400/400`,
  }));

  await prisma.product.createMany({
    data: products,
  });

  console.log("✅ Seeding finished");
}
main()
  .catch((e) => console.error(e))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
