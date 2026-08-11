import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProducts } from "@/lib/shopify";

export function productsQueryOptions(limit = 24) {
  return {
    queryKey: ["shopify-products", limit],
    queryFn: () => fetchProducts(limit),
  };
}

export function ProductGrid({ limit = 24 }: { limit?: number }) {
  const { data, isLoading, isError } = useQuery(productsQueryOptions(limit));

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Impossible de charger les plantes pour le moment. Réessayez dans un instant.
      </p>
    );
  }

  const products = data ?? [];

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center">
        <p className="font-display text-xl">No products found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Aucune plante n'est encore en ligne dans la boutique.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.node.id} product={product} />
        ))}
      </div>
      {limit < 24 && (
        <div className="mt-10 text-center">
          <Link
            to="/boutique"
            className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Voir toute la collection
          </Link>
        </div>
      )}
    </>
  );
}
