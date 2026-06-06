export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  children?: Category[];
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}

export type WeightUnit = "g" | "kg" | "piece" | "box" | "pack";

export interface ProductVariant {
  id: string;
  weight: number;
  unit: WeightUnit;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  minPrice: number;
  maxPrice: number;
  minOrderQuantity: number;
  shelfLife: string;
  ingredients?: string;
  allergens?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "rating" | "newest" | "popular";
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user: { firstName: string; lastName: string; avatar?: string };
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}
