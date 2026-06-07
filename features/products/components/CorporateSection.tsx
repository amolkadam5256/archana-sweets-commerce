"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Gift,
  Mail,
  MessageCircle,
  Package,
  Phone,
  Send,
  Star,
  User,
} from "lucide-react";
import { BRAND } from "@/constants";
import { getWhatsAppLink } from "@/utils";
import { useState } from "react";
import toast from "react-hot-toast";

const BENEFITS = [
  "Bulk order discounts up to 30%",
  "Custom branding & packaging",
  "Minimum order 5kg",
  "Doorstep delivery across Pune",
  "Invoice & GST billing",
  "Dedicated account manager",
];

const STATS = [
  { icon: Building2, value: "500+", label: "Corporate Clients" },
  { icon: Gift, value: "50K+", label: "Hampers Delivered" },
  { icon: Star, value: "4.9/5", label: "Client Rating" },
  { icon: Package, value: "5kg+", label: "Min. Bulk Order" },
];

const INITIAL_FORM = {
  name: "",
  company: "",
  mobile: "",
  email: "",
  quantity: "",
  budget: "",
};

export function CorporateSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappLink = getWhatsAppLink(
    BRAND.whatsapp,
    "Hi! I'm interested in corporate gift orders from Archana Sweets. Please share details."
  );

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/corporate-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || "Unable to submit inquiry");
      }

      toast.success("Inquiry sent. We will contact you shortly.");
      setForm(INITIAL_FORM);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit inquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-gold mb-4">Corporate Orders</span>
            <h2 className="text-maroon-900 mb-4">
              Premium Corporate <span className="text-gradient-gold">Gift Hampers</span>
            </h2>
            <p className="text-cream-900 mb-6 leading-relaxed">
              Make your corporate gifting memorable. Our premium sweet hampers are perfect for
              Diwali gifts, client appreciation, employee rewards, and brand events. Custom branding
              available for orders above 50 boxes.
            </p>

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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-cream-200 shadow-xl shadow-maroon-900/5 p-5 sm:p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-maroon-50 text-maroon-700 flex items-center justify-center">
                  <Building2 size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-maroon-900 font-primary">Corporate Inquiry</h3>
                  <p className="text-xs text-maroon-500">Get pricing for bulk gifting and events.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <label className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon-300" />
                  <input
                    required
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Name"
                    className="w-full rounded-xl border border-cream-200 bg-cream-50 py-3 pl-11 pr-4 text-sm text-maroon-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                  />
                </label>
                <label className="relative">
                  <Building2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon-300" />
                  <input
                    required
                    value={form.company}
                    onChange={(event) => updateField("company", event.target.value)}
                    placeholder="Company"
                    className="w-full rounded-xl border border-cream-200 bg-cream-50 py-3 pl-11 pr-4 text-sm text-maroon-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                  />
                </label>
                <label className="relative">
                  <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon-300" />
                  <input
                    required
                    value={form.mobile}
                    onChange={(event) => updateField("mobile", event.target.value)}
                    placeholder="Mobile"
                    inputMode="tel"
                    className="w-full rounded-xl border border-cream-200 bg-cream-50 py-3 pl-11 pr-4 text-sm text-maroon-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                  />
                </label>
                <label className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon-300" />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="Email"
                    className="w-full rounded-xl border border-cream-200 bg-cream-50 py-3 pl-11 pr-4 text-sm text-maroon-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                  />
                </label>
                <label className="relative">
                  <Package size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon-300" />
                  <input
                    required
                    value={form.quantity}
                    onChange={(event) => updateField("quantity", event.target.value)}
                    placeholder="Quantity"
                    inputMode="numeric"
                    className="w-full rounded-xl border border-cream-200 bg-cream-50 py-3 pl-11 pr-4 text-sm text-maroon-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                  />
                </label>
                <label className="relative">
                  <Gift size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon-300" />
                  <input
                    required
                    value={form.budget}
                    onChange={(event) => updateField("budget", event.target.value)}
                    placeholder="Budget"
                    className="w-full rounded-xl border border-cream-200 bg-cream-50 py-3 pl-11 pr-4 text-sm text-maroon-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full rounded-xl bg-maroon-800 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-maroon-700 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : <>Send Inquiry <Send size={15} /></>}
              </button>
            </form>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bg-white rounded-2xl p-5 text-center border border-cream-200 shadow-sm hover:shadow-md hover:border-gold-300 transition-all duration-300"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                    <stat.icon size={20} />
                  </div>
                  <div className="text-gradient-gold font-primary font-bold text-xl">{stat.value}</div>
                  <div className="text-maroon-700 text-[11px] mt-1 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
