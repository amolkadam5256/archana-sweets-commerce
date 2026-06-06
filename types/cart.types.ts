import type { Product, ProductVariant } from "./product.types";

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId: string;
  variant: ProductVariant;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}
