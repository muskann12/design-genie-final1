import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductAnimationProps {
  isVisible: boolean;
}

const ProductAnimation = ({ isVisible }: ProductAnimationProps) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      {loaded && (
        <motion.div
          className="absolute inset-0 z-50 bg-gray-100 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 rounded-full border-8 border-t-blue border-blue/20"
              initial={{ opacity: 1, rotate: 0 }}
              animate={{ 
                opacity: [1, 1, 0],
                rotate: 360,
                scale: [1, 1.2, 0.8]
              }}
              transition={{ 
                repeat: 0,
                duration: 1.8,
                times: [0, 0.7, 1],
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 1],
                scale: [0.5, 1.1, 1]
              }}
              transition={{ 
                duration: 1.2,
                delay: 0.6,
                times: [0, 0.8, 1],
                ease: "easeOut"
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductAnimation;
