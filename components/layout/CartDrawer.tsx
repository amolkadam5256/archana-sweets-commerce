"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeCart } from "@/store/slices/ui.slice";
import { removeItem, selectCartItems, selectCartTotals, updateQuantity } from "@/features/cart/cart.slice";
import { FREE_DELIVERY_THRESHOLD } from "@/constants";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector((state) => state.ui.isCartOpen);
  const cartItems = useAppSelector(selectCartItems);
  const { subtotal, total, deliveryFee } = useAppSelector(selectCartTotals);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const { progress, progressLabel } = useMemo(() => {
    const currentProgress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
    const currentRemaining = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0);

    return {
      progress: currentProgress,
      progressLabel:
        currentRemaining > 0
          ? `Add ₹${currentRemaining} more for free delivery`
          : "🎉 You’ve unlocked free delivery!",
    };
  }, [subtotal]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-slate-950/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
          />

          <motion.aside
            className="fixed inset-y-0 right-0 z-[110] flex w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 sm:max-w-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 210 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
          >
            <div className="flex items-center justify-between gap-4 border-b border-cream-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-maroon-50 text-maroon-800">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-maroon-500">Shopping cart</p>
                  <h2 id="cart-drawer-title" className="text-lg font-bold text-maroon-950">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => dispatch(closeCart())}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-maroon-700 transition hover:bg-maroon-50"
                aria-label="Close cart drawer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="border-b border-cream-200 bg-cream-50 px-6 py-4">
              <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.3em] text-maroon-500">
                <span>{progressLabel}</span>
                <span className="font-semibold">Limit ₹{FREE_DELIVERY_THRESHOLD}</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-cream-200">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 text-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-maroon-100 text-maroon-700">
                    <ShoppingCart size={30} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-maroon-950">Your cart is empty</h3>
                    <p className="mt-2 text-sm leading-6 text-maroon-500">
                      Add premium sweets, festive gift boxes, or celebration bundles to begin.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={() => dispatch(closeCart())}
                    className="inline-flex rounded-full bg-maroon-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-maroon-800"
                  >
                    Start shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid gap-4 rounded-[28px] border border-cream-200 bg-white p-4 shadow-sm sm:grid-cols-[82px_minmax(0,1fr)]">
                      <div className="relative overflow-hidden rounded-3xl bg-cream-50 min-h-[120px]">
                        {item.product.images?.[0] ? (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="grid h-full min-h-[120px] place-items-center text-3xl text-maroon-300">
                            🍬
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-maroon-950 truncate">{item.product.name}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-maroon-500">
                            {item.variant.weight} {item.variant.unit}
                          </p>
                          <p className="mt-2 text-sm text-maroon-700">₹{item.totalPrice}</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-cream-200 bg-cream-50 px-2 py-1">
                            <button
                              type="button"
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-maroon-700 transition hover:bg-maroon-100"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-[32px] text-center text-sm font-bold text-maroon-900">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-maroon-700 transition hover:bg-maroon-100"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => dispatch(removeItem(item.id))}
                            className="text-sm font-semibold text-maroon-500 transition hover:text-red-500"
                          >
                            <span className="inline-flex items-center gap-2">
                              <Trash2 size={16} /> Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-cream-200 bg-white p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-maroon-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-maroon-950">₹{subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-maroon-500">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? "font-semibold text-green-600" : "font-semibold text-maroon-950"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="h-px bg-cream-100" />
                  <div className="flex items-center justify-between text-lg font-bold text-maroon-950">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <Link
                    href="/checkout"
                    onClick={() => dispatch(closeCart())}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-maroon-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-maroon-800"
                  >
                    Checkout
                    <ArrowRight size={18} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => dispatch(closeCart())}
                    className="inline-flex items-center justify-center rounded-full border border-cream-200 bg-white px-6 py-3 text-sm font-semibold text-maroon-700 transition hover:bg-cream-50"
                  >
                    Continue shopping
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
