"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Check, Gift, MessageCircle, Package, Star } from "lucide-react";
import { BRAND } from "@/constants";
import { getWhatsAppLink } from "@/utils";

const BENEFITS = [
  "Bulk order discounts up to 30%",
  "Custom branding & packaging",
  "Minimum order 5kg",
  "Doorstep delivery across Pune",
  "Invoice & GST billing",
  "Dedicated account manager",
];

export function CorporateSection() {
  const whatsappLink = getWhatsAppLink(
    BRAND.whatsapp,
    "Hi! I'm interested in corporate gift orders from Archana Sweets. Please share details."
  );

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-gold mb-4">Corporate Orders</span>
            <h2 className="text-maroon-900 mb-4">
              Premium Corporate{" "}
              <span className="text-gradient-gold">Gift Hampers</span>
            </h2>
            <p className="text-cream-900 mb-6 leading-relaxed">
              Make your corporate gifting memorable. Our premium sweet hampers are perfect for
              Diwali gifts, client appreciation, employee rewards, and brand events. Custom branding
              available for orders above 50 boxes.
            </p>

            {/* Benefits list */}
            <ul className="space-y-3 mb-8">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-maroon-700">
                  <span className="flex-shrink-0 w-5 h-5 bg-gold-100 rounded-full flex items-center justify-center">
                    <Check size={11} className="text-gold-700" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/corporate-gifts" className="btn-primary group inline-flex">
                <Building2 size={16} /> Explore Hampers
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-2 border-green-500 text-green-700 font-semibold hover:bg-green-50 transition-all text-sm"
            >
                <MessageCircle size={16} /> Get a Quote on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right — Stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Building2, value: "500+", label: "Corporate Clients" },
              { icon: Gift, value: "50K+", label: "Hampers Delivered" },
              { icon: Star, value: "4.9/5", label: "Client Rating" },
              { icon: Package, value: "5kg+", label: "Min. Bulk Order" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border border-cream-200 shadow-sm hover:shadow-md hover:border-gold-300 transition-all duration-300"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                  <stat.icon size={22} />
                </div>
                <div className="text-gradient-gold font-primary font-bold text-2xl">{stat.value}</div>
                <div className="text-maroon-700 text-xs mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
