"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,        // 1 min
            gcTime: 5 * 60 * 1000,       // 5 min
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1a0a00",
                color: "#f5e6c8",
                border: "1px solid #b8860b",
                borderRadius: "12px",
                fontFamily: "var(--font-primary)",
              },
              success: { iconTheme: { primary: "#b8860b", secondary: "#f5e6c8" } },
              error: { iconTheme: { primary: "#dc2626", secondary: "#fff" } },
            }}
          />
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

