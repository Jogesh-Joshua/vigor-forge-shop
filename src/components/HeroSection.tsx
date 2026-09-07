import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Dumbbell, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroScene = lazy(() => import("./HeroScene"));

export function HeroSection({ onExplore }: { onExplore: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="grid-backdrop absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-accent/20 blur-[150px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-16 pt-24 lg:grid-cols-2 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Zap className="size-3.5" /> New 2026 Collection
          </span>

          <h1 className="mt-6 text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">
            Forge Your <span className="text-gradient-neon">Legacy</span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Competition-grade iron, machines, and fuel — engineered for people
            who never settle for the last rep.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button variant="neon" size="lg" className="h-12 px-8 text-base" onClick={onExplore}>
              Explore Gear <ArrowDown className="size-4" />
            </Button>
            <Button variant="neonOutline" size="lg" className="h-12 px-8 text-base" onClick={onExplore}>
              <Dumbbell className="size-4" /> View Inventory
            </Button>
          </div>

          <div className="mt-12 flex gap-10">
            {[
              { k: "180+", v: "Products" },
              { k: "48h", v: "Delivery" },
              { k: "10yr", v: "Warranty" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl text-foreground">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="relative h-[380px] w-full sm:h-[480px] lg:h-[620px]"
        >
          {mounted ? (
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
