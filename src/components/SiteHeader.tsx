import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/boutique", label: "Boutique" },
  { to: "/entretien", label: "Entretien" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-xl tracking-tight">Maison Verte</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-foreground" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartDrawer />
        </div>
      </div>
      <nav className="flex items-center gap-5 overflow-x-auto border-t border-border/70 px-5 py-2 md:hidden">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeProps={{ className: "text-foreground" }}
            className="text-sm whitespace-nowrap text-muted-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
