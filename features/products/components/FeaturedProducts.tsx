"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Copy, Eye, Heart, Scale, Share2, ShoppingCart, Star, X } from "lucide-react";
import { calculateDiscount, formatPrice } from "@/utils";

import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store";
import { addItem } from "@/features/cart/cart.slice";
import { selectIsInWishlist, toggleWishlist } from "@/features/wishlist/wishlist.slice";
import type { Product } from "@/types";

const MOCK_PRODUCTS = [
  { id: "1", name: "Classic Besan Laddu", slug: "classic-besan-laddu", price: 380, originalPrice: 450, rating: 4.9, reviewCount: 234, weight: "500g", mark: "BL", isNew: false, isBestSeller: true, description: "Slow-roasted besan, pure ghee, cardamom, and a soft melt-in-mouth finish." },
  { id: "2", name: "Dry Fruit Special Laddu", slug: "dry-fruit-special", price: 680, originalPrice: 800, rating: 4.8, reviewCount: 189, weight: "500g", mark: "DF", isNew: true, isBestSeller: false, description: "A rich festive laddu packed with almonds, cashews, pistachio, dates, and pure ghee." },
  { id: "3", name: "Coconut Laddu", slug: "coconut-laddu", price: 320, originalPrice: 380, rating: 4.7, reviewCount: 156, weight: "500g", mark: "CL", isNew: false, isBestSeller: false, description: "Fresh coconut laddus with a delicate sweetness and traditional homemade texture." },
  { id: "4", name: "Motichoor Laddu", slug: "motichoor-laddu", price: 350, originalPrice: 420, rating: 4.9, reviewCount: 312, weight: "500g", mark: "ML", isNew: false, isBestSeller: true, description: "Fine boondi pearls bound with aromatic syrup for weddings, pooja, and celebrations." },
  { id: "5", name: "Rava Laddu", slug: "rava-laddu", price: 290, originalPrice: 350, rating: 4.6, reviewCount: 98, weight: "500g", mark: "RL", isNew: false, isBestSeller: false, description: "Roasted rava, coconut, nuts, and ghee in a classic family-favourite laddu." },
  { id: "6", name: "Kaju Barfi", slug: "kaju-barfi", price: 750, originalPrice: 900, rating: 4.9, reviewCount: 421, weight: "500g", mark: "KB", isNew: true, isBestSeller: true, description: "Premium cashew barfi with a smooth bite, clean sweetness, and festive finish." },
  { id: "7", name: "Steamed Modak", slug: "steamed-modak", price: 420, originalPrice: 500, rating: 4.8, reviewCount: 167, weight: "12 pcs", mark: "MD", isNew: false, isBestSeller: false, description: "Ukadiche modak filled with coconut-jaggery goodness, made fresh for pooja orders." },
  { id: "8", name: "Festival Gift Box", slug: "festival-gift-box", price: 1200, originalPrice: 1500, rating: 5.0, reviewCount: 89, weight: "1kg", mark: "GB", isNew: true, isBestSeller: true, description: "A curated assortment of Archana favourites in premium festive packaging." },
];

type MockProduct = (typeof MOCK_PRODUCTS)[number];

