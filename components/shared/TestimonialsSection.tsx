"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Kothrud, Pune",
    rating: 5,
    text: "Archana Sweets is the best! I ordered Besan Laddus for my family gathering and everyone loved them. The ghee fragrance and texture are absolutely perfect. Will definitely order again!",
    occasion: "Family Gathering",
    avatar: "P",
  },
  {
    name: "Rajesh Kulkarni",
    location: "Baner, Pune",
    rating: 5,
    text: "Ordered 50 Diwali hampers for our company. The packaging was premium, delivery was on time, and clients were delighted! Archana Sweets made our corporate gifting effortless.",
    occasion: "Corporate Diwali Gifting",
    avatar: "R",
  },
  {
    name: "Meera Joshi",
    location: "Viman Nagar, Pune",
    rating: 5,
    text: "The Dry Fruit Laddus are to die for! Made with actual dry fruits and pure ghee — you can literally taste the quality. My kids demanded I order again within a week!",
    occasion: "Regular Customer",
    avatar: "M",
  },
  {
    name: "Amit Patil",
    location: "Hadapsar, Pune",
    rating: 5,
    text: "Got the Modak for Ganesh Chaturthi — absolutely divine! Soft, fresh, and prepared with love. These are exactly how my grandmother used to make them. Pure nostalgia!",
    occasion: "Ganesh Chaturthi",
    avatar: "A",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge badge-gold mb-3">Customer Love</span>
          <h2 className="text-maroon-900 mb-3 text-2xl sm:text-3xl font-bold font-primary">
            What Our Families{" "}
            <span className="text-gradient-maroon">Say</span>
          </h2>
          <p className="text-cream-900 text-xs max-w-xl mx-auto">
            Real reviews from real customers who trust us with their sweetest moments.
          </p>
          <hr className="divider-gold w-24 mx-auto mt-4" />
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-cream-50 border border-cream-200 rounded-2xl p-6 hover:border-gold-300 hover:shadow-lg transition-all duration-300 relative"
            >
              <Quote size={20} className="text-gold-200 absolute top-4 right-4" />
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={13} fill="#d4a017" className="text-gold-500" />
                ))}
              </div>
              {/* Review text */}
              <p className="text-maroon-700 text-xs leading-relaxed mb-4 line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>
              {/* Badge */}
              <span className="badge badge-gold text-xs mb-3 inline-flex">{review.occasion}</span>
              {/* Author */}
              <div className="flex items-center gap-3 mt-2">
                <div className="w-9 h-9 rounded-full bg-gradient-maroon flex items-center justify-center text-gold-300 font-bold text-sm">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-maroon-800 font-semibold text-sm">{review.name}</p>
                  <p className="text-cream-700 text-xs">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google rating banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-cream-50 border border-cream-200 rounded-full px-6 py-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="#d4a017" className="text-gold-500" />
              ))}
            </div>
            <span className="text-maroon-800 font-bold">4.9 / 5</span>
            <span className="text-cream-700 text-xs">based on 400+ Google Reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
