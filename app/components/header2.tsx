
import { motion } from 'framer-motion';

const CustomizerHeader = () => {
  return (
    <motion.div 
      className="text-center mb-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-block mb-2"
      >
        <span className="px-3 py-1 text-xs font-medium bg-blue-lightest text-blue rounded-full">
          Customization Studio
        </span>
      </motion.div>
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-2">
        Design Your Perfect Item
      </h1>
      <p className="text-gray-dark max-w-2xl mx-auto">
        Select a product, choose your preferred size and color, then customize it to make it uniquely yours.
      </p>
    </motion.div>
  );
};

export default CustomizerHeader;
