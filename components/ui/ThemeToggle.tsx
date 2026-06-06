"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleTheme } from "@/store/slices/theme.slice";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const dispatch = useAppDispatch();
  const { resolved } = useAppSelector((s) => s.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 sm:p-2.5 rounded-full hover:bg-maroon-50 dark:hover:bg-maroon-900 text-maroon-700 dark:text-gold-300 transition-all border border-transparent hover:border-maroon-100 dark:hover:border-maroon-800"
      aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolved}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {resolved === "dark" ? <Sun size={compact ? 20 : 22} /> : <Moon size={compact ? 20 : 22} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
