"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/constants";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturedCategories() {
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
          <span className="badge badge-gold mb-3">Our Collection</span>
          <Typography component="h2" variant="h3" className="text-maroon-900 mb-3 font-bold font-primary">
            Premium Sweet <span className="text-gradient-gold">Categories</span>
          </Typography>
          <Typography variant="body2" className="text-cream-900 text-xs max-w-2xl mx-auto">
            From classic Besan Laddus to exclusive Corporate Gift Hampers - every category crafted
            with the finest ingredients and a mother&apos;s love.
          </Typography>
          <hr className="divider-gold w-24 mx-auto mt-4" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Card className="rounded-[28px] border border-cream-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardActionArea component="a" href={`/categories/${cat.slug}`} className="rounded-[28px]">
                  <CardContent className="p-6 text-center bg-cream-50">
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      className="text-maroon-800 font-semibold leading-tight"
                      sx={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {cat.name}
                    </Typography>
                    <Box className="mx-auto mt-3 h-0.5 w-14 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button
            component={Link}
            href="/categories"
            variant="outlined"
            color="secondary"
            endIcon={<ArrowRight size={16} />}
            className="inline-flex rounded-full border-2 border-gold-300 px-6 py-3 text-sm font-semibold"
          >
            View All Categories
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
