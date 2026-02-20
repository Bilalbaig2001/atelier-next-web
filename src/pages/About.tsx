import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

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

export default function About() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
        <FadeIn>
          <p className="section-label mb-3">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-none">
            Built on Silence.
          </h1>
        </FadeIn>
      </section>

      {/* Hero image */}
      <FadeIn className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
          <img
            src={aboutHero}
            alt="MNML Brand Story"
            className="w-full h-full object-cover"
          />
        </div>
      </FadeIn>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <FadeIn>
            <p className="section-label mb-6">The Beginning</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Born from a rejection of noise.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MNML was founded in 2019 by a small collective of designers who believed the fashion industry had lost its way—drowning in logos, excess, and seasonal noise designed to drive consumption rather than meaning.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We set out to build something different. Garments that don't announce themselves. Pieces that grow with you. Clothing that exists in harmony with the person wearing it, rather than competing with them for attention.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="section-label mb-6">The Philosophy</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Less, but better.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every MNML piece begins with a single question: what can we remove? We strip a garment to its functional essence, then rebuild it with the finest materials we can source. The result is clothing that appears effortless because it is.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We work with mills in Italy, Japan, and Portugal who share our obsession with material quality. Our production runs are small. Our relationships with makers are long-term and transparent.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pull quote */}
      <FadeIn className="bg-foreground py-20 md:py-28 mb-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-background leading-snug">
            "We don't make fashion. We make the absence of it—and in that space, something true appears."
          </p>
          <p className="text-background/40 text-sm mt-6 tracking-widest uppercase">— Founders, MNML</p>
        </div>
      </FadeIn>

      {/* Values grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <FadeIn className="mb-12">
          <p className="section-label mb-2">What We Stand For</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Our Values</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              number: "01",
              title: "Radical Honesty",
              desc: "No hidden polyester, no inflated markups, no seasonal tricks. We publish our cost of goods and our markup. What you see is what it is.",
            },
            {
              number: "02",
              title: "Material Truth",
              desc: "Every fabric is certified. We use only GOTS-certified organic cotton, recycled fibres, and responsibly sourced natural materials from mills we visit personally.",
            },
            {
              number: "03",
              title: "Slow Fashion",
              desc: "We release four small drops per year, maximum. We never oversell. Unsold items are held, reworked, or donated—never discounted into meaninglessness.",
            },
            {
              number: "04",
              title: "Human Making",
              desc: "Every garment is made by artisans earning living wages in certified facilities. We publish the name of every factory we work with.",
            },
            {
              number: "05",
              title: "Durability First",
              desc: "We design for a 10-year life. Stress seams, reinforced stitching, pre-shrunk natural fibres. We offer free repairs for the life of every garment.",
            },
            {
              number: "06",
              title: "Carbon Transparency",
              desc: "We measure and publish the carbon footprint of every collection, and we offset 200% of our emissions through verified reforestation programs.",
            },
          ].map((item, i) => (
            <FadeIn key={item.number} delay={i * 0.07}>
              <div className="border-t border-border pt-6">
                <p className="font-display text-4xl font-bold text-muted/60 mb-4">{item.number}</p>
                <h3 className="font-semibold text-base mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Image pair */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <FadeIn>
            <div className="rounded-3xl overflow-hidden aspect-[3/4]">
              <img src={product3} alt="MNML atelier" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-3xl overflow-hidden aspect-[3/4] mt-10">
              <img src={product4} alt="MNML materials" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
