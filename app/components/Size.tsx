import { motion } from 'framer-motion';
import { Size } from '@/types/product';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size | null;
  onChange: (size: Size) => void;
}

const SizeSelector = ({ sizes, selectedSize, onChange }: SizeSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium uppercase tracking-wider text-gray-dark">Size</h3>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          
          return (
            <motion.button
              key={size}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(size)}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center font-medium transition-all duration-200",
                isSelected
                  ? "bg-blue text-white shadow-md"
                  : "bg-gray-light text-gray-dark hover:bg-gray-200"
              )}
            >
              {size}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
