import { createFileRoute } from "@tanstack/react-router";
import { Sun, Droplets, Thermometer, Scissors } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/entretien")({
  head: () => ({
    meta: [
      { title: "Guide d'entretien des plantes d'intérieur | Maison Verte" },
      {
        name: "description",
        content:
          "Lumière, arrosage, température et rempotage : nos conseils simples pour garder vos plantes d'intérieur en pleine santé.",
      },
      { property: "og:title", content: "Guide d'entretien des plantes | Maison Verte" },
      {
        property: "og:description",
        content: "Nos conseils d'arrosage, lumière et rempotage pour des plantes en pleine santé.",
      },
    ],
  }),
  component: EntretienPage,
});

const tips = [
  {
    icon: Sun,
    title: "Lumière",
    text: "La plupart des plantes tropicales aiment une lumière vive mais indirecte. Évitez le soleil brûlant derrière une vitre au sud.",
  },
  {
    icon: Droplets,
    title: "Arrosage",
    text: "Arrosez quand les 2 premiers centimètres de terre sont secs. Mieux vaut un arrosage généreux occasionnel qu'un filet d'eau quotidien.",
  },
  {
    icon: Thermometer,
    title: "Température & humidité",
    text: "Entre 18 et 24 °C. Brumisez les feuilles des calathea et fougères, ou posez le pot sur un lit de billes d'argile humides.",
  },
  {
    icon: Scissors,
    title: "Rempotage & taille",
    text: "Rempotez tous les 18 à 24 mois dans un pot 2 cm plus large. Coupez les feuilles jaunies à la base pour relancer la croissance.",
  },
];

function EntretienPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <h1 className="font-display text-4xl">Guide d'entretien</h1>
        <p className="mt-3 text-muted-foreground">
          Quatre gestes suffisent pour garder une plante belle toute l'année.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {tips.map((tip) => (
            <div key={tip.title} className="rounded-2xl border border-border/70 bg-card p-6">
              <tip.icon className="h-5 w-5 text-accent" />
              <h2 className="mt-4 font-display text-xl">{tip.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{tip.text}</p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
