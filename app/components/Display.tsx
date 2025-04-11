import { motion, AnimatePresence } from 'framer-motion';
import { ProductOption, ProductColor, Size } from '@/types/product';

interface ProductDisplayProps {
  product: ProductOption | null;
  selectedColor: ProductColor | null;
  selectedSize: Size | null;
}

const ProductDisplay = ({ product, selectedColor, selectedSize }: ProductDisplayProps) => {
  if (!product) return null;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background gradient effect */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div 
            className="subtle-glow w-64 h-64 bg-blue-lightest animate-pulse-subtle" 
            style={{ left: '30%', top: '30%' }}
          />
          {selectedColor && (
            <motion.div 
              className="subtle-glow w-72 h-72" 
              style={{ 
                backgroundColor: selectedColor.value,
                right: '30%', 
                bottom: '20%',
                opacity: 0.25 
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ duration: 1 }}
            />
          )}
        </div>
        
        {/* Product image with animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${product.type}-${selectedColor?.value}`}
            className="relative z-10 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.5 
            }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain p-8 animate-float"
              style={{ 
                filter: selectedColor?.value === '#ffffff' 
                  ? 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1))' 
                  : 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.2))'
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Product info overlay */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center">
          <AnimatePresence>
            {selectedSize && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-900"
              >
                Size: {selectedSize}
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {selectedColor && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-900 flex items-center gap-2"
              >
                <span>Color: {selectedColor.name}</span>
                <span 
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: selectedColor.value }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
