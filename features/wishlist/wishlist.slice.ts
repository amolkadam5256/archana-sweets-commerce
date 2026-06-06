import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WishlistItem } from "@/types";

interface WishlistState {
  items: WishlistItem[];
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] } as WishlistState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find((i) => i.productId === action.payload.productId);
      if (!exists) state.items.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const index = state.items.findIndex((i) => i.productId === action.payload.productId);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, setWishlist, clearWishlist } =
  wishlistSlice.actions;

export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;
export const selectWishlistCount = (state: { wishlist: WishlistState }) => state.wishlist.items.length;
export const selectIsInWishlist = (productId: string) => (state: { wishlist: WishlistState }) =>
  state.wishlist.items.some((i) => i.productId === productId);

export default wishlistSlice.reducer;
