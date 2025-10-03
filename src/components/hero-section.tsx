import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <Image
          src="/hero.jpg"
          alt="Hero Produkte"
          width={1200}
          height={600}
          className="object-cover opacity-90 blur-lg"
          priority
        />
      </div>
      <h1 className="from-primary to-secondary mb-4 bg-gradient-to-r bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow-lg md:text-6xl">
        Willkommen zum Produkt-Browser
      </h1>
      <p className="text-muted-foreground mb-8 text-lg md:text-xl">
        Entdecke die besten Produkte aus allen Kategorien – schnell, einfach und
        inspirierend.
      </p>
      <Button
        size="lg"
        className="animate-bounce px-8 py-4 text-lg shadow-xl"
        asChild
      >
        <Link href="/products">Jetzt stöbern</Link>
      </Button>
    </section>
  );
}
