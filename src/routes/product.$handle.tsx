import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Loader2, ShoppingBag, Truck, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";

export const Route = createFileRoute("/product/$handle")({
  head: () => ({
    meta: [
      { title: "Détail de la plante | Maison Verte" },
      {
        name: "description",
        content:
          "Découvrez les détails de cette plante d'intérieur : tailles disponibles, prix et conseils d'entretien.",
      },
      { property: "og:title", content: "Détail de la plante | Maison Verte" },
      {
        property: "og:description",
        content: "Tailles, prix et conseils d'entretien pour cette plante d'intérieur.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  const variants = product?.node.variants.edges.map((edge) => edge.node) ?? [];
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const image = product?.node.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Ajouté au panier", {
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link
          to="/boutique"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à la boutique
        </Link>

        {isProductLoading ? (
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <Skeleton className="aspect-square w-full rounded-3xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-11 w-40" />
            </div>
          </div>
        ) : !product ? (
          <div className="py-24 text-center">
            <h1 className="font-display text-3xl">Plante introuvable</h1>
            <p className="mt-3 text-muted-foreground">
              Cette plante n'est plus disponible dans la boutique.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-secondary/50">
              {image && (
                <img
                  src={image.url}
                  alt={image.altText ?? product.node.title}
                  width={1024}
                  height={1024}
                  className="aspect-square w-full object-cover"
                />
              )}
            </div>

            <div>
              <h1 className="font-display text-4xl">{product.node.title}</h1>
              <p className="mt-4 font-display text-2xl">
                {selectedVariant
                  ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                  : formatPrice(
                      product.node.priceRange.minVariantPrice.amount,
                      product.node.priceRange.minVariantPrice.currencyCode,
                    )}
              </p>
              <p className="mt-5 text-muted-foreground">{product.node.description}</p>

              {variants.length > 1 && (
                <div className="mt-7">
                  <p className="text-sm font-medium">
                    {product.node.options[0]?.name ?? "Option"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          variant.id === selectedVariant?.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant}
                size="lg"
                className="mt-8 w-full sm:w-auto"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Ajouter au panier
                  </>
                )}
              </Button>

              <ul className="mt-8 space-y-3 border-t border-border/70 pt-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-accent" /> Expédition protégée sous 48h
                </li>
                <li className="flex items-center gap-3">
                  <Sun className="h-4 w-4 text-accent" /> Fiche d'entretien incluse
                </li>
              </ul>

              <div className="mt-10 rounded-2xl border border-dashed border-border p-6">
                <h2 className="font-display text-lg">Avis clients</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Aucun avis pour le moment.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
