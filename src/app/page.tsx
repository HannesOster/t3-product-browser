import { BestsellerSlider } from "~/components/bestseller-slider";
import { HeroSection } from "~/components/hero-section";
import { NewsletterForm } from "~/components/newsletter-form";

export default function Home() {
  return (
    <main className="from-primary/10 via-background to-secondary/30 relative flex min-h-screen flex-col items-center justify-start gap-12 overflow-hidden bg-gradient-to-br p-0">
      <HeroSection />
      <BestsellerSlider />
      <NewsletterForm />
    </main>
  );
}
