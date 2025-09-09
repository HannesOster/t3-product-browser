import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-4xl font-bold">
        Willkommen zum Produkt-Browser
      </h1>
      <p className="mb-8 text-lg">
        Entdecken Sie unsere Sammlung erstaunlicher Produkte!
      </p>
      <Button asChild>
        <Link href="/products">Produkte</Link>
      </Button>
    </main>
  );
}
