import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price in INR */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Calculate discount percentage */
export function calculateDiscount(original: number, sale: number): number {
  if (!original || original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/** Truncate text */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/** Slugify string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Format date */
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  }).format(new Date(dateStr));
}

/** Format relative time */
export function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) return formatDate(dateStr);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

/** Get star rating array */
export function getStarRating(rating: number): ("full" | "half" | "empty")[] {
  return Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return "full";
    if (i < rating) return "half";
    return "empty";
  });
}

/** Generate WhatsApp link */
export function getWhatsAppLink(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/** Validate Indian phone number */
export function isValidIndianPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));
}

/** Validate pincode */
export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode);
}

/** Get initials from name */
export function getInitials(firstName: string, lastName?: string): string {
  const first = firstName?.[0]?.toUpperCase() ?? "";
  const last = lastName?.[0]?.toUpperCase() ?? "";
  return first + last;
}

/** Deep clone object */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
