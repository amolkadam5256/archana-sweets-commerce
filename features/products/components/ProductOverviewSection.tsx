"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Box, Button, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";

const RELATED_SWEETS = [
  {
    id: "besan-laddu",
    name: "Signature Besan Laddu",
    category: "Laddu",
    price: 380,
    href: "/shop",
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Premium besan laddu arranged on a festive plate.",
    description: "Soft, melt-in-mouth laddus made with pure ghee and traditional spices for every celebration.",
    rating: 4.9,
  },
  {
    id: "kaju-barfi",
    name: "Premium Kaju Barfi",
    category: "Kaju Sweets",
    price: 750,
    href: "/shop",
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
    imageAlt: "Slices of premium kaju barfi with a festive garnish.",
    description: "Rich cashew barfi with a delicate sweet finish, handcrafted in small batches.",
    rating: 4.8,
  },
  {
    id: "dry-fruit-laddu",
    name: "Festive Dry Fruit Laddu",
    category: "Festival Specials",
    price: 680,
    href: "/shop",
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
    imageAlt: "A box of dry fruit laddus wrapped in traditional packaging.",
    description: "Premium dry fruit laddus with almonds, cashews, pistachios and pure ghee for gifting.",
    rating: 4.9,
  },
  {
    id: "gift-box",
    name: "Corporate Gift Box",
    category: "Gift Boxes",
    price: 1299,
    href: "/gift-boxes/premium",
    imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
    imageAlt: "Elegant premium gift box of Indian sweets with ribbon.",
    description: "A curated gift box filled with Archana Sweets favourites, perfect for corporate and family gifting.",
    rating: 5.0,
  },
];

export function ProductOverviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="badge badge-maroon mb-3">Product Overviews</span>
          <Typography component="h2" variant="h3" className="text-maroon-950 mb-4 font-bold font-primary">
            Related sweets from <span className="text-gradient-gold">Archana Sweets</span>
          </Typography>
          <Typography variant="body2" className="text-cream-900 text-xs max-w-2xl mx-auto">
            Discover handcrafted sweets, festival favourites and premium gift sets that reflect the authentic taste of Pune.
          </Typography>
          <hr className="divider-gold w-24 mx-auto mt-4" />
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-2">
          {RELATED_SWEETS.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="group overflow-hidden rounded-[32px] border border-cream-200 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <CardActionArea component={Link} href={product.href} className="rounded-[32px]">
                  <Box className="relative overflow-hidden">
                    <div className="relative h-64 w-full">
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                    <Chip
                      label={product.category}
                      size="small"
                      className="absolute left-4 top-4 rounded-full bg-white/90 text-maroon-900 font-semibold"
                    />
                  </Box>
                  <CardContent className="space-y-4 p-6 bg-cream-50">
                    <div className="space-y-2">
                      <Typography component="h3" variant="h6" className="text-maroon-950 font-bold leading-tight">
                        {product.name}
                      </Typography>
                      <Typography className="text-sm text-maroon-600 leading-6">
                        {product.description}
                      </Typography>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <Typography className="text-lg font-bold text-maroon-950">₹{product.price}</Typography>
                        <Typography className="text-xs text-maroon-500">Premium sweets</Typography>
                      </div>
                      <div className="flex items-center gap-1 text-gold-500">
                        {[...Array(5)].map((_, index) => (
                          <Star key={index} size={16} className={index < Math.round(product.rating) ? "text-gold-500" : "text-cream-300"} />
                        ))}
                      </div>
                    </div>
                    <Button
                      component={Link}
                      href={product.href}
                      variant="contained"
                      color="secondary"
                      endIcon={<ArrowRight size={18} />}
                      className="rounded-full px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      View product
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
