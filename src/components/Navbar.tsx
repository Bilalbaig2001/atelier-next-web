import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? "bg-transparent"
            : "bg-background/95 backdrop-blur-md border-b border-border"
        }`}
        style={{
          boxShadow: isTransparent ? "none" : "var(--shadow-sm)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className={`font-display text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                isTransparent ? "text-background" : "text-foreground"
              }`}
            >
              MNML
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link transition-colors duration-300 ${
                    isTransparent
                      ? "text-background/80 hover:text-background after:bg-background"
                      : ""
                  } ${location.pathname === link.href ? "text-foreground" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={openCart}
                className={`relative p-2 transition-colors duration-200 ${
                  isTransparent
                    ? "text-background hover:text-background/70"
                    : "text-foreground hover:text-muted-foreground"
                }`}
                aria-label="Open cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[9px] font-bold rounded-full flex items-center justify-center"
                    style={{
                      background: isTransparent ? "hsl(var(--background))" : "hsl(var(--foreground))",
                      color: isTransparent ? "hsl(var(--foreground))" : "hsl(var(--background))",
                    }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2 transition-colors duration-200 ${
                  isTransparent
                    ? "text-background hover:text-background/70"
                    : "text-foreground hover:text-muted-foreground"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-background border-t border-border overflow-hidden"
            >
              <nav className="px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={link.href}
                      className="font-display text-2xl font-bold text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
