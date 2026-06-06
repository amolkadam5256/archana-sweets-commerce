"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Gift, Leaf, MessageCircle, PackageCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { getWhatsAppLink } from "@/utils";
import { BRAND } from "@/constants";

export function HeroSection() {
  const whatsappLink = getWhatsAppLink(
    BRAND.whatsapp,
    "Hi Archana Sweets! I'd love to order some sweets."
  );

  const trustSignals = [
    { icon: Leaf, text: "100% Pure Ghee" },
    { icon: Truck, text: "Free Delivery INR 499+" },
    { icon: PackageCheck, text: "Fresh Daily" },
    { icon: Star, text: "10,000+ Happy Customers" },
  ];

  const orbitItems = [
    { mark: "BL", label: "Besan Laddu", angle: 0 },
    { mark: "DF", label: "Dry Fruit", angle: 72 },
    { mark: "CL", label: "Coconut", angle: 144 },
    { mark: "BF", label: "Barfi", angle: 216 },
    { mark: "GB", label: "Gift Box", angle: 288 },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-warm">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="badge badge-gold">
                <Star size={10} fill="currentColor" className="mr-1" />
                Pune&apos;s #1 Homemade Sweets
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-maroon-900 mb-4 leading-tight text-2xl md:text-3xl lg:text-4xl font-bold font-primary"
            >
              Crafted with{" "}
              <span className="text-gradient-gold">Mother&apos;s</span>
              <br />
              <span className="text-gradient-maroon">Pure Love</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-cream-900 text-xs leading-relaxed mb-8 max-w-lg"
            >
              Authentic homemade Indian sweets made fresh daily. Pure ingredients, timeless recipes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8 text-sm"
            >
              {trustSignals.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-1.5 text-maroon-700 font-medium"
                >
                  <item.icon size={15} className="text-gold-600" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/shop" className="btn-primary group">
                <ShoppingBag size={16} />
                Shop Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-maroon-600 bg-white text-maroon-700 hover:bg-maroon-600 hover:text-white font-semibold transition-all"
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-[460px] h-[460px] mx-auto">
              <div
                className="absolute inset-0 rounded-full border-2 border-gold-300 opacity-70"
                style={{ animation: "spin 20s linear infinite" }}
              />
              <div className="absolute inset-8 rounded-full border border-maroon-100 bg-white shadow-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-maroon-600 text-white">
                    <Gift size={42} />
                  </div>
                  <div className="text-gradient-maroon font-primary font-bold text-2xl">
                    Archana Sweets
                  </div>
                  <div className="text-gold-600 text-sm mt-1 tracking-widest uppercase">
                    Made With Love
                  </div>
                </div>
              </div>
              {orbitItems.map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const r = 190;
                const x = 230 + r * Math.cos(rad);
                const y = 230 + r * Math.sin(rad);
                return (
                  <motion.div
                    key={item.label}
                    className="absolute glass rounded-xl px-3 py-2 text-xs font-semibold text-maroon-800 flex items-center gap-1.5 shadow-md"
                    style={{ left: x - 48, top: y - 20 }}
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-[10px] text-black">
                      {item.mark}
                    </span>
                    <span>{item.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L48 50C96 40 192 20 288 18.3C384 16.7 480 33.3 576 38.3C672 43.3 768 36.7 864 30C960 23.3 1056 16.7 1152 18.3C1248 20 1344 30 1392 35L1440 40V60H0Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
