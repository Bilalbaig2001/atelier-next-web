import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products: Record<string, {
  id: number; name: string; price: number; category: string;
  images: string[]; sizes: string[]; description: string;
  fabric: string; care: string; tag?: string;
}> = {
  "1": {
    id: 1, name: "Oversized Zip Hoodie", price: 285, category: "Men",
    images: [product1, product2, product3],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "An architectural take on the classic hoodie. Cut generously through the body with a precisely tapered silhouette at the hem. The full-length metal zip and internal adjustable drawcord define its refined utilitarian character.",
    fabric: "80% organic cotton, 20% recycled polyester. 380 GSM heavyweight.",
    care: "Machine wash cold, gentle cycle. Tumble dry low. Do not bleach. Iron on low heat.",
    tag: "New",
  },
  "2": {
    id: 2, name: "Structured Blazer", price: 420, category: "Women",
    images: [product2, product1, product4],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A masterclass in tailoring. Constructed with a double-canvas chest and hand-stitched lapels that hold their shape impeccably. The single-button closure and clean shoulder line communicate effortless authority.",
    fabric: "100% Italian virgin wool. Fully lined in Bemberg cupro.",
    care: "Dry clean only. Store hanging. Use a natural-bristle brush after each wear.",
    tag: "New",
  },
  "3": {
    id: 3, name: "Wide-Leg Trousers", price: 195, category: "Women",
    images: [product3, product4, product1],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Floor-grazing wide-leg trousers with an ultra-high rise and a sharp front crease. Cut from a fluid heavy-drape fabric that moves architecturally with each step.",
    fabric: "55% recycled polyester, 45% viscose. Unlined.",
    care: "Dry clean recommended. Gentle machine wash on wool cycle.",
  },
  "4": {
    id: 4, name: "Cashmere Knit", price: 310, category: "Men",
    images: [product4, product3, product2],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Knitted from grade-A Mongolian cashmere in a relaxed drop-shoulder silhouette. The mock neck and ribbed cuffs add structured detail to an otherwise pure expression of comfort.",
    fabric: "100% grade-A Mongolian cashmere. 12-gauge knit.",
    care: "Hand wash cold with cashmere shampoo. Lay flat to dry. Do not tumble dry.",
    tag: "Sale",
  },
};

const relatedIds = ["1", "2", "3", "4"];

export default function ProductDetail() {
  const { id = "1" } = useParams();
  const product = products[id] || products["1"];
  const { addItem, openCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = relatedIds.filter((rid) => rid !== id).slice(0, 3);

  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/shop" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <ArrowLeft size={12} />
            Back to Shop
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product layout */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-brand-gray-100">
              <AnimatedImage src={product.images[selectedImage]} alt={product.name} />
              {product.tag && (
                <div className="absolute top-5 left-5">
                  <span className="bg-foreground text-background text-[9px] tracking-widest uppercase font-medium px-3 py-1.5 rounded-full">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-2xl overflow-hidden bg-brand-gray-100 transition-all duration-200 ${
                    selectedImage === i ? "ring-2 ring-foreground" : "opacity-60 hover:opacity-90"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="mb-2">
              <p className="section-label mb-3">{product.category}</p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
            </div>

            <div className="w-full h-px bg-border my-6" />

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-medium tracking-widest uppercase">
                  Size {selectedSize && <span className="text-muted-foreground">— {selectedSize}</span>}
                </p>
                <button className="text-xs text-muted-foreground hover:text-foreground underline transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`w-12 h-12 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-foreground text-background"
                        : "border border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-xs mt-2"
                >
                  Please select a size
                </motion.p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-xs font-medium tracking-widest uppercase mb-3">Quantity</p>
              <div className="flex items-center border border-border rounded-xl w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted rounded-l-xl transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="px-6 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted rounded-r-xl transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.98 }}
              className={`btn-primary w-full py-4 text-sm tracking-widest gap-2 group mb-3 ${
                added ? "bg-brand-gray-600" : ""
              }`}
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
              {!added && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </motion.button>

            <button className="btn-outline w-full py-4 text-sm tracking-widest">
              Save to Wishlist
            </button>

            <div className="w-full h-px bg-border my-8" />

            {/* Fabric & Care */}
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium mb-1.5">Fabric & Composition</p>
                <p className="text-muted-foreground leading-relaxed">{product.fabric}</p>
              </div>
              <div>
                <p className="font-medium mb-1.5">Care Instructions</p>
                <p className="text-muted-foreground leading-relaxed">{product.care}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-24 md:mt-32">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">You May Also Like</p>
              <h2 className="font-display text-3xl font-bold">Related Pieces</h2>
            </div>
            <Link to="/shop" className="btn-ghost text-xs flex items-center gap-2 group">
              View All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((rid, i) => {
              const p = products[rid];
              if (!p) return null;
              return (
                <motion.div
                  key={rid}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/product/${rid}`} className="group block">
                    <div className="product-card aspect-[3/4]">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3 px-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="font-semibold text-sm">${p.price}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function AnimatedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.img
      key={src}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
    />
  );
}
