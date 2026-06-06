"use client";

import Link from "next/link";
import { BRAND, NAV_LINKS, PRODUCT_CATEGORIES } from "@/constants";
import { getWhatsAppLink } from "@/utils";
import { Phone, Mail, MapPin, Heart, ArrowRight } from "lucide-react";

// Social Icons as inline SVGs for reliability
const SocialIcons = {
  Instagram: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Facebook: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Youtube: (props: any) => (
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

  return (
    <footer className="bg-maroon-950 text-cream-100 border-t border-gold-900/10">
      {/* Newsletter Section */}
      <div className="border-b border-gold-900/10 bg-maroon-950/50">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-maroon-900/40 p-8 rounded-3xl border border-gold-900/20 shadow-2xl">
            <div className="max-w-md text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gold-300 mb-2" style={{ fontFamily: "var(--font-primary)" }}>
                Join the Sweet Club
              </h3>
              <p className="text-cream-400 text-xs">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
            </div>
            <form className="w-full lg:max-w-md flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-full bg-maroon-950 border border-gold-900/30 text-cream-100 placeholder:text-maroon-400 focus:outline-none focus:border-gold-500 transition-all shadow-inner"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gold-600 hover:bg-gold-500 text-maroon-950 font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-900/20"
              >
                Subscribe <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="group mb-6">
              <h2 className="text-2xl font-bold text-gold-400 group-hover:text-gold-300 transition-colors" style={{ fontFamily: "var(--font-primary)" }}>
                Archana Sweets
              </h2>
              <div className="h-0.5 w-12 bg-gold-600 mt-1 rounded-full transform origin-left transition-all group-hover:w-full" />
              <p className="text-gold-700 text-[10px] tracking-[0.3em] font-bold uppercase mt-1">
                {BRAND.tagline}
              </p>
            </Link>
            <p className="text-cream-400 text-xs leading-relaxed mb-8 max-w-xs">
              Handcrafted homemade Indian sweets made with the finest ingredients and a mother&apos;s love.
              Delivering tradition in every bite.
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
                  className="w-10 h-10 rounded-full bg-maroon-900/50 border border-gold-900/20 flex items-center justify-center text-gold-400 hover:bg-gold-600 hover:text-maroon-950 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-gold-300 font-bold mb-6 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-400 text-xs hover:text-gold-300 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-700 group-hover:w-2 group-hover:bg-gold-400 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/track-order" className="text-cream-400 text-xs hover:text-gold-300 transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gold-700 group-hover:w-2 group-hover:bg-gold-400 transition-all" />
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-gold-300 font-bold mb-6 text-sm uppercase tracking-widest">
              Our Sweets
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {PRODUCT_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-cream-400 text-xs hover:text-gold-300 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <span className="text-lg group-hover:scale-125 transition-transform">{cat.emoji}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-gold-300 font-bold mb-6 text-sm uppercase tracking-widest">
              Get in Touch
            </h4>
            <ul className="space-y-5">
              <li className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded-lg bg-maroon-900/50 border border-gold-900/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-maroon-950 transition-all">
                  <MapPin size={16} />
                </div>
                <span className="text-cream-400 text-xs leading-relaxed flex-1">{BRAND.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex gap-4 items-center group text-cream-400 text-xs hover:text-gold-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-maroon-900/50 border border-gold-900/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-maroon-950 transition-all">
                    <Phone size={16} />
                  </div>
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex gap-4 items-center group text-cream-400 text-xs hover:text-gold-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-maroon-900/50 border border-gold-900/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-maroon-950 transition-all">
                    <Mail size={16} />
                  </div>
                  {BRAND.email}
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-green-950/20 group"
            >
              <div className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full">
                <Phone size={12} fill="white" />
              </div>
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-900/10 bg-maroon-950/80">
        <div className="container-custom py-8 flex flex-col items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold uppercase tracking-widest text-maroon-300">
            <Link href="/privacy-policy" className="hover:text-gold-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold-300 transition-colors">Terms</Link>
            <Link href="/refund-policy" className="hover:text-gold-300 transition-colors">Refunds</Link>
            <Link href="/shipping-policy" className="hover:text-gold-300 transition-colors">Shipping</Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-maroon-400 font-medium">
            <p>© {currentYear} {BRAND.name}. All rights reserved.</p>
            <span className="hidden md:inline text-maroon-800">|</span>
            <p>GST: <span className="text-maroon-300">{BRAND.gst}</span></p>
            <span className="hidden md:inline text-maroon-800">|</span>
            <p className="flex items-center gap-1.5">
              Made with <Heart size={12} className="text-gold-500 animate-pulse" fill="currentColor" /> in Pune
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
