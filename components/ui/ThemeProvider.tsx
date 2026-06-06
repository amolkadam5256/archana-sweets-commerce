"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { initTheme, setTheme } from "@/store/slices/theme.slice";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { mode, resolved } = useAppSelector((s) => s.theme);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch]);

  // Apply theme attribute to <html> whenever resolved changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolved);
    // Also set the class for any class-based utilities
    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Persist mode to localStorage
    localStorage.setItem("archana-theme", mode);
  }, [resolved, mode]);

  // Listen for system preference changes when in "system" mode
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      dispatch(setTheme("system")); // re-derive resolved
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode, dispatch]);

  return <>{children}</>;
}
