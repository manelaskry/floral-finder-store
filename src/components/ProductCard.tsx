import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const variants = product.node.variants.edges.map((edge) => edge.node);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const image = product.node.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow hover:shadow-lg">
      <Link
        to="/product/$handle"
        params={{ handle: product.node.handle }}
        className="block overflow-hidden bg-secondary/60"
      >
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.node.title}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="aspect-square w-full" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to="/product/$handle" params={{ handle: product.node.handle }}>
          <h3 className="font-display text-lg leading-tight">{product.node.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {product.node.description}
        </p>

        {variants.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariantId(variant.id)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  variant.id === selectedVariant?.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {variant.title}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="font-display text-lg">
            {selectedVariant
              ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
              : formatPrice(
                  product.node.priceRange.minVariantPrice.amount,
                  product.node.priceRange.minVariantPrice.currencyCode,
                )}
          </span>
          <Button onClick={handleAddToCart} disabled={isLoading || !selectedVariant} size="sm">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Ajouter
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
