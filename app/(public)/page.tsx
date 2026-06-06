import type { Metadata } from "next";
import { HeroSection } from "@/features/products/components/HeroSection";
import { FeaturedCategories } from "@/features/categories/components/FeaturedCategories";
import { FeaturedProducts } from "@/features/products/components/FeaturedProducts";
import { WhyChooseUs } from "@/components/shared/WhyChooseUs";
import { FestivalSection } from "@/features/products/components/FestivalSection";
import { CorporateSection } from "@/features/products/components/CorporateSection";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { NewsletterSection } from "@/components/shared/NewsletterSection";

export const metadata: Metadata = {
  title: "Archana Sweets - Made With Mother's Love | Premium Homemade Indian Sweets Pune",
  description:
    "Order authentic homemade Indian sweets online - Besan Laddu, Dry Fruit Laddu, Modak, Barfi & Festival Gift Boxes. Fresh, pure, delivered to your door in Pune.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <FestivalSection />
      <CorporateSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