function productToCartProduct(product: MockProduct): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.description,
    description: product.description,
    categoryId: "best-sellers",
    category: {
      id: "best-sellers",
      name: "Best Sellers",
      slug: "best-sellers",
      isActive: true,
      sortOrder: 1,
    },
    images: [],
    variants: [
      {
        id: `${product.id}-standard`,
        weight: product.weight.includes("kg") ? Number.parseFloat(product.weight) : Number.parseInt(product.weight, 10) || 1,
        unit: product.weight.includes("kg") ? "kg" : product.weight.includes("pcs") ? "piece" : "g",
        price: product.price,
        originalPrice: product.originalPrice,
        stock: 25,
        sku: `AS-${product.mark}-STD`,
      },
    ],
    tags: product.isBestSeller ? ["best-seller"] : [],
    isFeatured: true,
    isBestSeller: product.isBestSeller,
    isNew: product.isNew,
    isActive: true,
    rating: product.rating,
    reviewCount: product.reviewCount,
    minPrice: product.price,
    maxPrice: product.price,
    minOrderQuantity: 1,
    shelfLife: "7 days",
    ingredients: "Pure ghee, premium ingredients, traditional spices",
    allergens: "May contain milk and nuts",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function ProductSkeleton() {
  return (
    <div className="product-card flex flex-col bg-white border border-cream-100/50 rounded-2xl overflow-hidden shadow-sm h-[320px]">
      <div className="w-full aspect-square relative bg-white/50 p-2">
        <Skeleton height="100%" borderRadius="16px" />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-end">
        <Skeleton width="80%" height={24} className="mb-2" />
        <Skeleton width="40%" height={16} className="mb-3" />
        <div className="flex gap-2 mb-3">
          <Skeleton width={100} height={20} />
        </div>
        <Skeleton height={36} borderRadius="8px" />
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onQuickView,
  onCompare,
  isCompared,
}: {
  product: MockProduct;
  onQuickView: (product: MockProduct) => void;
  onCompare: (product: MockProduct) => void;
  isCompared: boolean;
}) {
  const dispatch = useAppDispatch();
  const discount = calculateDiscount(product.originalPrice, product.price);
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));

  const handleAddToCart = () => {
    const cartProduct = productToCartProduct(product);
    const variant = cartProduct.variants[0];
    dispatch(addItem({
      id: `${product.id}-${variant.id}`,
      productId: product.id,
      product: cartProduct,
      variantId: variant.id,
      variant,
      quantity: 1,
      price: product.price,
      totalPrice: product.price,
    }));
    toast.success(`${product.name} added to basket`);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist({
      id: product.id,
      productId: product.id,
      product: productToCartProduct(product),
      addedAt: new Date().toISOString(),
    }));
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const shareProduct = async () => {
    const url = `${window.location.origin}/products/${product.slug}`;
    if (navigator.share) {
      await navigator.share({ title: product.name, text: product.description, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success("Product link copied");
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="product-card group relative bg-white border border-cream-100 hover:border-gold-300 transition-colors shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(120,20,30,0.15)] rounded-2xl overflow-hidden"
    >
      <div className="product-card-image bg-cream-50 aspect-square relative flex items-center justify-center overflow-hidden">
        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
        
        <motion.div 
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-2 border-gold-400 bg-white shadow-lg text-3xl font-bold tracking-widest text-maroon-700 font-primary"
        >
          {product.mark}
        </motion.div>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          {product.isBestSeller && (
            <span className="badge badge-gold text-[10px] uppercase tracking-wider font-bold shadow-sm">Best Seller</span>
          )}
          {product.isNew && (
            <span className="badge badge-maroon text-[10px] uppercase tracking-wider font-bold shadow-sm">New</span>
          )}
        </div>

        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-maroon-900 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm z-20 border border-maroon-800">
            -{discount}%
          </div>
        )}

        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-maroon-400 hover:text-maroon-700 transition-all duration-300 border border-cream-100"
          aria-label="Add to wishlist"
        >
          <Heart size={16} strokeWidth={2.5} className={isInWishlist ? "fill-maroon-600 text-maroon-600" : ""} />
        </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView(product)}
            className="w-9 h-9 rounded-full bg-maroon-800 shadow-lg flex items-center justify-center text-white transition-all duration-300 border border-maroon-700"
            aria-label="Quick view"
          >
            <Eye size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>

      <div className="p-5">
        <Link href={`/products/${product.slug}`}>
          <h3
            className="text-maroon-900 font-bold text-base sm:text-lg mb-1 group-hover:text-gold-600 transition-colors line-clamp-1"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-maroon-700/60 text-[11px] font-semibold mb-3">{product.weight}</p>

        <div className="flex items-center gap-1.5 mb-3">
          <Star size={13} fill="currentColor" className="text-gold-500" />
          <span className="text-xs font-bold text-maroon-800">{product.rating}</span>
          <span className="text-[10px] text-maroon-700/50">({product.reviewCount} reviews)</span>
        </div>

        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-maroon-900 font-black text-xl">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-maroon-700/40 text-[11px] font-bold line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-[1fr_auto_auto] gap-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full bg-maroon-800 hover:bg-maroon-700 text-white font-bold text-[11px] uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </motion.button>
          <button
            onClick={shareProduct}
            className="w-11 h-11 rounded-lg border border-cream-200 text-maroon-600 hover:border-gold-300 hover:text-gold-700 transition-colors flex items-center justify-center"
            aria-label="Share product"
          >
            <Share2 size={15} />
          </button>
          <button
            onClick={() => onCompare(product)}
            className={`w-11 h-11 rounded-lg border transition-colors flex items-center justify-center ${isCompared ? "border-gold-400 bg-gold-50 text-gold-700" : "border-cream-200 text-maroon-600 hover:border-gold-300 hover:text-gold-700"}`}
            aria-label="Compare product"
          >
            {isCompared ? <Check size={15} /> : <Scale size={15} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function QuickViewModal({
  product,
  onClose,
}: {
  product: MockProduct | null;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();

  if (!product) return null;

  const cartProduct = productToCartProduct(product);
  const variant = cartProduct.variants[0];

  const handleAddToCart = () => {
    dispatch(addItem({
      id: `${product.id}-${variant.id}`,
      productId: product.id,
      product: cartProduct,
      variantId: variant.id,
      variant,
      quantity: 1,
      price: product.price,
      totalPrice: product.price,
    }));
    toast.success(`${product.name} added to basket`);
    onClose();
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/products/${product.slug}`);
    toast.success("Product link copied");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] bg-maroon-950/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.22 }}
          className="bg-white rounded-2xl border border-cream-200 shadow-2xl max-w-3xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-cream-50 min-h-[260px] flex items-center justify-center p-8">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-gold-400 bg-white shadow-lg text-4xl font-bold tracking-widest text-maroon-700 font-primary">
                {product.mark}
              </div>
            </div>
            <div className="p-6 sm:p-8 relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 w-9 h-9 rounded-full bg-cream-50 text-maroon-700 hover:bg-maroon-50 flex items-center justify-center"
                aria-label="Close quick view"
              >
                <X size={18} />
              </button>
              <span className="badge badge-gold mb-4">Quick View</span>
              <h3 className="text-2xl font-bold text-maroon-900 font-primary mb-2">{product.name}</h3>
              <p className="text-sm text-maroon-700/70 leading-relaxed mb-4">{product.description}</p>
              <div className="flex items-center gap-2 mb-5">
                <Star size={15} fill="currentColor" className="text-gold-500" />
                <span className="text-sm font-bold text-maroon-800">{product.rating}</span>
                <span className="text-xs text-maroon-500">({product.reviewCount} reviews)</span>
                <span className="text-xs text-maroon-400">• {product.weight}</span>
              </div>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-black text-maroon-900">{formatPrice(product.price)}</span>
                <span className="text-sm line-through text-maroon-400 mb-1">{formatPrice(product.originalPrice)}</span>
              </div>
              <div className="grid sm:grid-cols-[1fr_auto] gap-3">
                <button onClick={handleAddToCart} className="btn-primary py-4 rounded-xl">
                  <ShoppingCart size={16} /> Add To Cart
                </button>
                <button onClick={copyLink} className="btn-outline py-4 rounded-xl">
                  <Copy size={16} /> Copy Link
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function FeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<MockProduct | null>(null);
  const [compareItems, setCompareItems] = useState<MockProduct[]>([]);

  useEffect(() => {
    // Simulate network request to show off Phase 2 Skeletons
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleCompare = (product: MockProduct) => {
    setCompareItems((items) => {
      if (items.some((item) => item.id === product.id)) {
        return items.filter((item) => item.id !== product.id);
      }
      if (items.length >= 3) {
        toast.error("Compare up to 3 products");
        return items;
      }
      toast.success(`${product.name} added to compare`);
      return [...items, product];
    });
  };

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="badge badge-maroon mb-4"
          >
            Best Sellers
          </motion.span>
          <h2 className="text-maroon-900 mb-3 text-3xl sm:text-4xl font-bold font-primary">
            Our Most{" "}
            <span className="text-gradient-gold">Loved Sweets</span>
          </h2>
          <p className="text-maroon-700/70 text-[13px] max-w-2xl mx-auto leading-relaxed">
            Handpicked favourites - made fresh every morning with pure ghee and organic ingredients. 
            Experience the rich taste of tradition in every bite.
          </p>
          <hr className="divider-maroon w-24 mx-auto mt-6" />
        </motion.div>

        <SkeletonTheme baseColor="#fff9f5" highlightColor="#ffffff">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="products-grid"
          >
            {isLoading 
              ? Array.from({ length: 8 }).map((_, i) => (
                  <motion.div key={`skeleton-${i}`} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
                    <ProductSkeleton />
                  </motion.div>
                ))
              : MOCK_PRODUCTS.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={setQuickViewProduct}
                      onCompare={toggleCompare}
                      isCompared={compareItems.some((item) => item.id === product.id)}
                    />
                  </motion.div>
                ))
            }
          </motion.div>
        </SkeletonTheme>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/shop" className="bg-white border border-cream-200 text-maroon-800 font-bold text-sm tracking-wide px-8 py-3.5 rounded-xl inline-flex items-center gap-2 group hover:border-gold-400 hover:shadow-lg transition-all">
            View All Products
            <ArrowRight size={16} className="text-gold-500 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
      <AnimatePresence>
        {compareItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-gold-200 bg-white/95 p-3 shadow-2xl backdrop-blur"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {compareItems.map((item) => (
                  <span key={item.id} className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1.5 text-xs font-bold text-maroon-800">
                    {item.name}
                    <button onClick={() => toggleCompare(item)} aria-label={`Remove ${item.name} from compare`}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={() => toast.success("Compare drawer ready for product detail data")}
                className="rounded-full bg-maroon-800 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white"
              >
                Compare {compareItems.length}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}
