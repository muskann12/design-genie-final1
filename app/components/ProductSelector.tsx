import { motion } from 'framer-motion';
import { ProductOption, ProductType } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: ProductOption;
  selectedType: ProductType | null;
  onSelect: (type: ProductType) => void;
}

const ProductCard = ({ product, selectedType, onSelect }: ProductCardProps) => {
  const isSelected = selectedType === product.type;
  
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(product.type)}
      className={cn(
        "relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300",
        isSelected 
          ? "bg-white shadow-elevated ring-2 ring-blue-light scale-[1.02]" 
          : "bg-white/80 shadow-subtle hover:shadow-elevated"
      )}
    >
      <div className="p-6">
        <div className="product-image-container mb-6">
          {isSelected && (
            <motion.div 
              className="absolute inset-0 bg-blue-lightest opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-4 z-10 relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: isSelected ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="text-left">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full inline-block mb-2",
            isSelected ? "bg-blue-lightest text-blue" : "bg-gray-light text-gray-dark"
          )}>
            {product.type.toUpperCase()}
          </span>
          <h3 className={cn(
            "font-medium tracking-tight transition-colors", 
            isSelected ? "text-blue" : "text-gray-darkest"
          )}>
            {product.name}
          </h3>
          {product.price && (
            <p className="text-gray-dark mt-1">${product.price.toFixed(2)}</p>
          )}
        </div>
      </div>
      
      {isSelected && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-blue"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default ProductCard;
