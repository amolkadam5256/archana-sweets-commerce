import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isAuthModalOpen: boolean;
  authModalMode: "login" | "register" | "otp";
  globalLoading: boolean;
}

const initialState: UiState = {
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  isAuthModalOpen: false,
  authModalMode: "login",
  globalLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => { state.isMobileMenuOpen = !state.isMobileMenuOpen; },
    closeMobileMenu: (state) => { state.isMobileMenuOpen = false; },
    openCart: (state) => { state.isCartOpen = true; },
    closeCart: (state) => { state.isCartOpen = false; },
    toggleCart: (state) => { state.isCartOpen = !state.isCartOpen; },
    openSearch: (state) => { state.isSearchOpen = true; },
    closeSearch: (state) => { state.isSearchOpen = false; },
    openAuthModal: (state, action: PayloadAction<"login" | "register" | "otp">) => {
      state.isAuthModalOpen = true;
      state.authModalMode = action.payload;
    },
    closeAuthModal: (state) => { state.isAuthModalOpen = false; },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const {
  toggleMobileMenu, closeMobileMenu,
  openCart, closeCart, toggleCart,
  openSearch, closeSearch,
  openAuthModal, closeAuthModal,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
