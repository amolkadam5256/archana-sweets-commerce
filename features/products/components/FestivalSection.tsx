"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Gift, Heart, Palette, Star } from "lucide-react";

export function FestivalSection() {
  const festivals = [
    { name: "Diwali Special", desc: "Premium mithai boxes for the festival of lights", icon: Star, href: "/festival-specials/diwali" },
    { name: "Ganesh Chaturthi", desc: "Fresh Modak & special prasad boxes", icon: Heart, href: "/festival-specials/ganesh-chaturthi" },
    { name: "Raksha Bandhan", desc: "Sweet hampers to celebrate sibling love", icon: Gift, href: "/festival-specials/raksha-bandhan" },
    { name: "Holi Celebration", desc: "Colorful sweet assortments for Holi", icon: Palette, href: "/festival-specials/holi" },
  ];

  return (
    <section className="section-padding bg-gradient-maroon text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge badge-gold mb-3">Limited Edition</span>
          <h2 className="text-cream-100 mb-3">
            Festival <span className="text-gradient-gold">Specials</span>
          </h2>
          <p className="text-cream-400 max-w-2xl mx-auto">
            Celebrate every occasion with our exclusive festival collections. Pre-book 3 days in advance for guaranteed fresh delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {festivals.map((festival, i) => (
            <motion.div
              key={festival.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={festival.href} className="group block">
                <div className="glass-dark rounded-2xl p-6 text-center hover:border-gold-500 transition-all duration-300 hover:-translate-y-2">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold-500 text-gold-300 group-hover:scale-110 transition-transform duration-300">
                    <festival.icon size={26} />
                  </div>
                  <h3 className="text-gold-300 font-bold mb-2" style={{ fontFamily: "var(--font-primary)" }}>
                    {festival.name}
                  </h3>
                  <p className="text-cream-400 text-sm mb-4">{festival.desc}</p>
                  <span className="text-gold-400 text-xs font-semibold flex items-center justify-center gap-1 group-hover:text-gold-200 transition-colors">
                    Shop Now <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
