"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { initTheme, setTheme } from "@/store/slices/theme.slice";
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";

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
    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("archana-theme", mode);
  }, [resolved, mode]);

  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      dispatch(setTheme("system"));
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode, dispatch]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolved === "dark" ? "dark" : "light",
          primary: { main: "#8B1E3F" },
          secondary: { main: "#B8860B" },
          background: {
            default: resolved === "dark" ? "#0f172a" : "#fff8f1",
            paper: resolved === "dark" ? "#111827" : "#ffffff",
          },
          text: {
            primary: resolved === "dark" ? "#f8fafc" : "#111827",
            secondary: resolved === "dark" ? "#cbd5e1" : "#475569",
          },
        },
        typography: {
          fontFamily: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"].join(", "),
          button: { textTransform: "none" },
        },
        shape: { borderRadius: 24 },
      }),
    [resolved]
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
