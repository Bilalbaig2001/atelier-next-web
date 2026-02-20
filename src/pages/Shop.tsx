import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const allProducts = [
  { id: 1, name: "Oversized Zip Hoodie", price: 285, category: "Men", image: product1, tag: "New" },
  { id: 2, name: "Structured Blazer", price: 420, category: "Women", image: product2, tag: "New" },
  { id: 3, name: "Wide-Leg Trousers", price: 195, category: "Women", image: product3 },
  { id: 4, name: "Cashmere Knit", price: 310, category: "Men", image: product4, tag: "Sale" },
  { id: 5, name: "Minimal Overshirt", price: 230, category: "Men", image: product1 },
  { id: 6, name: "Column Dress", price: 380, category: "Women", image: product2, tag: "New Arrivals" },
  { id: 7, name: "Slim Cargo Pant", price: 175, category: "Men", image: product3, tag: "Sale" },
  { id: 8, name: "Ribbed Tank", price: 95, category: "Women", image: product4 },
];

const categories = ["All", "Men", "Women", "New Arrivals", "Sale"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (activeCategory !== "All") {
      result = result.filter((p) =>
        p.category === activeCategory || p.tag === activeCategory
      );
    }

    if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeCategory, sortBy]);

  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">All Products</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold">Shop</h1>
        </motion.div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
          {/* Category filters */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filter
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs tracking-widest uppercase font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-none border-none appearance-none pr-1"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <span className="text-xs text-muted-foreground hidden sm:block">
              {filtered.length} items
            </span>
          </div>
        </div>

        {/* Mobile filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setShowFilters(false); }}
                    className={`px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-foreground text-background"
                        : "border border-border text-muted-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 pb-24">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence>
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="product-card aspect-[3/4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-foreground text-background text-[9px] tracking-widest uppercase font-medium px-2.5 py-1 rounded-full">
                          {product.tag}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      <div className="btn-primary w-full text-[10px] py-2.5 text-center">
                        Quick View
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                      </div>
                      <p className="font-semibold text-sm">${product.price}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
