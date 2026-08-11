import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — un conseil plante personnalisé | Maison Verte" },
      {
        name: "description",
        content:
          "Une question sur une plante, une commande ou un conseil d'entretien ? Écrivez-nous, nous répondons sous 24 heures.",
      },
      { property: "og:title", content: "Contact | Maison Verte" },
      {
        property: "og:description",
        content: "Écrivez-nous pour un conseil plante ou une question sur votre commande.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto grid max-w-5xl gap-12 px-5 py-14 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl">Contact</h1>
          <p className="mt-3 text-muted-foreground">
            Décrivez-nous votre pièce (luminosité, taille, animaux) et nous vous proposerons la
            plante idéale.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" /> bonjour@maisonverte.shop
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent" /> Serre &amp; atelier — Tunis
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-accent" /> Réponse sous 24 h, du lundi au vendredi
            </li>
          </ul>
        </div>

        <form
          className="rounded-2xl border border-border/70 bg-card p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
            toast.success("Message envoyé", {
              description: "Nous vous répondons sous 24 heures.",
              position: "top-center",
            });
          }}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input id="name" name="name" required className="mt-2" placeholder="Votre nom" />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2"
                placeholder="vous@exemple.com"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2"
                placeholder="Ma pièce est orientée nord, quelle plante me conseillez-vous ?"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Envoyer le message
            </Button>
            {sent && (
              <p className="text-sm text-muted-foreground">
                Merci, votre message est bien noté. À très vite !
              </p>
            )}
          </div>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
