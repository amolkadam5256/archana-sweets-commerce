// Brand
export const BRAND = {
  name: "Archana Sweets",
  tagline: "Mother's Love",
  domain: "archanasweets.com",
  email: "support@archanasweets.com",
  phone: "+91 77092 66280",
  whatsapp: "917709266280",
  address: "Pune, Maharashtra, India",
  gst: "27XXXXX0000X1ZX",
  social: {
    instagram: "https://instagram.com/archanasweets",
    facebook: "https://facebook.com/archanasweets",
    youtube: "https://youtube.com/@archanasweets",
  },
} as const;

// Navigation
// Navigation Categories & Sublinks (6 Primary Items Max)
export const NAV_STRUCTURE = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop/new-arrivals" },
      { label: "Best Sellers", href: "/shop/best-sellers" },
      { label: "Sugar Free", href: "/shop/sugar-free" },
      { label: "Premium Collection", href: "/shop/premium" }
    ]
  },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "Kaju Sweets", href: "/categories/kaju-sweets" },
      { label: "Milk Sweets", href: "/categories/milk-sweets" },
      { label: "Dry Fruit Sweets", href: "/categories/dry-fruit-sweets" },
      { label: "Laddu", href: "/categories/laddu" },
      { label: "Barfi", href: "/categories/barfi" },
      { label: "Peda", href: "/categories/peda" },
      { label: "Bengali Sweets", href: "/categories/bengali-sweets" },
      { label: "Halwa", href: "/categories/halwa" },
      { label: "Gift Boxes", href: "/categories/gift-boxes" }
    ]
  },
  {
    label: "Gift Boxes",
    href: "/gift-boxes",
    children: [
      { label: "Premium Gift Boxes", href: "/gift-boxes/premium" },
      { label: "Corporate Gifts", href: "/gift-boxes/corporate" },
      { label: "Wedding Gifts", href: "/gift-boxes/wedding" },
      { label: "Family Packs", href: "/gift-boxes/family" },
      { label: "Custom Gift Boxes", href: "/gift-boxes/custom" }
    ]
  },
  {
    label: "Festivals",
    href: "/festival-specials",
    children: [
      { label: "Diwali Collection", href: "/festival-specials/diwali" },
      { label: "Raksha Bandhan", href: "/festival-specials/raksha-bandhan" },
      { label: "Ganesh Chaturthi", href: "/festival-specials/ganesh-chaturthi" },
      { label: "Holi Collection", href: "/festival-specials/holi" },
      { label: "Seasonal Specials", href: "/festival-specials/seasonal" }
    ]
  },
  {
    label: "Bulk Orders",
    href: "/bulk-orders",
    children: [
      { label: "Corporate Orders", href: "/bulk-orders/corporate" },
      { label: "Event Orders", href: "/bulk-orders/events" },
      { label: "Wedding Orders", href: "/bulk-orders/weddings" },
      { label: "Catering Orders", href: "/bulk-orders/catering" }
    ]
  },
  { label: "Contact", href: "/contact" },
] as const;


export const NAV_LINKS = NAV_STRUCTURE;

export const ACCOUNT_LINKS = [
  { label: "Profile", href: "/dashboard/profile" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Wishlist", href: "/dashboard/wishlist" },
  { label: "Addresses", href: "/dashboard/addresses" },
  { label: "Rewards", href: "/dashboard/rewards" },
] as const;

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: "kaju-sweets", name: "Kaju Sweets", slug: "kaju-sweets" },
  { id: "milk-sweets", name: "Milk Sweets", slug: "milk-sweets" },
  { id: "dry-fruit", name: "Dry Fruit Sweets", slug: "dry-fruit-sweets" },
  { id: "laddu", name: "Laddu", slug: "laddu" },
  { id: "barfi", name: "Barfi", slug: "barfi" },
  { id: "peda", name: "Peda", slug: "peda" },
  { id: "bengali", name: "Bengali Sweets", slug: "bengali-sweets" },
  { id: "halwa", name: "Halwa", slug: "halwa" },
  { id: "gift-boxes", name: "Gift Boxes", slug: "gift-boxes" },
] as const;

// Order Status Labels
export const ORDER_STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Preparing",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
} as const;

// Payment Methods
export const PAYMENT_METHODS = [
  { id: "razorpay", label: "Pay Online", description: "UPI / Cards / Net Banking" },
  { id: "cod", label: "Cash on Delivery", description: "Pay when you receive" },
] as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [12, 20, 40, 60];

// Free Delivery Threshold
export const FREE_DELIVERY_THRESHOLD = 999;
export const DELIVERY_FEE = 99;

// OTP Config
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 10;
export const OTP_RESEND_COOLDOWN_SECONDS = 30;

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "as_access_token",
  REFRESH_TOKEN: "as_refresh_token",
  CART: "as_cart",
  WISHLIST: "as_wishlist",
  THEME: "as_theme",
} as const;

// Query Keys
export const QUERY_KEYS = {
  PRODUCTS: "products",
  PRODUCT: "product",
  CATEGORIES: "categories",
  CART: "cart",
  WISHLIST: "wishlist",
  ORDERS: "orders",
  ORDER: "order",
  USER: "user",
  REVIEWS: "reviews",
  FEATURED_PRODUCTS: "featured-products",
  BEST_SELLERS: "best-sellers",
} as const;
