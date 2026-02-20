import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import collection1 from "@/assets/collection-1.jpg";

const featuredProducts = [
  { id: 1, name: "Oversized Zip Hoodie", price: 285, category: "Men", image: product1, tag: "New" },
  { id: 2, name: "Structured Blazer", price: 420, category: "Women", image: product2, tag: "New" },
  { id: 3, name: "Wide-Leg Trousers", price: 195, category: "Women", image: product3 },
  { id: 4, name: "Cashmere Knit", price: 310, category: "Men", image: product4, tag: "Sale" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ product }: { product: typeof featuredProducts[0] }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="product-card aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.tag && (
          <div className="absolute top-4 left-4">
            <span className="bg-foreground text-background text-[9px] tracking-widest uppercase font-medium px-2.5 py-1 rounded-full">
              {product.tag}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
          <button className="btn-primary w-full text-[10px] py-2.5">
            Quick View
          </button>
        </div>
      </div>
      <div className="mt-4 px-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-sm">{product.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
          </div>
          <p className="font-semibold text-sm">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
      >
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="MNML Collection Hero"
            className="w-full h-full object-cover"
            priority-loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground/60" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-background/70 text-[10px] tracking-[0.4em] uppercase mb-6"
          >
            SS 2026 Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-bold text-background leading-none tracking-tight mb-6"
          >
            MNML
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-background/80 text-base md:text-lg font-light tracking-wide max-w-sm mx-auto mb-10"
          >
            Wear the silence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-background text-foreground text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-background/90 rounded-none gap-2 group"
            >
              Shop Now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-background text-background text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-background/10 rounded-none"
            >
              New Collection
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-background/50"
          />
          <p className="text-background/40 text-[9px] tracking-widest uppercase">Scroll</p>
        </motion.div>
      </section>

      {/* Ticker */}
      <div className="bg-foreground text-background py-3 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 whitespace-nowrap px-8">
              <span className="text-[10px] tracking-widest uppercase text-background/60">New Collection 2026</span>
              <span className="text-background/20">—</span>
              <span className="text-[10px] tracking-widest uppercase text-background/60">Free Shipping Over $150</span>
              <span className="text-background/20">—</span>
              <span className="text-[10px] tracking-widest uppercase text-background/60">Premium Fabrics</span>
              <span className="text-background/20">—</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-32">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">New Season</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Featured Pieces</h2>
          </div>
          <Link
            to="/shop"
            className="btn-ghost text-xs flex items-center gap-2 group w-fit"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 md:pb-32">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[280px]">
            <img
              src={collection1}
              alt="New Collection"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-foreground/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="section-label text-background/60 mb-3">SS 2026</p>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-background mb-6">
                The New Collection
              </h2>
              <Link to="/collections" className="btn-outline border-background text-background hover:bg-background hover:text-foreground text-xs px-8 py-3">
                Explore
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Brand Values */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Premium Materials", desc: "Sourced from the finest mills in Europe and Japan." },
              { title: "Minimal Design", desc: "Every piece stripped to its essential form and function." },
              { title: "Timeless Style", desc: "Beyond seasons. Built to last a decade, not a trend cycle." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1} className="text-center">
                <div className="luxury-divider" />
                <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
