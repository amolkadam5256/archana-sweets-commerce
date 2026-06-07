import Link from "next/link";

export default function AdminHomePage() {
  return (
    <main className="min-h-screen px-6 py-10 bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Admin panel</h1>
        <p className="text-base text-slate-600">Access product, order, customer and category tools.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/admin/dashboard" className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300">
            <h2 className="text-xl font-medium">Dashboard</h2>
            <p className="mt-2 text-sm text-slate-600">View site metrics and store overview.</p>
          </Link>
          <Link href="/admin/products" className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300">
            <h2 className="text-xl font-medium">Products</h2>
            <p className="mt-2 text-sm text-slate-600">Manage sweets, variants, and featured items.</p>
          </Link>
          <Link href="/admin/orders" className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300">
            <h2 className="text-xl font-medium">Orders</h2>
            <p className="mt-2 text-sm text-slate-600">Track and process customer orders.</p>
          </Link>
          <Link href="/admin/customers" className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300">
            <h2 className="text-xl font-medium">Customers</h2>
            <p className="mt-2 text-sm text-slate-600">Review user accounts and customer activity.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
