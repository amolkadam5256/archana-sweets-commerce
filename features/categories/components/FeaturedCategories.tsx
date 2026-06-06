"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/constants";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturedCategories() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="badge badge-gold mb-3">Our Collection</span>
          <h2 className="text-maroon-900 mb-3 text-2xl sm:text-3xl font-bold font-primary">
            Premium Sweet{" "}
            <span className="text-gradient-gold">Categories</span>
          </h2>
          <p className="text-cream-900 text-xs max-w-2xl mx-auto">
            From classic Besan Laddus to exclusive Corporate Gift Hampers - every category crafted
            with the finest ingredients and a mother&apos;s love.
          </p>
          <hr className="divider-gold w-24 mx-auto mt-4" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Link href={`/categories/${cat.slug}`} className="group block">
                <div className="relative bg-cream-50 border border-cream-200 rounded-2xl p-6 text-center hover:border-gold-400 hover:bg-gold-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {cat.emoji}
                  </div>
                  <h3
                    className="text-maroon-800 font-semibold text-xs leading-tight group-hover:text-maroon-600 transition-colors"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {cat.name}
                  </h3>
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/categories" className="btn-outline group inline-flex">
            View All Categories
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
