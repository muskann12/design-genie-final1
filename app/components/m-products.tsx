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
}

const products: Product[] = [
  { 
    name: "DG BoldGenie", 
    image: "/images/c1.jpg", 
    price: 800, 
    rating: 4,
    description: "Premium quality baseball cap with adjustable strap.",
    sizes: ["One Size"]
  },
  { 
    name: "DG MysticCover", 
    image: "/images/c2.jpg", 
    price: 800, 
    rating: 4,
    description: "Stylish snapback hat with flat brim.",
    sizes: ["One Size"]
  },
  { 
    name: "DG UrbanHalo", 
    image: "/images/c3.jpg", 
    price: 800, 
    rating: 4,
    description: "Trendy bucket hat with a relaxed fit.",
    sizes: ["One Size"]
  },
  { 
    name: "DG DreamTopper", 
    image: "/images/c4.jpg", 
    price: 800, 
    rating: 5,
    description: "Classic dad hat with curved brim.",
    sizes: ["One Size"]
  },
  { 
    name: "Trucker Cap", 
    image: "/images/c5.jpg", 
    price: 800, 
    rating: 4,
    description: "Vintage-style trucker cap with mesh back.",
    sizes: ["One Size"]
  },
  { 
    name: "DG SkyCraft", 
    image: "/images/c6.jpg", 
    price: 800, 
    rating: 4,
    description: "Winter beanie with a small brim.",
    sizes: ["One Size"]
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
    <div className="relative w-full max-w-7xl mx-auto p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="mb-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700"
        >
          PREMIUM CAPS COLLECTION
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-sm text-gray-600"
        >
          Stylish headwear in classic colors
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
          1024: { slidesPerView: 3 },
        }}
        className="px-2"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              onClick={() => openModal(product)}
            >
              <div className="relative w-full h-48 mx-auto overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain max-w-full max-h-full transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="mt-3">
                <div className="flex justify-center gap-1 mb-1">
                  {Array(product.rating).fill(null).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-800 font-bold text-sm">PKR {product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-gray-900 hover:bg-gray-100 transition-all duration-300 border border-gray-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="next-btn absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-gray-900 hover:bg-gray-100 transition-all duration-300 border border-gray-200"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative p-6">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="max-h-80 object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  
                  <div className="flex items-center gap-1">
                    {Array(selectedProduct.rating).fill(null).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-600 ml-1 text-sm">({selectedProduct.rating}/5)</span>
                  </div>

                  <p className="text-xl font-bold text-gray-900">
                    PKR {selectedProduct.price.toLocaleString()}
                  </p>

                  <p className="text-gray-700 text-sm">{selectedProduct.description}</p>

                  {selectedProduct.sizes && (
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Sizes</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProduct.sizes.map(size => (
                          <button 
                            key={size}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <button 
                      onClick={() => router.push('/shop')}
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium shadow-sm text-sm"
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
