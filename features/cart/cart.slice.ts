import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/constants";

interface CartState {
  items: CartItem[];
  couponCode?: string;
  couponDiscount: number;
}

const calculateTotals = (state: CartState) => {
  const subtotal = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = state.couponDiscount;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal - discount + deliveryFee;
  return { subtotal, discount, deliveryFee, total };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], couponCode: undefined, couponDiscount: 0 } as CartState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId && i.variantId === action.payload.variantId
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
        existing.totalPrice = existing.quantity * existing.price;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        item.totalPrice = item.quantity * item.price;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.couponCode = undefined;
      state.couponDiscount = 0;
    },
    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.couponCode = action.payload.code;
      state.couponDiscount = action.payload.discount;
    },
    removeCoupon: (state) => {
      state.couponCode = undefined;
      state.couponDiscount = 0;
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addItem, updateQuantity, removeItem,
  clearCart, applyCoupon, removeCoupon, setCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotals = (state: { cart: CartState }) =>
  calculateTotals(state.cart);

export default cartSlice.reducer;
