"use client";

import type { SVGProps } from "react";
import Link from "next/link";
import { BRAND, NAV_LINKS, PRODUCT_CATEGORIES } from "@/constants";
import { getWhatsAppLink } from "@/utils";
import { Phone, Mail, MapPin, Heart, ArrowRight, Award, Truck, Star, Sparkles, CheckCircle, PackageOpen } from "lucide-react";

// Social Icons as inline SVGs for reliability
const SocialIcons = {
  Instagram: (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Facebook: (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Youtube: (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
};

export function Footer() {
  const whatsappLink = getWhatsAppLink(BRAND.whatsapp, "Hi! I want to order sweets.");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: BRAND.social.instagram, Icon: SocialIcons.Instagram, label: "Instagram" },
    { href: BRAND.social.facebook, Icon: SocialIcons.Facebook, label: "Facebook" },
    { href: BRAND.social.youtube, Icon: SocialIcons.Youtube, label: "YouTube" },
  ];

  const trustIndicators = [
    { icon: Sparkles, title: "100% Pure Ghee", desc: "No artificial preservatives or colors" },
    { icon: Award, title: "Authentic Recipes", desc: "Crafted by master halwais" },
    { icon: PackageOpen, title: "Premium Gifting", desc: "Elegant corporate & wedding boxes" },
    { icon: Truck, title: "Pan-India Delivery", desc: "Delivered fresh to your doorstep" },
  ];

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white relative overflow-hidden mt-20">
      
      {/* Decorative border separator */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>

      {/* Trust & Value Proposition Row */}
      <div className="relative border-b border-cream-200 dark:border-gray-800 bg-cream-50 dark:bg-[#111111]">
        <div className="container-custom py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator) => (
              <div key={indicator.title} className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-black rounded-3xl border border-cream-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-gold-300 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-cream-50 dark:bg-gray-900 border border-cream-200 dark:border-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <indicator.icon size={24} className="text-gold-500 group-hover:text-gold-600" strokeWidth={1.5} />
                </div>
                <h4 className="text-maroon-900 dark:text-white font-bold text-[15px] mb-2 font-primary tracking-wide group-hover:text-gold-600 transition-colors">{indicator.title}</h4>
                <p className="text-black/60 dark:text-white/60 text-xs leading-relaxed max-w-[200px]">{indicator.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-cream-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="container-custom py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-gradient-to-br w-full max-w-5xl mx-auto from-cream-50 to-white dark:from-[#111111] dark:to-black p-10 sm:p-14 rounded-3xl border border-gold-900/10 shadow-[0_10px_40px_-15px_rgba(212,175,55,0.15)] relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-maroon-900/5 rounded-full blur-3xl"></div>

            <div className="w-full lg:w-1/2 text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-50 text-gold-700 text-[10px] font-bold uppercase tracking-widest mb-4 border border-gold-200">
                <Star size={12} fill="currentColor" /> VIP Access
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-maroon-900 dark:text-white mb-4" style={{ fontFamily: "var(--font-primary)" }}>
                Join the <span className="text-gold-500">Sweet Club</span>
              </h3>
              <p className="text-black/70 dark:text-white/70 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                Get exclusive first access to festival collections, private discounts, and the secret behind our heritage recipes delivered straight to you.
              </p>
            </div>
            <form className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-3 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email to join..."
                className="flex-1 px-6 py-4 rounded-xl bg-white dark:bg-[#0a0a0a] border-2 border-cream-200 hover:border-gold-300 dark:border-gray-800 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-gold-500 transition-all text-sm font-medium shadow-sm"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-maroon-900 hover:bg-maroon-800 text-gold-400 font-bold tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-maroon-900/20 hover:shadow-maroon-900/40 hover:-translate-y-1 active:scale-95 whitespace-nowrap"
              >
                Join Now <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="relative container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          
          {/* Brand & Marketing Summary */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left xl:pr-10">
            <Link href="/" className="group mb-6 inline-block">
              <h2 className="text-3xl font-bold text-maroon-900 dark:text-white transition-colors" style={{ fontFamily: "var(--font-primary)" }}>
                Archana Sweets
              </h2>
              <div className="h-0.5 w-12 bg-gold-600 mt-2 rounded-full transform origin-left transition-all duration-300 md:group-hover:w-full" />
              <p className="text-maroon-700 dark:text-gold-500 text-[10px] tracking-[0.3em] font-bold uppercase mt-2">
                {BRAND.tagline}
              </p>
            </Link>
            <p className="text-black/70 dark:text-white/70 text-xs sm:text-[13px] leading-relaxed mb-6">
              More than just sweets—we are delivering tradition, memories, and celebration. Over <strong className="text-maroon-900 dark:text-white">1 Million+</strong> happy bites served with pure passion and absolute authenticity.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-cream-50 dark:bg-[#111111] border border-cream-200 dark:border-gray-800 flex items-center justify-center text-maroon-900 dark:text-white hover:bg-gold-50 hover:text-gold-600 hover:border-gold-300 transition-all duration-300 shadow-sm hover:-translate-y-1"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start lg:pl-10">
            <h4 className="text-maroon-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest font-primary flex items-center gap-2">
              Explore
            </h4>
            <ul className="space-y-4 w-full text-center md:text-left">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-black/70 dark:text-white/70 text-[13px] hover:text-gold-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2.5 group font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cream-300 group-hover:w-3 group-hover:bg-gold-500 transition-all duration-300 hidden md:block" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/track-order" className="text-black/70 dark:text-white/70 text-[13px] hover:text-gold-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2.5 group font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-cream-300 group-hover:w-3 group-hover:bg-gold-500 transition-all duration-300 hidden md:block" />
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Best Sellers */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-maroon-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest font-primary flex items-center gap-2">
              Best Sellers
            </h4>
            <ul className="grid grid-cols-1 gap-4 w-full text-center md:text-left">
              {PRODUCT_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-black/70 dark:text-white/70 text-[13px] hover:text-gold-600 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2.5 group font-medium"
                  >
                    <CheckCircle size={14} className="text-cream-300 group-hover:text-gold-500 transition-colors hidden md:block" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-maroon-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest font-primary">
              Contact Us
            </h4>
            <ul className="space-y-6 w-full text-center md:text-left">
              <li className="flex flex-col md:flex-row gap-4 items-center md:items-start group">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-cream-50 dark:bg-[#111111] border border-cream-200 dark:border-gray-800 flex items-center justify-center text-maroon-900 dark:text-white group-hover:bg-gold-50 group-hover:text-gold-600 group-hover:border-gold-300 transition-all duration-300 shadow-sm">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <span className="text-black/80 dark:text-white/80 text-[13px] leading-relaxed pt-1 font-medium">{BRAND.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex flex-col md:flex-row gap-4 items-center group text-black/80 dark:text-white/80 text-[13px] hover:text-gold-600 transition-colors font-medium"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-cream-50 dark:bg-[#111111] border border-cream-200 dark:border-gray-800 flex items-center justify-center text-maroon-900 dark:text-white group-hover:bg-gold-50 group-hover:text-gold-600 group-hover:border-gold-300 transition-all duration-300 shadow-sm">
                    <Phone size={18} strokeWidth={1.5} />
                  </div>
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex flex-col md:flex-row gap-4 items-center group text-black/80 dark:text-white/80 text-[13px] hover:text-gold-600 transition-colors font-medium"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-cream-50 dark:bg-[#111111] border border-cream-200 dark:border-gray-800 flex items-center justify-center text-maroon-900 dark:text-white group-hover:bg-gold-50 group-hover:text-gold-600 group-hover:border-gold-300 transition-all duration-300 shadow-sm">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  {BRAND.email}
                </a>
              </li>
            </ul>

            {/* Premium WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-50 text-green-700 border border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 text-[13px] font-bold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="w-6 h-6 flex items-center justify-center bg-green-200 group-hover:bg-white/20 rounded-full transition-colors duration-300">
                <Phone size={12} fill="currentColor" />
              </div>
              Concierge on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Compliance / Bottom Bar */}
      <div className="relative border-t border-cream-200 dark:border-gray-800 bg-cream-50 dark:bg-[#0a0a0a]">
        <div className="container-custom py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">
            <Link href="/privacy-policy" className="hover:text-gold-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-600 transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-gold-600 transition-colors">Refunds & Returns</Link>
            <Link href="/shipping-policy" className="hover:text-gold-600 transition-colors">Shipping Info</Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-[11px] text-black/60 dark:text-white/60 font-medium">
            <p>© {currentYear} {BRAND.name}. All rights reserved.</p>
            <span className="hidden sm:inline text-cream-300 dark:text-gray-700">|</span>
            <p className="flex items-center gap-1.5">
              Made with <Heart size={12} className="text-maroon-600 animate-pulse drop-shadow-sm" fill="currentColor" /> by{" "}
              <a href="https://www.growthikmedia.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-maroon-900 group relative inline-block">
                Growthik Media
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-maroon-900 group-hover:w-full transition-all duration-300"></span>
              </a>{" "}
              in Pune
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
