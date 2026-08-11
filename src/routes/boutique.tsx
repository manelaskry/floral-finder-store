import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — Toutes nos plantes d'intérieur | Maison Verte" },
      {
        name: "description",
        content:
          "Parcourez toutes nos plantes d'intérieur : monstera, ficus lyrata, sansevieria, pilea, calathea et succulentes. Ajout au panier et paiement sécurisé.",
      },
      { property: "og:title", content: "Boutique — Toutes nos plantes | Maison Verte" },
      {
        property: "og:description",
        content: "La collection complète de plantes d'intérieur Maison Verte, livrées en pot.",
      },
    ],
  }),
  component: BoutiquePage,
});

function BoutiquePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <h1 className="font-display text-4xl">La boutique</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Toutes nos plantes sont livrées en pot, prêtes à être posées. Choisissez la taille qui
          convient à votre espace.
        </p>
        <div className="mt-10">
          <ProductGrid limit={24} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
