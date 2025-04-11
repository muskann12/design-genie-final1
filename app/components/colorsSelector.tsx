import { motion } from 'framer-motion';
import { ProductColor } from '@/types/product'; 
import { cn } from '@/lib/utils';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor | null;
  onChange: (color: ProductColor) => void;
}

const ColorSelector = ({ colors, selectedColor, onChange }: ColorSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium uppercase tracking-wider text-gray-dark">Color</h3>
      <div className="flex space-x-3">
        {colors.map((color) => {
          const isSelected = selectedColor?.value === color.value;
          
          return (
            <motion.button
              key={color.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(color)}
              className="group relative"
              title={color.name}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full transition-transform duration-300 relative flex items-center justify-center",
                  isSelected ? "scale-110" : "hover:scale-105"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full absolute",
                    isSelected ? "shadow-lg" : "shadow-sm group-hover:shadow-md"
                  )}
                  style={{ backgroundColor: color.value }}
                />
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "absolute inset-0 rounded-full border-2 border-blue z-10",
                      "flex items-center justify-center"
                    )}
                  >
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className={color.value === '#ffffff' ? "text-gray-900" : "text-white"}
                    >
                      <path 
                        d="M5 13L9 17L19 7" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isSelected ? 1 : 0, 
                  y: isSelected ? 0 : 10 
                }}
                className="absolute w-full text-center mt-1 text-xs font-medium text-gray-dark"
              >
                {isSelected && (
                  <span className="block truncate">{color.name.split(' ')[0]}</span>
                )}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
