import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos de Maison Verte — pépinière en ligne" },
      {
        name: "description",
        content:
          "Maison Verte sélectionne des plantes d'intérieur cultivées localement et les livre en pot, avec une fiche d'entretien.",
      },
      { property: "og:title", content: "À propos de Maison Verte" },
      {
        property: "og:description",
        content: "Notre histoire : des plantes cultivées localement, livrées prêtes à poser.",
      },
    ],
  }),
  component: AProposPage,
});

function AProposPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="font-display text-4xl">À propos</h1>
        <div className="mt-6 space-y-5 text-muted-foreground">
          <p>
            Maison Verte est née d'une idée simple : une plante ne devrait pas être un pari. Nous
            travaillons avec des pépiniéristes qui cultivent lentement, en pleine lumière naturelle,
            pour obtenir des plantes robustes qui s'adaptent facilement à un intérieur.
          </p>
          <p>
            Chaque commande est préparée à la main. La plante est arrosée, calée dans son pot puis
            emballée dans un carton conçu pour protéger le feuillage pendant le transport.
          </p>
          <p>
            Nous glissons dans chaque colis une fiche d'entretien propre à l'espèce : fréquence
            d'arrosage, exposition idéale et signes à surveiller. Et si une question reste, notre
            équipe répond par e-mail sous 24 heures.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
