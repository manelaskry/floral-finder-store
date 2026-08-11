import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="font-display text-lg">Maison Verte</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Des plantes d'intérieur cultivées avec soin, livrées en pot et prêtes à embellir votre
            maison.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Navigation</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/boutique" className="hover:text-foreground">
                Boutique
              </Link>
            </li>
            <li>
              <Link to="/entretien" className="hover:text-foreground">
                Guide d'entretien
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="hover:text-foreground">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Livraison</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Expédition soignée sous 48h, emballage protecteur et garantie plante saine à l'arrivée.
          </p>
        </div>
      </div>
      <div className="border-t border-border/70 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Maison Verte — Paiement sécurisé via Shopify
      </div>
    </footer>
  );
}
