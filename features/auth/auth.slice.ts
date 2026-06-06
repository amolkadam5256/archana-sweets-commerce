import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthTokens } from "@/types";
import type { User } from "@/types";
import { STORAGE_KEYS } from "@/constants";

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; tokens: AuthTokens }>
    ) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, action.payload.tokens.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, action.payload.tokens.refreshToken);
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, updateUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
