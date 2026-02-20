import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Mail, MapPin, ArrowRight } from "lucide-react";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
        <FadeIn>
          <p className="section-label mb-3">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold">Contact</h1>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Info */}
          <FadeIn>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-sm">
              We read every message personally. For order inquiries, please include your order number. We typically respond within 24–48 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <Mail size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium mb-1">Email</p>
                  <a href="mailto:hello@mnml.co" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    hello@mnml.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium mb-1">Studio</p>
                  <p className="text-sm text-muted-foreground">
                    12 Rue du Temple<br />
                    75004 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <Instagram size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium mb-1">Social</p>
                  <div className="flex gap-4">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">@mnml.co</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-brand-gray-100">
              <p className="text-xs tracking-widest uppercase font-medium mb-3">Opening Hours</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday — Friday</span>
                  <span>9:00 — 18:00 CET</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 — 16:00 CET</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right — Form */}
          <FadeIn delay={0.15}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-24"
              >
                <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mb-6">
                  <span className="text-background text-2xl">✓</span>
                </div>
                <h2 className="font-display text-2xl font-bold mb-3">Message Sent</h2>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thank you for reaching out. We'll get back to you within 24–48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-widest uppercase font-medium block mb-2">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder="Your name"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase font-medium block mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      placeholder="your@email.com"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase font-medium block mb-2">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-foreground transition-colors text-foreground"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Inquiry</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="sizing">Sizing Help</option>
                    <option value="press">Press & Partnerships</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase font-medium block mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full py-4 gap-2 group disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
