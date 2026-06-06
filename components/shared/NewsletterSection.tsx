"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    // TODO: Connect to newsletter API
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section className="section-padding bg-cream-50 border-t border-cream-200">
      <div className="container-custom max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-14 h-14 bg-maroon-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Mail size={24} className="text-maroon-600" />
          </div>
          <h2 className="text-maroon-900 mb-3 text-2xl sm:text-3xl font-bold font-primary">
            Get Sweet <span className="text-gradient-gold">Offers</span> First
          </h2>
          <p className="text-cream-900 text-xs mb-8">
            Subscribe to our newsletter and be the first to know about festival specials, new
            sweets, and exclusive discounts.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold"
            >
              <Check size={18} /> You&apos;re subscribed! Welcome to the Archana Sweets family. 🎉
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3 rounded-full border border-cream-300 bg-white text-maroon-800 placeholder:text-cream-600 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="btn-gold flex items-center gap-2 whitespace-nowrap disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-maroon-800 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Subscribe <ArrowRight size={15} /></>
                )}
              </button>
            </form>
          )}

          <p className="text-cream-600 text-xs mt-4">
            🔒 No spam. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
