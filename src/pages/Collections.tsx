import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import collection1 from "@/assets/collection-1.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const collections = [
  {
    id: "ss26",
    season: "SS 2026",
    name: "Void",
    desc: "The art of nothing. A collection built on the philosophy that the space between things holds all meaning.",
    image: collection1,
    items: 24,
    featured: true,
  },
  {
    id: "aw25",
    season: "AW 2025",
    name: "Weight",
    desc: "Dense fabrics. Heavy silhouettes. The feeling of armor as comfort.",
    image: product1,
    items: 18,
  },
  {
    id: "resort25",
    season: "Resort 2025",
    name: "Drift",
    desc: "Movement, lightness, flow. Pieces that breathe and move like water.",
    image: product2,
    items: 15,
  },
];

const editorialItems = [
  { image: product1, label: "Oversized Zip Hoodie" },
  { image: product2, label: "Structured Blazer" },
  { image: product3, label: "Wide-Leg Trousers" },
  { image: product4, label: "Cashmere Knit" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Collections() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
        <FadeIn>
          <p className="section-label mb-3">Curated Capsules</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-none">Collections</h1>
        </FadeIn>
      </section>

      {/* Featured collection */}
      {collections.filter((c) => c.featured).map((col) => (
        <FadeIn key={col.id} className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="aspect-[16/9] md:aspect-[21/9]">
              <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16">
              <p className="section-label text-background/60 mb-2">{col.season}</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold text-background mb-4">
                {col.name}
              </h2>
              <p className="text-background/70 max-w-md mb-6 text-sm leading-relaxed">
                {col.desc}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-background text-foreground text-xs font-medium tracking-widest uppercase hover:bg-background/90 transition-colors group"
                >
                  Shop Collection
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-background/40 text-xs tracking-widest uppercase">{col.items} pieces</span>
              </div>
            </div>
          </div>
        </FadeIn>
      ))}

      {/* Editorial grid — current season items */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <FadeIn className="mb-10">
          <p className="section-label mb-2">SS 2026 — Selected Pieces</p>
          <h2 className="font-display text-3xl font-bold">From the Collection</h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {editorialItems.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <Link to="/shop" className="group block">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-gray-100">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-center">{item.label}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Past collections */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <FadeIn className="mb-12">
          <div className="w-full h-px bg-border mb-10" />
          <p className="section-label mb-2">Archive</p>
          <h2 className="font-display text-3xl font-bold">Past Collections</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.filter((c) => !c.featured).map((col, i) => (
            <FadeIn key={col.id} delay={i * 0.1}>
              <Link to="/shop" className="group block">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors duration-300" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-background/60 text-xs tracking-widest uppercase mb-1">{col.season}</p>
                    <h3 className="font-display text-2xl font-bold text-background">{col.name}</h3>
                    <p className="text-background/60 text-xs mt-1">{col.items} pieces</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
