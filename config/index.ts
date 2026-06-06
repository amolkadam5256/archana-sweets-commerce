// App Config
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "Archana Sweets",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || "Made With Mother's Love",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    GOOGLE: "/auth/google",
    SEND_OTP: "/auth/otp/send",
    VERIFY_OTP: "/auth/otp/verify",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    ME: "/auth/me",
  },
  USERS: {
    PROFILE: "/users/me",
    UPDATE_PROFILE: "/users/me",
    ADDRESSES: "/users/me/addresses",
    ADDRESS: (id: string) => `/users/me/addresses/${id}`,
  },
  PRODUCTS: {
    LIST: "/products",
    DETAIL: (slug: string) => `/products/${slug}`,
    FEATURED: "/products/featured",
    BEST_SELLERS: "/products/best-sellers",
    SEARCH: "/products/search",
  },
  CATEGORIES: {
    LIST: "/categories",
    DETAIL: (slug: string) => `/categories/${slug}`,
    PRODUCTS: (slug: string) => `/categories/${slug}/products`,
  },
  CART: {
    GET: "/cart",
    ADD: "/cart/items",
    UPDATE: (itemId: string) => `/cart/items/${itemId}`,
    REMOVE: (itemId: string) => `/cart/items/${itemId}`,
    CLEAR: "/cart/clear",
    APPLY_COUPON: "/cart/coupon",
    REMOVE_COUPON: "/cart/coupon",
  },
  WISHLIST: {
    GET: "/wishlist",
    ADD: "/wishlist",
    REMOVE: (productId: string) => `/wishlist/${productId}`,
  },
  ORDERS: {
    LIST: "/orders",
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: "/orders",
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    TRACKING: (id: string) => `/orders/${id}/tracking`,
  },
  PAYMENTS: {
    CREATE_ORDER: "/payments/create-order",
    VERIFY: "/payments/verify",
  },
  REVIEWS: {
    LIST: (productId: string) => `/products/${productId}/reviews`,
    CREATE: (productId: string) => `/products/${productId}/reviews`,
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCTS: "/admin/products",
    PRODUCT: (id: string) => `/admin/products/${id}`,
    CATEGORIES: "/admin/categories",
    ORDERS: "/admin/orders",
    ORDER: (id: string) => `/admin/orders/${id}`,
    CUSTOMERS: "/admin/customers",
    COUPONS: "/admin/coupons",
    INVENTORY: "/admin/inventory",
    ANALYTICS: "/admin/analytics",
    BANNERS: "/admin/banners",
  },
} as const;
