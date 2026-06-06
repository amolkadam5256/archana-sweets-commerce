"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { closeCart } from "@/store/slices/ui.slice";
import { selectCartItems, selectCartTotals, updateQuantity, removeItem } from "@/features/cart/cart.slice";
import { useEffect } from "react";
import Link from "next/link";
import { FREE_DELIVERY_THRESHOLD } from "@/constants";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector((s) => s.ui.isCartOpen);
  const cartItems = useAppSelector(selectCartItems);
  const { subtotal, total, deliveryFee } = useAppSelector(selectCartTotals);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen]);

  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 z-[100] bg-maroon-950/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[110] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-cream-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-maroon-50 flex items-center justify-center text-maroon-700">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-maroon-900 leading-tight">My Basket</h2>
                  <p className="text-xs text-maroon-400 font-medium">
                    {cartItems.length} items selected
                  </p>
                </div>
              </div>
              <button
                onClick={() => dispatch(closeCart())}
                className="p-2 rounded-full hover:bg-maroon-50 text-maroon-700 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Delivery Progress */}
            <div className="px-6 py-4 bg-cream-50 border-b border-cream-100">
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-bold text-maroon-800 uppercase tracking-wider">
                  {remaining > 0 
                    ? `Add ₹${remaining} more for FREE delivery` 
                    : "🎉 You've unlocked FREE delivery!"}
                </p>
                <p className="text-[10px] font-bold text-maroon-400">Limit: ₹{FREE_DELIVERY_THRESHOLD}</p>
              </div>
              <div className="h-2 w-full bg-cream-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full bg-cream-50 flex items-center justify-center text-cream-200 mb-6">
                    <ShoppingCart size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-maroon-900 mb-2">Your basket is empty</h3>
                  <p className="text-maroon-400 text-sm max-w-xs mx-auto mb-8">
                    Looks like you haven&apos;t added any sweets yet. Explore our delicious collection!
                  </p>
                  <Link 
                    href="/shop" 
                    onClick={() => dispatch(closeCart())}
                    className="btn-primary"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl bg-cream-50 border border-cream-100 overflow-hidden flex-shrink-0">
                      {item.product.images?.[0] ? (
                        <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-maroon-50 flex items-center justify-center text-2xl">
                          🍬
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-maroon-900 truncate pr-4">{item.product.name}</h4>
                        <p className="font-bold text-maroon-900">₹{item.totalPrice}</p>
                      </div>
                      <p className="text-xs text-maroon-400 mb-3">
                        {item.variant.weight} {item.variant.unit} @ ₹{item.price}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-maroon-50 rounded-lg p-1 border border-maroon-100">
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                            className="p-1 hover:text-maroon-600 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-bold text-maroon-900">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="p-1 hover:text-maroon-600 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => dispatch(removeItem(item.id))}
                          className="text-maroon-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-cream-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-maroon-500">Subtotal</span>
                    <span className="font-bold text-maroon-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-maroon-500">Delivery</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-bold uppercase text-[10px]" : "font-bold text-maroon-900"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="h-px bg-cream-100" />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-maroon-950">Total</span>
                    <span className="font-bold text-maroon-950">₹{total}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <Link
                    href="/checkout"
                    onClick={() => dispatch(closeCart())}
                    className="w-full btn-primary py-4 flex items-center justify-center gap-2 group shadow-lg shadow-maroon-200"
                  >
                    Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => dispatch(closeCart())}
                    className="w-full text-center py-3 text-sm font-bold text-maroon-400 hover:text-maroon-600 transition-colors"
                  >
                    View Shopping Basket
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
