import kettlebell from "@/assets/kettlebell.jpg";
import barbell from "@/assets/barbell.jpg";
import dumbbell from "@/assets/dumbbell.jpg";
import machine from "@/assets/machine.jpg";
import apparel from "@/assets/apparel.jpg";
import supplement from "@/assets/supplement.jpg";

export type Category = "Free Weights" | "Machines" | "Apparel" | "Supplements";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  "Free Weights",
  "Machines",
  "Apparel",
  "Supplements",
];

export const products: Product[] = [
  { id: "FW-101", name: "Forge Cast Kettlebell 24kg", category: "Free Weights", price: 129, image: kettlebell, blurb: "Powder-coated cast iron, wide handle." },
  { id: "FW-102", name: "Apex Olympic Barbell 20kg", category: "Free Weights", price: 349, image: barbell, blurb: "Hard chrome shaft, 1500lb rating." },
  { id: "FW-103", name: "Hex Rubber Dumbbell Pair 15kg", category: "Free Weights", price: 189, image: dumbbell, blurb: "Anti-roll hex heads, knurled grip." },
  { id: "FW-104", name: "Competition Kettlebell 16kg", category: "Free Weights", price: 99, image: kettlebell, blurb: "Steel comp spec, uniform dimensions." },
  { id: "FW-105", name: "Bumper Plate Set 100kg", category: "Free Weights", price: 579, image: barbell, blurb: "Virgin rubber, low bounce." },
  { id: "MC-201", name: "Titan Cable Crossover Station", category: "Machines", price: 2499, image: machine, blurb: "Dual 90kg stacks, commercial frame." },
  { id: "MC-202", name: "Vertex Functional Trainer", category: "Machines", price: 1899, image: machine, blurb: "Adjustable pulleys, 20 positions." },
  { id: "MC-203", name: "Incline Press Machine", category: "Machines", price: 1499, image: machine, blurb: "Converging arms, sealed bearings." },
  { id: "AP-301", name: "Nightshift Training Hoodie", category: "Apparel", price: 89, image: apparel, blurb: "Brushed fleece, reflective trim." },
  { id: "AP-302", name: "Velocity Lifting Tee", category: "Apparel", price: 45, image: apparel, blurb: "Moisture-wicking performance knit." },
  { id: "SP-401", name: "Forge Whey Isolate 2kg", category: "Supplements", price: 74, image: supplement, blurb: "27g protein, zero filler." },
  { id: "SP-402", name: "Surge Pre-Workout 400g", category: "Supplements", price: 49, image: supplement, blurb: "Citrulline + caffeine matrix." },
  { id: "SP-403", name: "Creatine Monohydrate 500g", category: "Supplements", price: 35, image: supplement, blurb: "Micronized, unflavored." },
  { id: "AP-303", name: "Grip Lock Lifting Straps", category: "Apparel", price: 29, image: apparel, blurb: "Reinforced cotton, neoprene pad." },
  { id: "FW-106", name: "Adjustable Dumbbell 32kg", category: "Free Weights", price: 429, image: dumbbell, blurb: "Dial-select from 5 to 32kg." },
  { id: "MC-204", name: "Rogue Rack Power Cage", category: "Machines", price: 1299, image: machine, blurb: "11-gauge steel, westside spacing." },
];

export const TAX_RATE = 0.08;
