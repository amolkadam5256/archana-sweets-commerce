"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, MessageCircle, Phone, Search, ShoppingCart, X, User, ChevronDown, MapPin, Star, Home, LogOut, ClipboardList } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleMobileMenu, closeMobileMenu, openCart, openSearch } from "@/store/slices/ui.slice";
import { selectCartCount } from "@/features/cart/cart.slice";
import { selectWishlistCount } from "@/features/wishlist/wishlist.slice";
import { NAV_STRUCTURE, BRAND } from "@/constants";
import { getWhatsAppLink, cn } from "@/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const isMobileMenuOpen = useAppSelector((s) => s.ui.isMobileMenuOpen);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const user = useAppSelector((s) => s.auth.user);

  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const OFFERS = [
    { icon: "✨", text: "LATEST OFFER: Up to 20% OFF on Corporate Gift Boxes!", gold: true },
    { icon: "🎁", text: "Festival Specials Live Now — Book Early!", gold: true },
    { icon: "🚚", text: "Free Delivery Above ₹999 — Shop Now!", gold: false },
    { icon: "⭐", text: "4.9 Customer Rating — Trusted by Thousands!", gold: false },
    { icon: "🎉", text: "Festival Offers Live Now — Don't Miss Out!", gold: true },
    { icon: "🍬", text: "Pure Ghee Sweets Handcrafted Fresh Daily", gold: true },
  ];

  // Fully imperative offer cycling — zero React re-renders, zero gap
  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;
    let idx = 0;

    const applyOffer = (index: number) => {
      el.textContent = `${OFFERS[index].icon}  ${OFFERS[index].text}`;
      el.style.color = OFFERS[index].gold ? "#d4a832" : "#f5ede0";
    };

    const startAnimation = () => {
      el.style.animation = "offer-scroll 14s linear 1";
    };

    const handleEnd = () => {
      // 1. Lock element off-screen RIGHT before clearing animation
      //    so it never snaps to translateX(0) visibly
      el.style.transform = "translateX(100vw)";
      el.style.animation = "none";
      // 2. Advance offer
      idx = (idx + 1) % OFFERS.length;
      applyOffer(idx);
      // 3. Force reflow while element is safely off-screen
      void el.offsetHeight;
      // 4. Release transform to animation control and start
      el.style.transform = "";
      startAnimation();
    };

    // Kick off first offer
    applyOffer(0);
    startAnimation();
    el.addEventListener("animationend", handleEnd);
    return () => el.removeEventListener("animationend", handleEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = () => {
    if (slideRef.current) slideRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (slideRef.current) slideRef.current.style.animationPlayState = "running";
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappLink = getWhatsAppLink(BRAND.whatsapp, "Hi! I want to inquire about bulk ordering sweets.");

  return (
    <>
      {/* Sticky Top Bar */}
      <div className="bg-[#6c2035] text-white py-2 border-b border-[#5a1c2f] shadow-sm">
        <div className="container-custom flex flex-col gap-2 sm:flex-row justify-between items-center text-[10px] sm:text-xs">

          {/* Left Side: One-at-a-time scrolling offer — gapless, hover to pause */}
          <div
            className="flex flex-1 min-w-0 overflow-hidden mr-0 sm:mr-6 items-center sm:border-r border-white/20 pr-0 sm:pr-6 h-6 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            title="Hover to pause"
          >
            <style>{`
              @keyframes offer-scroll {
                0%   { transform: translateX(100vw); }
                100% { transform: translateX(-150%); }
              }
            `}</style>
            <div
              ref={slideRef}
              className="inline-flex min-w-0 items-center whitespace-nowrap text-[10px] font-semibold tracking-[0.25em] uppercase text-white"
            >
              {/* Initial content rendered server-side; JS takes over on mount */}
              ✨  FESTIVE SPECIALS LIVE — Fresh sweets delivered across Pune!
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-wrap items-center justify-end gap-3 shrink-0 z-10 pl-0 sm:pl-6 min-w-0">
            <a href="tel:+917709266280" className="flex items-center gap-1.5 text-white hover:text-[#ffe7da] transition-colors whitespace-nowrap">
              <Phone size={13} className="text-[#ffe7da]" /> +91 77092 66280
            </a>
            <span className="hidden sm:flex items-center gap-1.5 text-[#fce7e9] whitespace-nowrap">
              <MapPin size={13} className="text-[#ffe7da]" /> Pune delivery available
            </span>
            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-white/15 text-[9px] font-semibold tracking-widest text-white shrink-0">
              IN
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 bg-slate-950",
          isScrolled ? "shadow-xl py-1 border-b border-slate-800" : "py-4"
        )}
      >
        <div className="container-custom flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex-shrink-0" onClick={() => dispatch(closeMobileMenu())}>
            <div className="flex flex-col">
              <h1 className="flex items-center gap-1 leading-none">
                <span className="text-maroon-700 font-bold tracking-tight" style={{ fontSize: "1.25rem", fontFamily: "var(--font-primary)" }}>Archana</span>
                <span className="text-gold-600 font-medium" style={{ fontSize: "1.25rem", fontFamily: "var(--font-primary)" }}>Sweets</span>
              </h1>
              <span className="text-[10px] text-maroon-400 tracking-[0.2em] font-semibold uppercase mt-1">Made With Love</span>
            </div>
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_STRUCTURE.map((item) => (
              <div
                key={item.label}
                className="relative group py-2"
                onMouseEnter={() => setHoveredMenu(item.label)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 text-xs font-bold transition-all rounded-2xl",
                    pathname === item.href
                      ? "text-white bg-white/10 ring-1 ring-white/20 shadow-[0_4px_20px_-14px_rgba(255,255,255,0.55)]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                  {"children" in item && <ChevronDown size={14} className={cn("transition-transform", hoveredMenu === item.label && "rotate-180")} />}
                </Link>

                {/* Creative Mega Menu Dropdown */}
                {"children" in item && (
                  <AnimatePresence>
                    {hoveredMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                          "absolute top-full left-1/2 -translate-x-1/2 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mt-3 p-1.5 flex z-[60]",
                          item.children.length > 5 ? "w-[580px]" : "w-[440px]"
                        )}
                        style={{ boxShadow: "0 20px 60px -10px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.25)" }}
                      >
                        <div className={cn(
                          "grid gap-x-2 gap-y-1 p-5 flex-1 bg-slate-950/95 border border-slate-800 rounded-2xl",
                          item.children.length > 5 ? "grid-cols-2" : "grid-cols-1"
                        )}>
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="group flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-cream-300 group-hover:bg-gold-500 group-hover:scale-[1.3] transition-all"></span>
                              {child.label}
                            </Link>
                          ))}
                        </div>

                        {/* Promotional Side Panel */}
                        <div className="w-[190px] shrink-0 bg-gradient-to-br from-maroon-800 via-maroon-900 to-maroon-950 rounded-xl p-5 flex flex-col justify-end relative overflow-hidden group/promo">
                          {/* Animated background decors */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-xl transition-transform duration-[1.5s] ease-out group-hover/promo:scale-[1.8]"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold-400/20 rounded-full translate-y-8 -translate-x-8 blur-xl"></div>

                          <div className="relative z-10">
                            <h3 className="text-white font-bold text-lg mb-1.5 leading-tight tracking-tight" style={{ fontFamily: "var(--font-primary)" }}>{item.label}</h3>
                            <p className="text-cream-50/70 text-[11px] leading-relaxed mb-4">Discover the perfect taste of tradition and premium quality.</p>
                            <Link href={item.href} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gold-400 uppercase tracking-[0.15em] hover:text-gold-300 transition-colors">
                              Explore All <span className="transition-transform group-hover/promo:translate-x-1 duration-300">&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <button
                onClick={() => dispatch(openSearch())}
                className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 hover:border-white/20"
                aria-label="Search"
              >
                <Search size={22} />
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Wishlist */}
              <Link
                href="/dashboard/wishlist"
                className="relative p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 hover:border-white/20 block"
                aria-label="Wishlist"
              >
                <Heart size={22} className={cn(wishlistCount > 0 && "fill-maroon-500 text-maroon-500")} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-maroon-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Cart */}
            <button
              onClick={() => dispatch(openCart())}
              className="relative p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 hover:border-white/20"
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-gold-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Dropdown */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setHoveredMenu("account")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {/* Trigger Button */}
              <button className="flex items-center gap-1 ml-1 transition-all group">
                {isAuthenticated ? (
                  /* Logged-in: Gradient avatar with initials */
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-maroon-600 to-maroon-800 flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-gold-400 ring-offset-1 uppercase transition-all group-hover:ring-gold-500">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
                  </div>
                ) : (
                  /* Guest: icon only */
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 text-white flex items-center justify-center transition-all">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </button>

              <AnimatePresence>
                {hoveredMenu === "account" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full right-0 w-64 bg-white border border-cream-200 rounded-2xl shadow-2xl overflow-hidden mt-3 dark:bg-slate-950 dark:border-slate-800"
                    style={{ boxShadow: "0 20px 60px -10px rgba(120,20,30,0.15), 0 4px 16px rgba(0,0,0,0.08)" }}
                  >
                    {/* Header section */}
                    {isAuthenticated ? (
                      <div className="relative px-5 pt-5 pb-4 bg-gradient-to-br from-maroon-700 to-maroon-900 overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-6 translate-x-6" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gold-400/10 rounded-full translate-y-4 -translate-x-4" />
                        <div className="relative flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white text-base font-bold shadow-lg uppercase">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white leading-tight">{user?.firstName} {user?.lastName}</p>
                            <p className="text-[10px] text-gold-300 font-semibold tracking-widest uppercase mt-0.5">✦ Member</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="px-5 pt-5 pb-4 bg-gradient-to-br from-maroon-700 to-maroon-900 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-6 translate-x-6" />
                        <p className="text-sm font-bold text-white mb-0.5">Welcome to</p>
                        <p className="text-base font-extrabold text-gold-300" style={{ fontFamily: "var(--font-primary)" }}>Archana Sweets</p>
                        <p className="text-[10px] text-white/60 mt-1">Sign in for a sweeter experience</p>
                        <div className="flex gap-2 mt-3">
                          <Link href="/login" className="flex-1 text-center py-1.5 rounded-lg bg-white/10 text-white text-[11px] font-bold hover:bg-white/20 transition-colors">
                            Login
                          </Link>
                          <Link href="/register" className="flex-1 text-center py-1.5 rounded-lg bg-white/20 text-white text-[11px] font-bold hover:bg-white/30 transition-colors">
                            Register
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Nav links with icons */}
                    <div className="py-2">
                      {[
                        { label: "My Profile", href: "/dashboard/profile", icon: <User size={14} /> },
                        { label: "My Orders", href: "/dashboard/orders", icon: <ClipboardList size={14} /> },
                        { label: "Wishlist", href: "/dashboard/wishlist", icon: <Heart size={14} /> },
                        { label: "Saved Addresses", href: "/dashboard/addresses", icon: <MapPin size={14} /> },
                        { label: "Rewards & Points", href: "/dashboard/rewards", icon: <Star size={14} /> },
                      ].map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="flex items-center gap-3 px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-white/10 transition-colors group/item"
                        >
                          <span className="w-7 h-7 rounded-lg bg-white/10 group-hover/item:bg-white/15 flex items-center justify-center text-white transition-colors">
                            {link.icon}
                          </span>
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {/* Logout */}
                    {isAuthenticated && (
                      <div className="border-t border-cream-100 py-2">
                        <button className="flex items-center gap-3 w-full px-5 py-2.5 text-[12px] font-semibold text-red-500 hover:bg-red-50 transition-colors group/logout">
                          <span className="w-7 h-7 rounded-lg bg-red-50 group-hover/logout:bg-red-100 flex items-center justify-center transition-colors">
                            <LogOut size={14} className="text-red-500" />
                          </span>
                          Sign Out
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="xl:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/15"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <motion.nav 
        className="fixed inset-x-4 bottom-4 z-50 lg:hidden mx-auto max-w-md"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Favorites Label */}
          <div className="text-center">
            <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Favorites</span>
          </div>

          {/* Navigation Items Container */}
          <div className="w-full bg-slate-950/98 border border-white/5 backdrop-blur-2xl rounded-[32px] shadow-2xl p-4 flex items-center justify-between gap-3">
            {[
              { label: "Home", href: "/", icon: <Home size={24} />, key: "home" },
              { label: "Search", action: () => dispatch(openSearch()), icon: <Search size={24} />, key: "search" },
              { label: "Favorites", href: "/dashboard/wishlist", icon: <Star size={24} fill="currentColor" />, key: "favorites" },
              { label: "Wishlist", href: "/dashboard/wishlist", icon: <Heart size={24} />, key: "wishlist" },
              { label: "Account", href: isAuthenticated ? "/dashboard" : "/login", icon: <User size={24} />, key: "account" },
            ].map((item) => {
              const isActive = item.href ? pathname === item.href : false;

              return item.href ? (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    "flex items-center justify-center flex-1 w-12 h-12 rounded-2xl border-2 transition-all duration-300",
                    isActive
                      ? "bg-gold-500/20 border-gold-400 text-gold-400 shadow-lg shadow-gold-500/20"
                      : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  {item.icon}
                </Link>
              ) : (
                <button
                  key={item.key}
                  onClick={item.action}
                  aria-label={item.label}
                  className={cn(
                    "flex items-center justify-center flex-1 w-12 h-12 rounded-2xl border-2 transition-all duration-300",
                    "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  {item.icon}
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(closeMobileMenu())}
              className="lg:hidden fixed inset-0 z-[45] bg-maroon-950/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[50] bg-white dark:bg-slate-950 shadow-2xl flex flex-col pt-4"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-800">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-primary)" }}>
                    Archana Sweets
                  </span>
                  <span className="text-[10px] text-white/70 tracking-[0.2em] font-semibold uppercase mt-0.5">
                    Made With Love
                  </span>
                </div>
                <button onClick={() => dispatch(closeMobileMenu())} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/15">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <nav className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2">Main Menu</p>
                  {NAV_STRUCTURE.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => dispatch(closeMobileMenu())}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all text-xs",
                          pathname === item.href
                            ? "bg-white/10 text-white ring-1 ring-white/20 shadow-[0_4px_20px_-14px_rgba(255,255,255,0.55)]"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {item.label}
                        {"children" in item && <ChevronDown size={14} className="opacity-50" />}
                      </Link>
                    </div>
                  ))}
                </nav>

                <div className="mt-8">
                  <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-4">Account</p>
                  {!isAuthenticated ? (
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/login" onClick={() => dispatch(closeMobileMenu())} className="text-center py-2.5 text-[10px] rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">
                        Login
                      </Link>
                      <Link href="/register" onClick={() => dispatch(closeMobileMenu())} className="text-center py-2.5 text-[10px] rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors">
                        Sign Up
                      </Link>
                    </div>
                  ) : (
                    <Link href="/dashboard" onClick={() => dispatch(closeMobileMenu())} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 dark:border-white/10 dark:bg-slate-900/80">
                      <div className="w-10 h-10 rounded-full bg-gradient-maroon flex items-center justify-center text-white font-bold uppercase">
                        {user?.firstName?.[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{user?.firstName} {user?.lastName}</p>
                        <p className="text-[10px] text-white/80">My Profile & Orders</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>

              <div className="p-6 bg-cream-50 border-t border-cream-200">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-green-600 text-white text-xs font-bold shadow-lg shadow-green-100"
                >
                  <MessageCircle size={18} /> Order via WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
