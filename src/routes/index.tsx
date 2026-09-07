import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Dumbbell } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ProductTable } from "@/components/ProductTable";
import { CheckoutSheet } from "@/components/CheckoutSheet";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IRONFORGE — Premium Gym & Fitness Equipment Store" },
      {
        name: "description",
        content:
          "Shop competition-grade barbells, kettlebells, machines, apparel and supplements. Fast checkout with instant PDF invoices.",
      },
      { property: "og:title", content: "IRONFORGE — Premium Gym & Fitness Equipment" },
      {
        property: "og:description",
        content:
          "Competition-grade iron, machines and fuel. Browse the arsenal and check out in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const buy = (p: Product) => {
    setProduct(p);
    setOpen(true);
  };

  const scrollToInventory = () =>
    document.getElementById("inventory")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen bg-background">
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="glass mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3">
          <div className="flex items-center gap-2">
            <Dumbbell className="size-5 text-primary" />
            <span className="font-display text-2xl tracking-wider">IRONFORGE</span>
          </div>
          <nav className="hidden gap-8 text-sm text-muted-foreground sm:flex">
            <button className="transition-colors hover:text-primary" onClick={scrollToInventory}>
              Shop
            </button>
            <span className="cursor-default">Training</span>
            <span className="cursor-default">Support</span>
          </nav>
        </div>
      </header>

      <HeroSection onExplore={scrollToInventory} />
      <ProductTable onBuy={buy} />

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto max-w-7xl px-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} IRONFORGE. Demo storefront — no real payments processed.
        </div>
      </footer>

      <CheckoutSheet product={product} open={open} onOpenChange={setOpen} />
    </main>
  );
}
