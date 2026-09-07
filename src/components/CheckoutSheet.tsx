import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Download, Minus, Plus, ShieldCheck } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TAX_RATE, type Product } from "@/data/products";
import { downloadInvoice, type Order } from "@/lib/invoice";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function CheckoutSheet({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [qty, setQty] = useState(1);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (open) {
      setQty(1);
      setOrder(null);
    }
  }, [open, product?.id]);

  if (!product) return null;

  const subtotal = product.price * qty;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const complete = () => {
    setOrder({
      orderId: `IF-${Math.floor(100000 + Math.random() * 899999)}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      product,
      quantity: qty,
      subtotal,
      tax,
      total,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="glass w-full border-l border-border/60 sm:max-w-md"
      >
        <AnimatePresence mode="wait">
          {!order ? (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="flex h-full flex-col"
            >
              <SheetHeader>
                <SheetTitle className="font-display text-3xl">Quick Checkout</SheetTitle>
                <SheetDescription>Review your item and complete the order.</SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex gap-4 rounded-xl border border-border/60 bg-card/60 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="size-20 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{product.name}</p>
                  <p className="text-xs uppercase tracking-widest text-primary">
                    {product.category}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{product.blurb}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <div className="flex items-center gap-3 rounded-lg border border-border/60 p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus />
                  </Button>
                  <span className="w-6 text-center font-semibold">{qty}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                    aria-label="Increase quantity"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tax (8%)</dt>
                  <dd>{money(tax)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="text-primary">Free</dd>
                </div>
                <Separator className="my-3" />
                <div className="flex items-baseline justify-between">
                  <dt className="font-display text-xl">Total</dt>
                  <dd className="font-display text-2xl text-primary">{money(total)}</dd>
                </div>
              </dl>

              <div className="mt-auto pt-8">
                <Button variant="neon" className="h-12 w-full text-base" onClick={complete}>
                  Complete Purchase
                </Button>
                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5" /> Demo store — no real payment is taken.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
                className="flex size-20 items-center justify-center rounded-full bg-primary/15 glow-primary"
              >
                <CheckCircle2 className="size-10 text-primary" />
              </motion.div>

              <h2 className="mt-6 font-display text-4xl">Order Confirmed</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Order <span className="text-foreground">{order.orderId}</span> · {order.date}
              </p>

              <div className="mt-8 w-full rounded-xl border border-border/60 bg-card/60 p-5 text-left">
                <p className="font-semibold">{order.product.name}</p>
                <p className="text-xs uppercase tracking-widest text-primary">
                  {order.product.category} · Qty {order.quantity}
                </p>
                <Separator className="my-4" />
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Total paid</span>
                  <span className="font-display text-2xl text-primary">
                    {money(order.total)}
                  </span>
                </div>
              </div>

              <div className="mt-8 w-full space-y-3">
                <Button
                  variant="neon"
                  className="h-12 w-full text-base"
                  onClick={() => downloadInvoice(order)}
                >
                  <Download className="size-4" /> Download Invoice (PDF)
                </Button>
                <Button
                  variant="neonOutline"
                  className="h-11 w-full"
                  onClick={() => onOpenChange(false)}
                >
                  Keep Shopping
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
