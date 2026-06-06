import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  resolved: "light" | "dark"; // actual applied theme
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem("archana-theme") as ThemeMode | null;
  return stored && ["light", "dark", "system"].includes(stored) ? stored : "system";
};

const resolveTheme = (mode: ThemeMode): "light" | "dark" => {
  if (mode === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return mode;
};

const initialState: ThemeState = {
  mode: "system",
  resolved: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.resolved = resolveTheme(action.payload);
    },
    initTheme: (state) => {
      const mode = getInitialTheme();
      state.mode = mode;
      state.resolved = resolveTheme(mode);
    },
    toggleTheme: (state) => {
      const next = state.resolved === "light" ? "dark" : "light";
      state.mode = next;
      state.resolved = next;
    },
  },
});

export const { setTheme, initTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
