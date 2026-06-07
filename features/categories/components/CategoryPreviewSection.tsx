"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button, Typography } from "@mui/material";

const categoryPreview = {
  name: "Premium Festival Gift Set",
  price: "₹1,299",
  href: "/gift-boxes/premium",
  breadcrumbs: [
    { id: 1, name: "Gift Boxes", href: "/gift-boxes" },
    { id: 2, name: "Premium", href: "/gift-boxes/premium" },
  ],
  images: [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "An elegant gift box of Indian sweets arranged with flowers.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "A premium box with assorted laddus and burfis inside.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "A close-up of the luxurious packaging with golden accents.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "A festive tray with sweets and seasonal garnish.",
    },
  ],
  colors: [
    { id: "gold", name: "Gold", classes: "bg-amber-200 checked:outline-amber-500" },
    { id: "maroon", name: "Maroon", classes: "bg-maroon-900 checked:outline-maroon-500" },
    { id: "emerald", name: "Emerald", classes: "bg-emerald-500 checked:outline-emerald-500" },
  ],
  sizes: [
    { id: "250g", name: "250g", inStock: true },
    { id: "500g", name: "500g", inStock: true },
    { id: "750g", name: "750g", inStock: false },
    { id: "1kg", name: "1kg", inStock: true },
  ],
  description:
    "A premium festival gift box curated for celebrations in Pune. Pure ghee sweets, hand-packed in elegant packaging, ready for gifting to family and corporate clients.",
  highlights: [
    "Premium handcrafted sweets",
    "Luxury festive packaging",
    "Delivered fresh same-day in Pune",
    "Perfect for gifting and special occasions",
  ],
  details:
    "This set includes handcrafted Besan Laddus, Kaju Barfi, Dry Fruit Sweets and our signature festival favorites. Each box is prepared fresh, sealed with care, and wrapped in premium material for a memorable unboxing experience.",
};

const reviews = { href: "#", average: 5, totalCount: 324 };

function classNames(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function CategoryPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <Typography component="span" variant="body2" className="badge badge-maroon mb-3 inline-flex uppercase tracking-[0.3em] text-[11px] text-maroon-900">
            Category Preview
          </Typography>
          <Typography component="h2" variant="h3" className="text-maroon-900 mb-4 font-bold font-primary">
            Discover our <span className="text-gradient-gold">Premium Collection</span>
          </Typography>
          <Typography className="text-cream-900 text-xs max-w-2xl mx-auto">
            Preview a premium gift box category with full product details, curated imagery, and the packaging options your customers expect.
          </Typography>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="relative h-[360px] w-full overflow-hidden rounded-[28px]">
              <Image
                src={categoryPreview.images[0].src}
                alt={categoryPreview.images[0].alt}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="grid gap-4">
              <div className="relative h-[172px] w-full overflow-hidden rounded-[24px]">
                <Image
                  src={categoryPreview.images[1].src}
                  alt={categoryPreview.images[1].alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="relative h-[172px] w-full overflow-hidden rounded-[24px]">
                <Image
                  src={categoryPreview.images[2].src}
                  alt={categoryPreview.images[2].alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
            <div className="relative col-span-full h-[360px] w-full overflow-hidden rounded-[28px] lg:col-start-1 lg:col-end-3">
              <Image
                src={categoryPreview.images[3].src}
                alt={categoryPreview.images[3].alt}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          <div className="rounded-[34px] border border-cream-200 bg-cream-50 p-8 shadow-sm">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol role="list" className="flex flex-wrap items-center gap-x-2 text-xs leading-none text-slate-500">
                {categoryPreview.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id} className="flex items-center gap-2">
                    <Link href={breadcrumb.href} className="font-semibold text-slate-700 hover:text-maroon-900">
                      {breadcrumb.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </li>
                ))}
                <li className="text-slate-400">{categoryPreview.name}</li>
              </ol>
            </nav>

            <Typography component="h3" variant="h4" className="text-maroon-950 mb-4 font-bold leading-tight">
              {categoryPreview.name}
            </Typography>
            <Typography component="p" className="text-3xl font-black text-maroon-900 mb-4">
              {categoryPreview.price}
            </Typography>

            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-1 text-gold-500">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star key={rating} size={18} className={reviews.average > rating ? "text-gold-500" : "text-slate-200"} />
                ))}
              </div>
              <a href={reviews.href} className="text-sm font-semibold text-maroon-700 hover:text-maroon-900">
                {reviews.totalCount} reviews
              </a>
            </div>

            <Typography className="text-sm leading-7 text-slate-700">{categoryPreview.description}</Typography>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <Typography className="text-xs uppercase tracking-[0.25em] text-slate-500">Packaging</Typography>
                <div className="mt-3 flex flex-wrap gap-3">
                  {categoryPreview.colors.map((color) => (
                    <span
                      key={color.id}
                      className={classNames(
                        color.classes,
                        "h-9 w-9 rounded-full border border-slate-200 shadow-sm"
                      )}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Typography className="text-xs uppercase tracking-[0.25em] text-slate-500">Pack size</Typography>
                  <Link href="#" className="text-xs font-semibold text-maroon-700 hover:text-maroon-900">
                    Size guide
                  </Link>
                </div>
                <div className="mt-3 grid gap-2">
                  {categoryPreview.sizes.map((size) => (
                    <label
                      key={size.id}
                      className={classNames(
                        "flex items-center justify-center rounded-full border px-3 py-2 text-sm font-semibold",
                        size.inStock ? "border-slate-300 bg-white text-slate-900" : "border-slate-200 bg-slate-100 text-slate-400"
                      )}
                    >
                      <input
                        type="radio"
                        name="pack-size"
                        value={size.id}
                        defaultChecked={size.id === "500g"}
                        disabled={!size.inStock}
                        className="sr-only"
                      />
                      {size.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <Typography className="text-sm font-semibold text-slate-900">Highlights</Typography>
                <ul role="list" className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {categoryPreview.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div>
                <Typography className="text-sm font-semibold text-slate-900">Details</Typography>
                <Typography className="mt-2 text-sm leading-7 text-slate-600">{categoryPreview.details}</Typography>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                component={Link}
                href={categoryPreview.href}
                variant="contained"
                color="secondary"
                className="rounded-full px-6 py-3 text-sm font-semibold"
                endIcon={<ArrowRight size={16} />}
              >
                Explore this collection
              </Button>
              <Button
                component={Link}
                href="/shop"
                variant="outlined"
                color="secondary"
                className="rounded-full border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900"
              >
                View all sweets
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
