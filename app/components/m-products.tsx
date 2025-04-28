'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Star, X } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { useRouter } from 'next/navigation';

interface Product {
  name: string;
  image: string;
  price: number;
  rating: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

const products: Product[] = [
  { 
    name: "Classic Baseball Cap", 
    image: "/images/c1.jpg", 
    price: 1200, 
    rating: 4,
    description: "Premium quality baseball cap with adjustable strap. Perfect for casual outings and sunny days.",
    sizes: ["One Size"],
    colors: ["Black", "Navy", "Red"]
  },
  { 
    name: "Snapback Hat", 
    image: "/images/c2.jpg", 
    price: 1500, 
    rating: 4,
    description: "Stylish snapback hat with flat brim. Ideal for streetwear fashion.",
    sizes: ["One Size"],
    colors: ["Black", "White", "Camouflage"]
  },
  { 
    name: "Bucket Hat", 
    image: "/images/c3.jpg", 
    price: 1300, 
    rating: 4,
    description: "Trendy bucket hat with a relaxed fit. Made from breathable fabric.",
    sizes: ["One Size"],
    colors: ["Beige", "Black", "Denim"]
  },
  { 
    name: "Dad Hat", 
    image: "/images/c4.jpg", 
    price: 1100, 
    rating: 5,
    description: "Classic dad hat with curved brim. Soft and comfortable for all-day wear.",
    sizes: ["One Size"],
    colors: ["Black", "Gray", "Olive"]
  },
  { 
    name: "Trucker Cap", 
    image: "/images/c5.jpg", 
    price: 1400, 
    rating: 4,
    description: "Vintage-style trucker cap with mesh back. Great for outdoor activities.",
    sizes: ["One Size"],
    colors: ["Black", "Blue", "White"]
  },
  { 
    name: "Beanie with Brim", 
    image: "/images/c6.jpg", 
    price: 1600, 
    rating: 4,
    description: "Winter beanie with a small brim. Warm and stylish for cold weather.",
    sizes: ["One Size"],
    colors: ["Black", "Gray", "Navy"]
  },
];

const ProductSlider = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto p-6">
      <div className="mb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-gray-700"
        >
          PREMIUM CAPS COLLECTION
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg text-gray-900"
        >
          Discover our exclusive range of stylish headwear
        </motion.p>
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
              className="p-2 rounded-xl shadow-lg text-center cursor-pointer  transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => openModal(product)}
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

                <h3 className="text-xl font-semibold text-blue-950 mb-1">{product.name}</h3>
                <p className="text-blue-950 text-sm font-bold">PKR {product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="relative p-6">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="max-h-96 object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">{selectedProduct.name}</h2>
                  
                  <div className="flex items-center gap-1">
                    {Array(selectedProduct.rating).fill(null).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-600 ml-2">({selectedProduct.rating}/5)</span>
                  </div>

                  <p className="text-2xl font-bold text-gray-900">
                    PKR {selectedProduct.price.toLocaleString()}
                  </p>

                  <p className="text-gray-700">{selectedProduct.description}</p>

                  {selectedProduct.sizes && (
                    <div>
                      <h3 className="font-medium text-gray-900">Sizes</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProduct.sizes.map(size => (
                          <button 
                            key={size}
                            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct.colors && (
                    <div>
                      <h3 className="font-medium text-gray-900">Colors</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProduct.colors.map(color => (
                          <button 
                            key={color}
                            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                            style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fff' : color.toLowerCase() }}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <button 
                      onClick={() => router.push('/shop')}
                      className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;