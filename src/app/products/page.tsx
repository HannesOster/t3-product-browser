import { ProductList } from "~/components/product-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <ProductList />
    </main>
  );
}
