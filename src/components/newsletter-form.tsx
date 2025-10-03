"use client";
import { useState } from "react";
import { Button } from "./ui/button";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section className="z-10 w-full max-w-xl px-4 py-8">
      <div className="bg-card flex flex-col items-center rounded-lg border p-6 shadow">
        <h2 className="mb-2 text-center text-xl font-bold">
          Verpasse keine Angebote!
        </h2>
        <p className="text-muted-foreground mb-4 text-center">
          Abonniere unseren Newsletter und erhalte exklusive Rabatte und
          Produkt-Tipps direkt in dein Postfach.
        </p>
        {submitted ? (
          <div className="font-semibold text-green-600">
            Danke für deine Anmeldung!
          </div>
        ) : (
          <form
            className="flex w-full max-w-md flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Deine E-Mail-Adresse"
              className="focus:ring-primary rounded border px-4 py-2 text-base shadow focus:ring-2 focus:outline-none"
            />
            <Button type="submit" size="lg" className="w-full">
              Newsletter abonnieren
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
