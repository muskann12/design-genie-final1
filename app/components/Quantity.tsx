import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QuantityControlProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

const QuantityControl = ({ 
  quantity, 
  onChange,
  min = 1,
  max = 100
}: QuantityControlProps) => {
  const increment = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium uppercase tracking-wider text-gray-dark">Quantity</h3>
      <div className="flex items-center">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={decrement}
          disabled={quantity <= min}
          className={cn(
            "w-10 h-10 rounded-l-lg flex items-center justify-center transition-colors",
            quantity <= min 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        
        <div className="h-10 px-4 bg-white border-y border-gray-200 flex items-center justify-center min-w-[50px]">
          <motion.span
            key={quantity}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="font-medium"
          >
            {quantity}
          </motion.span>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={increment}
          disabled={quantity >= max}
          className={cn(
            "w-10 h-10 rounded-r-lg flex items-center justify-center transition-colors",
            quantity >= max 
              ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="">
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default QuantityControl;
