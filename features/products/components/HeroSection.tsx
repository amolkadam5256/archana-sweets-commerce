"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Gift, Leaf, MessageCircle, PackageCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { getWhatsAppLink } from "@/utils";
import { BRAND, PRODUCT_CATEGORIES } from "@/constants";
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

export function HeroSection() {
  const whatsappLink = getWhatsAppLink(
    BRAND.whatsapp,
    "Hi Archana Sweets! I'd love to order some sweets."
  );

  const trustSignals = [
    { icon: Leaf, text: "100% Pure Ghee" },
    { icon: Truck, text: "Fresh Daily" },
    { icon: PackageCheck, text: "Free delivery INR 499+" },
    { icon: Star, text: "10,000+ orders delivered" },
  ];

  const shortcutCategories = PRODUCT_CATEGORIES.slice(0, 5);

  return (
    <Box component="section" className="relative overflow-hidden bg-amber-50 text-slate-950">
      <Box className="container-custom relative z-10 pt-8 pb-16 sm:pt-12 sm:pb-20">
        <Box className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Box className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Chip
                label="Trusted luxury sweets from Pune"
                icon={<Star size={14} className="text-gold-500" />}
                variant="filled"
                color="secondary"
                className="rounded-full bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-700"
              />
              <Typography component="span" className="text-slate-600 text-sm">
                Pure ghee, fresh daily, handcrafted with love
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography component="h1" variant="h2" className="mt-6 font-bold tracking-tight leading-tight">
                Premium Indian sweets,
                <Box component="span" className="block text-gold-500">handcrafted fresh</Box>
                <Box component="span" className="block text-slate-900">with a mother&apos;s love.</Box>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography className="mt-5 max-w-xl text-sm leading-7 text-slate-700">
                Discover made-to-order laddus, barfis, modaks and festive gift boxes that feel
                luxurious, authentic and perfect for special moments in Pune.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                <Button
                  component={Link}
                  href="/shop"
                  variant="contained"
                  color="secondary"
                  size="large"
                  className="rounded-full px-8 gap-2"
                  endIcon={<ArrowRight size={18} />}
                >
                  <ShoppingBag size={18} />
                  Shop premium sweets
                </Button>
                <Button
                  component="a"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  color="secondary"
                  size="large"
                  className="rounded-full border-slate-300 bg-white text-slate-950 px-8 gap-2"
                >
                  <MessageCircle size={18} />
                  Order on WhatsApp
                </Button>
              </Stack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3} className="grid sm:grid-cols-2 gap-3">
                {trustSignals.map((item) => (
                  <Box
                    key={item.text}
                    className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm"
                  >
                    <item.icon size={18} className="text-gold-500" />
                    <Typography>{item.text}</Typography>
                  </Box>
                ))}
              </Stack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <Typography className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Shop by category
              </Typography>
              <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }} className="mt-3">
                {shortcutCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    component={Link}
                    href={`/categories/${cat.slug}`}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className="rounded-full border-slate-200 bg-white px-4 text-slate-950"
                  >
                    <Box component="span" className="h-2.5 w-2.5 rounded-full bg-gold-300" />
                    {cat.name}
                  </Button>
                ))}
              </Stack>
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-premium sm:p-6">
              <CardContent className="relative py-6 px-5 sm:px-6">
                <Box className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/90 to-transparent" />
                <Box className="relative grid gap-4 sm:grid-cols-2">
                  <Box className="rounded-[28px] border border-slate-200 bg-amber-50 p-5 text-center">
                    <Box className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-gold-600 shadow-lg">
                      <Gift size={32} />
                    </Box>
                    <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
                      Archana Signature
                    </Typography>
                    <Typography className="mt-3 text-sm leading-6 text-slate-700">
                      Rich Besan Laddu in premium gift packaging, handcrafted for festivals.
                    </Typography>
                  </Box>

                  <Box className="rounded-[28px] border border-slate-200 bg-amber-50 p-5 text-center">
                    <Box className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-gold-600 shadow-lg">
                      <PackageCheck size={32} />
                    </Box>
                    <Typography className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
                      Fresh Daily
                    </Typography>
                    <Typography className="mt-3 text-sm leading-6 text-slate-700">
                      Batches made each morning and shipped on the same day for the purest taste.
                    </Typography>
                  </Box>
                </Box>

                <Box className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Box className="flex-1 rounded-[28px] bg-amber-100 px-5 py-4 text-sm text-slate-900 shadow-inner">
                    <Typography className="text-xs uppercase tracking-[0.2em] text-slate-600">
                      Top collection
                    </Typography>
                    <Typography className="mt-2 text-lg font-bold text-slate-950">
                      Gift Boxes & Festival Sets
                    </Typography>
                  </Box>
                  <Button
                    component="a"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="secondary"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold text-slate-950"
                  >
                    <MessageCircle size={16} /> Quick WhatsApp Order
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Box>

      <Box className="absolute inset-x-0 bottom-0 pointer-events-none">
        <Box className="h-28 bg-gradient-to-t from-amber-50 via-amber-50/70 to-transparent" />
      </Box>
    </Box>
  );
}
