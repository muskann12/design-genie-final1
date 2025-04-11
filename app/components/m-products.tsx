'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const products = [
  { name: "Printed Mug", category: "Mugs", image: "/images/pm1.jpg", price: 1800, rating: 5 },
  { name: "Printed Mug", category: "Mugs", image: "/images/pm6.jpg", price: 1800, rating: 4 },
  { name: "Printed Mug", category: "Mugs", image: "/images/pm3.jpg", price: 1800, rating: 3 },
  { name: "Printed Mug", category: "Mugs", image: "/images/pm2.jpg", price: 1800, rating: 5 },
  { name: "Sporty Hoodie", image: "/images/pm4.jpg", price: 2200, rating: 4 },
  { name: "Trendy T-Shirt", image: "/images/pm2.jpg", price: 1600, rating: 4 },
];

const ProductSlidertwo = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto p-6 -mt-3">
      <div className="mb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-extrabold tracking-tight bg-clip-text bg-gray-100"
        ></motion.h2>

        {/* Shop Now Button */}
        <motion.a
          href="/shop"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-14 py-3 px-10 bg-blue-950 border text-white hover:bg-gray-900 font-extrabold transition-all duration-300 text-3xl"
        >
          Shop Now
        </motion.a>
      </div>

      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="px-4"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-95 max-w-xs mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative w-full h-48 mx-auto overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover max-w-full max-h-full transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
                <p className="text-gray-100 text-sm font-bold mb-3">PKR {product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-neutral-800 hover:bg-white transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="next-btn absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-neutral-800 hover:bg-white transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default ProductSlidertwo;
