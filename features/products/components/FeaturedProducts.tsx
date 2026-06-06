"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingCart, Star } from "lucide-react";
import { calculateDiscount, formatPrice } from "@/utils";

const MOCK_PRODUCTS = [
  { id: "1", name: "Classic Besan Laddu", slug: "classic-besan-laddu", price: 380, originalPrice: 450, rating: 4.9, reviewCount: 234, weight: "500g", mark: "BL", isNew: false, isBestSeller: true },
  { id: "2", name: "Dry Fruit Special Laddu", slug: "dry-fruit-special", price: 680, originalPrice: 800, rating: 4.8, reviewCount: 189, weight: "500g", mark: "DF", isNew: true, isBestSeller: false },
  { id: "3", name: "Coconut Laddu", slug: "coconut-laddu", price: 320, originalPrice: 380, rating: 4.7, reviewCount: 156, weight: "500g", mark: "CL", isNew: false, isBestSeller: false },
  { id: "4", name: "Motichoor Laddu", slug: "motichoor-laddu", price: 350, originalPrice: 420, rating: 4.9, reviewCount: 312, weight: "500g", mark: "ML", isNew: false, isBestSeller: true },
  { id: "5", name: "Rava Laddu", slug: "rava-laddu", price: 290, originalPrice: 350, rating: 4.6, reviewCount: 98, weight: "500g", mark: "RL", isNew: false, isBestSeller: false },
  { id: "6", name: "Kaju Barfi", slug: "kaju-barfi", price: 750, originalPrice: 900, rating: 4.9, reviewCount: 421, weight: "500g", mark: "KB", isNew: true, isBestSeller: true },
  { id: "7", name: "Steamed Modak", slug: "steamed-modak", price: 420, originalPrice: 500, rating: 4.8, reviewCount: 167, weight: "12 pcs", mark: "MD", isNew: false, isBestSeller: false },
  { id: "8", name: "Festival Gift Box", slug: "festival-gift-box", price: 1200, originalPrice: 1500, rating: 5.0, reviewCount: 89, weight: "1kg", mark: "GB", isNew: true, isBestSeller: true },
];

function ProductCard({ product }: { product: typeof MOCK_PRODUCTS[0] }) {
  const discount = calculateDiscount(product.originalPrice, product.price);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="product-card group"
    >
      <div className="product-card-image bg-cream-50 aspect-square relative flex items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold-500 bg-white text-2xl font-bold tracking-widest text-maroon-700 shadow-sm group-hover:scale-110 transition-transform duration-400">
          {product.mark}
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="badge badge-gold text-xs">Best Seller</span>
          )}
          {product.isNew && (
            <span className="badge badge-maroon text-xs">New</span>
          )}
        </div>

        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-rich-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </div>
        )}

        <button
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-maroon-400 hover:text-maroon-600 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart size={15} />
        </button>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3
            className="text-maroon-800 font-semibold text-lg mb-1 hover:text-maroon-500 transition-colors line-clamp-1"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-cream-700 text-xs mb-2">{product.weight}</p>

        <div className="flex items-center gap-1 mb-3">
          <Star size={12} fill="currentColor" className="text-gold-500" />
          <span className="text-sm font-semibold text-maroon-700">{product.rating}</span>
          <span className="text-xs text-cream-700">({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-maroon-800 font-bold text-xl">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-cream-600 text-xs line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button className="w-full btn-primary text-xs py-2 flex items-center justify-center gap-1.5">
          <ShoppingCart size={13} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge badge-maroon mb-3">Best Sellers</span>
          <h2 className="text-maroon-900 mb-3 text-2xl sm:text-3xl font-bold font-primary">
            Our Most{" "}
            <span className="text-gradient-gold">Loved Sweets</span>
          </h2>
          <p className="text-cream-900 text-xs max-w-2xl mx-auto">
            Handpicked favourites - made fresh every morning with pure ghee and organic ingredients.
          </p>
          <hr className="divider-gold w-24 mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="products-grid"
        >
          {MOCK_PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/shop" className="btn-primary group inline-flex">
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
