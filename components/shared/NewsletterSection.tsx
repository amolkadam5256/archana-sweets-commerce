"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Mail } from "lucide-react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || "Unable to subscribe");
      }

      setIsSubmitted(true);
      toast.success("Subscribed to festival offers");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to subscribe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-padding bg-cream-50 border-t border-cream-200">
      <div className="container-custom max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-[32px] border border-cream-200 bg-white shadow-xl">
            <CardContent className="p-8 sm:p-10">
              <Box className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-maroon-100 text-maroon-600">
                <Mail size={24} />
              </Box>
              <Typography
                component="h2"
                variant="h4"
                className="text-maroon-900 mb-3 font-primary"
              >
                Get Sweet <span className="text-gradient-gold">Offers</span> First
              </Typography>
              <Typography variant="body2" className="text-cream-900 mb-8">
                Subscribe to our newsletter and be the first to know about festival specials, new
                sweets, and exclusive discounts.
              </Typography>

              {isSubmitted ? (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-3 rounded-full bg-green-50 border border-green-200 px-6 py-4 text-green-700 font-semibold"
                >
                  <Check size={18} /> You are subscribed. Welcome to the Archana Sweets family.
                </Box>
              ) : (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 sm:flex-row"
                >
                  <TextField
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    className="bg-white"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="rounded-full px-8"
                    disabled={isLoading}
                    endIcon={<ArrowRight size={16} />}
                  >
                    {isLoading ? <CircularProgress size={18} color="inherit" /> : "Subscribe"}
                  </Button>
                </Box>
              )}

              <Typography variant="caption" className="text-cream-600 mt-4 block">
                No spam. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
