import { jsPDF } from "jspdf";
import type { Product } from "@/data/products";

export type Order = {
  orderId: string;
  date: string;
  product: Product;
  quantity: number;
  subtotal: number;
  tax: number;
  total: number;
};

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function downloadInvoice(order: Order) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();

  // Header band
  doc.setFillColor(16, 18, 22);
  doc.rect(0, 0, W, 110, "F");
  doc.setFillColor(61, 255, 122);
  doc.rect(0, 108, W, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("IRONFORGE", 48, 58);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(160, 170, 180);
  doc.text("Premium Gym & Fitness Equipment", 48, 76);
  doc.setTextColor(61, 255, 122);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("INVOICE", W - 48, 58, { align: "right" });

  // Meta
  doc.setTextColor(40, 44, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Order ID: ${order.orderId}`, 48, 150);
  doc.text(`Date: ${order.date}`, 48, 168);
  doc.text("Billed to: Guest Customer", W - 48, 150, { align: "right" });
  doc.text("support@ironforge.store", W - 48, 168, { align: "right" });

  // Table head
  doc.setFillColor(240, 242, 245);
  doc.rect(48, 200, W - 96, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("ITEM", 60, 218);
  doc.text("CATEGORY", 300, 218);
  doc.text("QTY", 410, 218);
  doc.text("AMOUNT", W - 60, 218, { align: "right" });

  // Row
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(order.product.name.slice(0, 34), 60, 250);
  doc.text(order.product.category, 300, 250);
  doc.text(String(order.quantity), 410, 250);
  doc.text(money(order.subtotal), W - 60, 250, { align: "right" });

  doc.setDrawColor(220, 224, 230);
  doc.line(48, 268, W - 48, 268);

  // Totals
  let y = 296;
  const line = (label: string, value: string, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 13 : 11);
    doc.text(label, W - 220, y);
    doc.text(value, W - 60, y, { align: "right" });
    y += bold ? 26 : 20;
  };
  line("Subtotal", money(order.subtotal));
  line("Tax (8%)", money(order.tax));
  line("Shipping", "Free");
  doc.setDrawColor(200, 205, 212);
  doc.line(W - 240, y - 12, W - 48, y - 12);
  y += 8;
  line("Total Paid", money(order.total), true);

  // Footer
  doc.setFillColor(16, 18, 22);
  doc.rect(0, 760, W, 82, "F");
  doc.setTextColor(200, 208, 216);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Thank you for training with IRONFORGE.", 48, 794);
  doc.text(
    "This is a demo receipt. No payment was processed.",
    48,
    812,
  );

  doc.save(`ironforge-invoice-${order.orderId}.pdf`);
}
