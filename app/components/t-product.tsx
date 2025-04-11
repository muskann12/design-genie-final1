'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const products = [
  { name: "Black Hoodie", image: "/images/s1.png", price: 1800, rating: 4 },
  { name: "Black Top", image: "/images/s2.png", price: 1800, rating: 4 },
  { name: "Drop T-Shirt", image: "/images/s3.png", price: 1800, rating: 4 },
  { name: "Classic Jacket", image: "/images/s4.png", price: 2500, rating: 5 },
  { name: "Sporty Hoodie", image: "/images/s5.png", price: 2200, rating: 4 },
  { name: "Trendy T-Shirt", image: "/images/s11.png", price: 1600, rating: 4 },
];

const ProductSlider = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto p-6">
      <div className="mb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-gray-100"
        >
          FEATURED PRODUCTS
        </motion.h2>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="px-4"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="p-2 rounded-xl shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative w-full h-56 mx-auto overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover max-w-full max-h-full transition-transform duration-700 hover:scale-110"
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-center gap-1 mb-2">
                  {Array(product.rating).fill(null).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
                <p className="text-white text-sm font-bold">PKR {product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

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

export default ProductSlider;