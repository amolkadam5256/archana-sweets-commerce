import { Header } from "@/components/layout/Header";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CartDrawer } from "@/components/layout/CartDrawer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-primary">
      <Header />
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
        {children}
      </main>
      <SearchOverlay />
      <CartDrawer />
    </div>
  );
}
