"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeSearch } from "@/store/slices/ui.slice";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/constants";

export function SearchOverlay() {
  const dispatch = useAppDispatch();
  const isSearchOpen = useAppSelector((s) => s.ui.isSearchOpen);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isSearchOpen]);

  const popularSearches = ["Besan Laddu", "Dry Fruit Laddu", "Modak", "Gift Boxes", "Diwali Special"];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-white/95 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="container-custom flex items-center justify-between py-6 border-b border-cream-200">
            <div className="flex-1 max-w-3xl flex items-center gap-4">
              <Search className="text-maroon-300" size={24} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for sweets, laddus, or gift boxes..."
                className="w-full text-lg sm:text-xl font-medium bg-transparent border-none focus:outline-none placeholder:text-cream-300 text-maroon-900"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => dispatch(closeSearch())}
              className="p-3 rounded-full hover:bg-maroon-50 text-maroon-700 transition-all group"
            >
              <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto pt-10 pb-20">
            <div className="container-custom">
              {query.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Popular Searches */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-maroon-300 mb-6 flex items-center gap-2">
                      <TrendingUp size={14} /> Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-5 py-2.5 rounded-full bg-maroon-50 text-maroon-900 text-xs font-semibold hover:bg-maroon-600 hover:text-white transition-all border border-maroon-100"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories Quick Link */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-maroon-300 mb-6 flex items-center gap-2">
                      <Clock size={14} /> Shop by Category
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {PRODUCT_CATEGORIES.slice(0, 6).map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/categories/${cat.slug}`}
                          onClick={() => dispatch(closeSearch())}
                          className="flex items-center justify-between p-4 rounded-2xl bg-cream-50 hover:bg-gold-50 border border-cream-200 hover:border-gold-200 transition-all group"
                        >
                          <span className="flex items-center gap-3 font-semibold text-maroon-900 text-xs">
                            {cat.name}
                          </span>
                          <ArrowRight size={16} className="text-maroon-200 group-hover:text-gold-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cream-100 text-maroon-300 mb-6">
                    <Search size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-maroon-900 mb-2">Searching for &quot;{query}&quot;</h2>
                  <p className="text-maroon-400">Showing results from our kitchen...</p>

                  {/* Placeholder for real results */}
                  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-40 grayscale pointer-events-none select-none">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white border border-cream-200 rounded-3xl p-4 shadow-sm">
                        <div className="aspect-square bg-cream-100 rounded-2xl mb-4" />
                        <div className="h-4 w-3/4 bg-cream-100 rounded mb-2" />
                        <div className="h-3 w-1/2 bg-cream-50 rounded" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-12">
                    <Link
                      href={`/shop?q=${encodeURIComponent(query)}`}
                      onClick={() => dispatch(closeSearch())}
                      className="btn-primary"
                    >
                      View all products
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Hint */}
          <div className="py-4 text-center border-t border-cream-100 text-[10px] text-maroon-300 font-bold uppercase tracking-widest bg-cream-50/50">
            Press <kbd className="px-1.5 py-0.5 rounded border border-maroon-200 bg-white shadow-sm mx-1">ESC</kbd> to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
