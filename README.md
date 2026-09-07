# Apex Forge

Build a modern, high-energy gym and fitness equipment e-commerce store. Use React, Tailwind CSS, shadcn/ui components, and framer-motion for UI animations.

**1. UI/UX & Theme (Global)**

* Implement a sleek, premium dark mode aesthetic with high-contrast neon accents (like electric blue or vibrant green) to give it an energetic, modern vibe. 

* Ensure responsive design with smooth hover states, glassmorphism effects on cards, and clean, bold typography.

**2. Hero Section (3D Interactive)**

* Create an immersive hero section utilizing `react-three-fiber` or `spline`. 

* Include a dynamic, floating 3D object (like a textured kettlebell, dumbbell, or abstract geometric weight) that rotates slowly and slightly follows the user's cursor movement.

* Overlay strong, energetic headline text (e.g., "Forge Your Legacy") with a glowing primary "Explore Gear" call-to-action button.

**3. Searchable Product Data Table**

* Below the hero, build a rich, stylized data table to act as the main inventory display.

* Columns should include: Product Thumbnail, Item Name, Category (e.g., Free Weights, Machines, Apparel, Supplements), Price, and an Actions column.

* Add a sticky control bar above the table containing:

  - A real-time global search input (filtering by name or category).

  - Select dropdowns to filter by Category and sort by Price (Low/High).

* Ensure the table has pagination or smooth infinite scrolling.

**4. "Buy Now" & Checkout Flow**

* In the Actions column of every table row, include an eye-catching "Buy Now" button.

* Clicking "Buy Now" should trigger a smooth slide-out sheet (sidebar) or a modal acting as a quick checkout/cart screen.

* The cart should display the selected item, subtotal, tax calculation, and a "Complete Purchase" button.

**5. Downloadable Invoice PDFs**

* Upon clicking "Complete Purchase", transition the modal to an "Order Success" state.

* Include a prominent "Download Invoice (PDF)" button. 

* Integrate a client-side library (like `html2pdf.js` or `jspdf`) so that clicking the button generates and downloads a cleanly formatted PDF receipt containing a mock Order ID, the store's branding, the purchased item details, and the total amount.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://vigor-forge-shop.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/968741e2-1eda-4157-8aa5-447999adcd3c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
