import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, SlidersHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, products, type Product } from "@/data/products";

const PAGE_SIZE = 6;
const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function ProductTable({ onBuy }: { onBuy: (p: Product) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchC = category === "all" || p.category === category;
      return matchQ && matchC;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [query, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const reset = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  return (
    <section id="inventory" className="relative mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl sm:text-6xl">
            The <span className="text-gradient-neon">Arsenal</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            {filtered.length} products ready to ship.
          </p>
        </div>
      </div>

      {/* Sticky control bar */}
      <div className="glass sticky top-4 z-30 mb-4 flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => reset(setQuery)(e.target.value)}
            placeholder="Search by name or category…"
            className="h-11 border-border/60 bg-background/40 pl-9"
            aria-label="Search products"
          />
        </div>
        <Select value={category} onValueChange={reset(setCategory)}>
          <SelectTrigger className="h-11 w-full border-border/60 bg-background/40 sm:w-48">
            <SlidersHorizontal className="size-4 text-primary" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={reset(setSort)}>
          <SelectTrigger className="h-11 w-full border-border/60 bg-background/40 sm:w-44">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="low">Price: Low to High</SelectItem>
            <SelectItem value="high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="w-24 text-xs uppercase tracking-widest">Item</TableHead>
              <TableHead className="text-xs uppercase tracking-widest">Name</TableHead>
              <TableHead className="hidden text-xs uppercase tracking-widest sm:table-cell">
                Category
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-widest">
                Price
              </TableHead>
              <TableHead className="text-right text-xs uppercase tracking-widest">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group border-b border-border/50 transition-colors hover:bg-primary/5"
              >
                <TableCell className="py-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="size-14 rounded-lg border border-border/60 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    SKU {p.id} · {p.blurb}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant="outline"
                    className="border-primary/40 bg-primary/10 text-primary"
                  >
                    {p.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-display text-xl">
                  {money(p.price)}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="neon" size="sm" onClick={() => onBuy(p)}>
                    <ShoppingCart /> Buy Now
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-16 text-center text-muted-foreground">
                  No gear matches that search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {current} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="neonOutline"
            size="sm"
            disabled={current === 1}
            onClick={() => setPage(current - 1)}
          >
            Previous
          </Button>
          <Button
            variant="neonOutline"
            size="sm"
            disabled={current === totalPages}
            onClick={() => setPage(current + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
