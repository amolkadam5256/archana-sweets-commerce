import type { Address } from "./user.types";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentMethod =
  | "razorpay"
  | "upi"
  | "credit_card"
  | "debit_card"
  | "net_banking"
  | "cod";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variantId: string;
  variantLabel: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  notes?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderTracking {
  orderId: string;
  status: OrderStatus;
  timeline: OrderTrackingEvent[];
}

export interface OrderTrackingEvent {
  status: OrderStatus;
  description: string;
  timestamp: string;
  isCompleted: boolean;
}
