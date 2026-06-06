"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Menu, MessageCircle, Phone, Search, ShoppingCart, X, User, ChevronDown, MapPin, Star, Package, Bookmark, Home, LogOut, Settings, ClipboardList } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleMobileMenu, closeMobileMenu, openCart, openSearch } from "@/store/slices/ui.slice";
import { selectCartCount } from "@/features/cart/cart.slice";
import { selectWishlistCount } from "@/features/wishlist/wishlist.slice";
import { NAV_STRUCTURE, BRAND, ACCOUNT_LINKS } from "@/constants";
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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappLink = getWhatsAppLink(BRAND.whatsapp, "Hi! I want to inquire about bulk ordering sweets.");

  return (
    <>
      {/* Sticky Top Bar */}
      <div className="bg-maroon-950 text-white py-2 border-b border-gold-900/10">
        <div className="container-custom flex justify-center sm:justify-between items-center text-[10px] sm:text-xs">
          <div className="hidden lg:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-200">
              <Gift size={13} className="text-gold-500" /> Free Delivery Above ₹999
            </span>
            <span className="flex items-center gap-1.5 text-gold-200">
              <Star size={13} className="text-gold-500" fill="currentColor" /> 4.9 Customer Rating
            </span>
            <span className="flex items-center gap-1.5 text-gold-200">
              <Gift size={13} className="text-gold-500" /> Festival Offers Live
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href={`tel:${BRAND.phone}`} className="flex items-center gap-1.5 hover:text-gold-300 transition-colors">
              <Phone size={13} className="text-gold-500" /> {BRAND.phone}
            </a>
            <span className="flex items-center gap-1.5 text-gold-200">
              <MapPin size={13} className="text-gold-500" /> Pune Delivery Available
            </span>
            {/* India flag badge */}
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white/20 overflow-hidden shadow-md"
              title="India"
              style={{ fontSize: "14px", lineHeight: 1 }}
            >
              🇮🇳
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 bg-white",
          isScrolled ? "shadow-md py-1 border-b border-cream-200" : "py-4"
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
                    "flex items-center gap-1 px-3 py-1.5 text-xs font-bold transition-all rounded-lg",
                    pathname === item.href ? "text-maroon-700 bg-maroon-50" : "text-maroon-900/70 hover:text-maroon-700 hover:bg-maroon-50"
                  )}
                >
                  {item.label}
                  {"children" in item && <ChevronDown size={14} className={cn("transition-transform", hoveredMenu === item.label && "rotate-180")} />}
                </Link>

                {/* Simplified Dropdown Menu */}
                {"children" in item && (
                  <AnimatePresence>
                    {hoveredMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-0 w-56 bg-white border border-cream-200 rounded-xl shadow-xl overflow-hidden pt-2 pb-3"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-2.5 text-xs font-semibold text-maroon-900 hover:bg-maroon-50 hover:text-maroon-700 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => dispatch(openSearch())}
              className="p-2 sm:p-2.5 rounded-full hover:bg-maroon-50 dark:hover:bg-maroon-900 text-maroon-700 dark:text-gold-300 transition-all border border-transparent hover:border-maroon-100 dark:hover:border-maroon-800"
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Wishlist */}
            <Link
              href="/dashboard/wishlist"
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-maroon-50 text-maroon-700 transition-all border border-transparent hover:border-maroon-100 block"
              aria-label="Wishlist"
            >
              <Heart size={22} className={cn(wishlistCount > 0 && "fill-maroon-500 text-maroon-500")} />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-maroon-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>


            {/* Cart */}
            <button
              onClick={() => dispatch(openCart())}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-maroon-50 text-maroon-700 transition-all border border-transparent hover:border-maroon-100"
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
                  <div className="w-9 h-9 rounded-full bg-maroon-50 border border-maroon-100 hover:bg-maroon-100 flex items-center justify-center transition-all">
                    <User size={16} className="text-maroon-700" />
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
                    className="absolute top-full right-0 w-64 bg-white border border-cream-200 rounded-2xl shadow-2xl overflow-hidden mt-3"
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
                          <Link href="/login" className="flex-1 text-center py-1.5 rounded-lg bg-white text-maroon-800 text-[11px] font-bold hover:bg-gold-50 transition-colors">
                            Login
                          </Link>
                          <Link href="/register" className="flex-1 text-center py-1.5 rounded-lg bg-gold-500 text-white text-[11px] font-bold hover:bg-gold-600 transition-colors">
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
                          className="flex items-center gap-3 px-5 py-2.5 text-[12px] font-semibold text-maroon-800 hover:bg-maroon-50 hover:text-maroon-700 transition-colors group/item"
                        >
                          <span className="w-7 h-7 rounded-lg bg-maroon-50 group-hover/item:bg-maroon-100 flex items-center justify-center text-maroon-600 transition-colors">
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
              className="xl:hidden p-2 rounded-lg bg-maroon-50 text-maroon-700"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-lg border-t border-cream-200 px-4 py-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
        <Link href="/" className="flex flex-col items-center gap-1 text-maroon-900/50 hover:text-maroon-700 transition-colors">
          <Home size={20} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/categories" className="flex flex-col items-center gap-1 text-maroon-900/50 hover:text-maroon-700 transition-colors">
          <Gift size={20} />
          <span className="text-[10px] font-bold">Shop</span>
        </Link>
        <button onClick={() => dispatch(openSearch())} className="flex flex-col items-center gap-1 -mt-8 bg-maroon-700 text-white p-3 rounded-full shadow-lg shadow-maroon-200 ring-4 ring-white dark:ring-maroon-950">
          <Search size={22} />
        </button>
        <ThemeToggle compact />
        <Link href={isAuthenticated ? "/dashboard" : "/login"} className="flex flex-col items-center gap-1 text-maroon-900/50 hover:text-maroon-700 transition-colors">
          <User size={20} />
          <span className="text-[10px] font-bold">Account</span>
        </Link>
      </div>

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
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[50] bg-white shadow-2xl flex flex-col pt-4"
            >
              <div className="p-6 flex items-center justify-between border-b border-cream-200">
                <div className="flex flex-col">
                  <span className="text-maroon-700 font-bold text-xl" style={{ fontFamily: "var(--font-primary)" }}>
                    Archana Sweets
                  </span>
                  <span className="text-[10px] text-maroon-400 tracking-[0.2em] font-semibold uppercase mt-0.5">
                    Made With Love
                  </span>
                </div>
                <button onClick={() => dispatch(closeMobileMenu())} className="p-2 rounded-full bg-maroon-50 text-maroon-700">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <nav className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold text-maroon-300 uppercase tracking-widest mb-2">Main Menu</p>
                  {NAV_STRUCTURE.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => dispatch(closeMobileMenu())}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all text-xs",
                          pathname === item.href ? "bg-maroon-600 text-white" : "text-maroon-800 hover:bg-maroon-50"
                        )}
                      >
                        {item.label}
                        {"children" in item && <ChevronDown size={14} className="opacity-50" />}
                      </Link>
                    </div>
                  ))}
                </nav>

                <div className="mt-8">
                  <p className="text-[10px] font-bold text-maroon-300 uppercase tracking-widest mb-4">Account</p>
                  {!isAuthenticated ? (
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/login" onClick={() => dispatch(closeMobileMenu())} className="btn-primary text-center py-2.5 text-[10px]">
                        Login
                      </Link>
                      <Link href="/register" onClick={() => dispatch(closeMobileMenu())} className="btn-outline text-center py-2.5 text-[10px]">
                        Sign Up
                      </Link>
                    </div>
                  ) : (
                    <Link href="/dashboard" onClick={() => dispatch(closeMobileMenu())} className="flex items-center gap-3 p-4 rounded-xl border border-maroon-100 bg-maroon-50/50">
                      <div className="w-10 h-10 rounded-full bg-gradient-maroon flex items-center justify-center text-white font-bold uppercase">
                        {user?.firstName?.[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-maroon-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-[10px] text-maroon-500">My Profile & Orders</p>
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
