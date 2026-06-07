export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen px-6 py-10 bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto space-y-5">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-base text-slate-600">Admin summary, metrics, and quick actions will appear here.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Products</p>
            <p className="mt-4 text-3xl font-semibold">—</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Orders</p>
            <p className="mt-4 text-3xl font-semibold">—</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Customers</p>
            <p className="mt-4 text-3xl font-semibold">—</p>
          </div>
        </div>
      </div>
    </main>
  );
}
