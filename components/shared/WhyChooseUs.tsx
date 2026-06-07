"use client";

import { motion } from "framer-motion";
import { Leaf, Clock, Shield, Truck, Award, HeartHandshake } from "lucide-react";

const REASONS = [
  {
    icon: Leaf,
    title: "100% Pure Ghee",
    description: "We use only the finest pure desi ghee and organic ingredients. No artificial flavors, no preservatives — just pure goodness.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Clock,
    title: "Made Fresh Daily",
    description: "Every sweet is prepared fresh in small batches each morning. We never store stale stock — your order is always freshly made.",
    color: "text-gold-600",
    bg: "bg-gold-50",
  },
  {
    icon: HeartHandshake,
    title: "Made With Love",
    description: "Every recipe carries the warmth of a mother's kitchen. We pour heart and soul into each sweet, making every bite special.",
    color: "text-maroon-600",
    bg: "bg-maroon-50",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Not happy? We offer a 100% satisfaction guarantee. If your order doesn't meet expectations, we'll make it right.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Truck,
    title: "Hygienic Packaging",
    description: "Our sweets are packed in airtight, food-safe containers to preserve freshness and ensure safe delivery to your doorstep.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Award,
    title: "10,000+ Happy Families",
    description: "Trusted by families across Pune for festivals, weddings, and everyday celebrations. Our reputation speaks for itself.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge badge-gold mb-3">Our Promise</span>
          <h2 className="text-maroon-900 mb-3 text-2xl sm:text-3xl font-bold font-primary">
            Why Families Choose{" "}
            <span className="text-gradient-maroon">Archana Sweets</span>
          </h2>
          <p className="text-cream-900 text-xs max-w-2xl mx-auto">
            We don&apos;t just make sweets — we create memories. Every bite carries the authenticity
            of traditional recipes passed down through generations.
          </p>
          <hr className="divider-gold w-24 mx-auto mt-4" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className="group p-6 rounded-2xl bg-white border border-cream-100 hover:border-gold-300 shadow-sm hover:shadow-xl transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cream-50 to-white rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <motion.div 
                className={`w-14 h-14 ${reason.bg} rounded-xl flex items-center justify-center mb-5 relative z-10`}
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <reason.icon size={26} className={reason.color} strokeWidth={1.5} />
              </motion.div>
              <h3
                className="text-maroon-900 font-bold mb-2 text-lg relative z-10"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {reason.title}
              </h3>
              <p className="text-maroon-700/70 text-[13px] leading-relaxed relative z-10">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "50+", label: "Sweet Varieties" },
            { value: "5★", label: "Average Rating" },
            { value: "3+", label: "Years of Love" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gradient-to-b from-white to-cream-50 rounded-2xl border border-cream-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                viewport={{ once: true }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700 font-primary font-bold text-3xl sm:text-4xl mb-1 drop-shadow-sm"
              >
                {stat.value}
              </motion.div>
              <div className="text-maroon-800 text-[11px] font-bold tracking-wider uppercase opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
