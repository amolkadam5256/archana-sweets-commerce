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
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-cream-200 hover:border-gold-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${reason.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon size={22} className={reason.color} />
              </div>
              <h3
                className="text-maroon-800 font-bold mb-2 text-lg"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {reason.title}
              </h3>
              <p className="text-cream-900 text-xs leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "50+", label: "Sweet Varieties" },
            { value: "5★", label: "Average Rating" },
            { value: "3+", label: "Years of Love" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-cream-50 rounded-2xl border border-cream-200">
              <div className="text-gradient-gold font-primary font-bold text-3xl mb-1">
                {stat.value}
              </div>
              <div className="text-maroon-700 text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
