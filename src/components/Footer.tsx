import { Link } from "react-router-dom";
import { Instagram, Twitter, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label text-background/50 mb-4">Stay in the loop</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-background mb-6">
              Exclusive Access
            </h2>
            <p className="text-background/60 mb-8 text-sm">
              Be the first to know about new collections, limited drops, and members-only offers.
            </p>
            {subscribed ? (
              <p className="text-background/70 font-medium">
                ✓ Thank you for subscribing.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-background/10 border border-background/20 rounded-lg px-4 py-3 text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-background/40 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-background text-foreground text-xs font-medium tracking-widest uppercase rounded-lg hover:bg-background/90 transition-colors flex items-center gap-2 group"
                >
                  Join
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-2xl font-bold text-background block mb-4">
              MNML
            </Link>
            <p className="text-sm text-background/50 leading-relaxed max-w-xs">
              Premium minimal fashion for those who appreciate the power of simplicity.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-background/50 hover:text-background transition-colors">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-background/50 hover:text-background transition-colors">
                <Twitter size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-background/40 mb-5">Shop</p>
            <ul className="space-y-3">
              {["New Arrivals", "Men", "Women", "Sale"].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-background/40 mb-5">Company</p>
            <ul className="space-y-3">
              {[
                { label: "About", to: "/about" },
                { label: "Collections", to: "/collections" },
                { label: "Contact", to: "/contact" },
                { label: "Careers", to: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-background/40 mb-5">Help</p>
            <ul className="space-y-3">
              {["Sizing Guide", "Shipping & Returns", "FAQ", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} MNML. All rights reserved.
          </p>
          <p className="text-xs text-background/30">
            Designed for those who wear silence.
          </p>
        </div>
      </div>
    </footer>
  );
}
