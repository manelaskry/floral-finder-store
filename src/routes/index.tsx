import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Truck, Sprout, HeartHandshake } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";
import heroImage from "@/assets/hero-plants.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Verte — Boutique de plantes d'intérieur en ligne" },
      {
        name: "description",
        content:
          "Achetez des plantes d'intérieur cultivées avec soin : monstera, ficus, calathea, cactus. Livraison soignée et paiement sécurisé.",
      },
      { property: "og:title", content: "Maison Verte — Boutique de plantes d'intérieur" },
      {
        property: "og:description",
        content:
          "Monstera, ficus, calathea, succulentes : des plantes livrées en pot, prêtes à embellir votre maison.",
      },
    ],
  }),
  component: Index,
});

const perks = [
  { icon: Sprout, title: "Plantes sélectionnées", text: "Cultivées par des pépiniéristes locaux." },
  { icon: Truck, title: "Livraison protégée", text: "Emballage anti-choc, expédition sous 48h." },
  { icon: HeartHandshake, title: "Conseils inclus", text: "Une fiche d'entretien avec chaque plante." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="bg-leaf-gradient">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/70 px-3 py-1 text-xs tracking-wide text-primary uppercase">
                <Leaf className="h-3 w-3" /> Pépinière en ligne
              </span>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] text-balance-pretty md:text-6xl">
                Des plantes qui font respirer votre intérieur
              </h1>
              <p className="mt-5 max-w-md text-muted-foreground">
                Monstera, ficus lyrata, calathea ou succulentes : choisissez votre plante, ajoutez-la
                au panier et payez en quelques secondes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/boutique"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Découvrir la boutique
                </Link>
                <Link
                  to="/entretien"
                  className="inline-flex items-center justify-center rounded-full border border-primary/30 px-7 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  Guide d'entretien
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border/70 shadow-xl">
              <img
                src={heroImage}
                alt="Intérieur lumineux rempli de plantes vertes en pots terracotta"
                width={1920}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-6 md:grid-cols-3">
            {perks.map((perk) => (
              <div key={perk.title} className="rounded-2xl border border-border/70 bg-card p-6">
                <perk.icon className="h-5 w-5 text-accent" />
                <h2 className="mt-4 font-display text-lg">{perk.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{perk.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl">Nos plantes du moment</h2>
              <p className="mt-2 text-muted-foreground">
                Une sélection prête à partir, en stock dans notre serre.
              </p>
            </div>
          </div>
          <ProductGrid limit={6} />
        </section>

        <section className="mx-auto mt-16 max-w-6xl px-5">
          <div className="rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground">
            <h2 className="font-display text-3xl">Pas sûr de votre choix ?</h2>
            <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
              Dites-nous la luminosité de votre pièce et votre temps disponible : nous vous
              conseillons la plante idéale.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-background px-7 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Demander un conseil
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
