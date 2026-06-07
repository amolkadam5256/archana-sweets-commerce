"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarClock, Gift, Heart, Palette, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const FESTIVALS = [
  {
    name: "Diwali Special",
    desc: "Premium mithai boxes for the festival of lights",
    icon: Star,
    href: "/festival-specials/diwali",
    date: "2026-11-08T00:00:00+05:30",
    products: ["Kaju Barfi", "Dry Fruit Laddu", "Festival Gift Box"],
  },
  {
    name: "Ganesh Chaturthi",
    desc: "Fresh Modak & special prasad boxes",
    icon: Heart,
    href: "/festival-specials/ganesh-chaturthi",
    date: "2026-09-14T00:00:00+05:30",
    products: ["Steamed Modak", "Coconut Laddu", "Prasad Box"],
  },
  {
    name: "Raksha Bandhan",
    desc: "Sweet hampers to celebrate sibling love",
    icon: Gift,
    href: "/festival-specials/raksha-bandhan",
    date: "2026-08-28T00:00:00+05:30",
    products: ["Rakhi Hamper", "Kaju Sweets", "Family Gift Box"],
  },
  {
    name: "Holi Celebration",
    desc: "Colorful sweet assortments for Holi",
    icon: Palette,
    href: "/festival-specials/holi",
    date: "2027-03-22T00:00:00+05:30",
    products: ["Gujiya", "Thandai Mix", "Assorted Mithai"],
  },
];

function getTimeLeft(targetDate: string) {
  const difference = new Date(targetDate).getTime() - Date.now();
  const total = Math.max(difference, 0);

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function FestivalSection() {
  const nextFestival = useMemo(
    () => [...FESTIVALS].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0],
    []
  );
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(nextFestival.date));

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft(nextFestival.date)), 1000);
    return () => window.clearInterval(interval);
  }, [nextFestival.date]);

  return (
    <section className="section-padding bg-gradient-maroon text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge badge-gold mb-3">Limited Edition</span>
            <h2 className="text-cream-100 mb-3">
              Festival <span className="text-gradient-gold">Specials</span>
            </h2>
            <p className="text-cream-400 max-w-2xl">
              Celebrate every occasion with exclusive festival collections. Pre-book 3 days in advance for guaranteed fresh delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-dark rounded-2xl border border-gold-400/30 p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-gold-400/15 text-gold-300 flex items-center justify-center">
                <CalendarClock size={22} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-300 font-bold">Next Festival</p>
                <h3 className="text-xl text-white font-primary">{nextFestival.name}</h3>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                ["Days", timeLeft.days],
                ["Hours", timeLeft.hours],
                ["Min", timeLeft.minutes],
                ["Sec", timeLeft.seconds],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-white/10 border border-white/10 p-3 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-gold-300 tabular-nums">{String(value).padStart(2, "0")}</div>
                  <div className="text-[10px] uppercase tracking-widest text-cream-300 font-bold mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FESTIVALS.map((festival, i) => (
            <motion.div
              key={festival.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={festival.href} className="group block">
                <div className="glass-dark rounded-2xl p-6 text-center hover:border-gold-500 transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold-500 text-gold-300 group-hover:scale-110 transition-transform duration-300">
                    <festival.icon size={26} />
                  </div>
                  <h3 className="text-gold-300 font-bold mb-2" style={{ fontFamily: "var(--font-primary)" }}>
                    {festival.name}
                  </h3>
                  <p className="text-cream-400 text-sm mb-4">{festival.desc}</p>
                  <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                    {festival.products.map((product) => (
                      <span key={product} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-cream-100">
                        {product}
                      </span>
                    ))}
                  </div>
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
