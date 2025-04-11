'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductType, Size, ProductColor, ProductOption } from '@/types/product';
import ProductCard from '@/app/components/ProductSelector';
import ColorSelector from '@/app/components/colorsSelector';
import SizeSelector from '@/app/components/Size';
import QuantityControl from '@/app/components/Quantity';
import CustomizerHeader from '@/app/components/header2';
import ProductDisplay from '@/app/components/Display';
import ProductAnimation from '@/app/components/Animat';
import { cn } from '@/lib/utils';
import ImageGenerator from '../components/image.gen';

// Product data
const productOptions: ProductOption[] = [
  {
    type: 'shirt',
    name: 'Classic T-Shirt',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cloud White', value: '#ffffff' },
      { name: 'Midnight Black', value: '#000000' },
      { name: 'Ocean Blue', value: '#0ea5e9' },
      { name: 'Sage Green', value: '#84cc16' },
    ],
    image: 'https://i.imgur.com/JFHjdNJ.png',
    description: 'Premium cotton t-shirt with a relaxed fit and exceptional comfort.',
    price: 29.99
  },
  {
    type: 'cap',
    name: 'Premium Cap',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Cloud White', value: '#ffffff' },
      { name: 'Midnight Black', value: '#000000' },
      { name: 'Desert Sand', value: '#fde1d3' },
    ],
    image: 'https://i.imgur.com/rLFk5ls.png',
    description: 'Structured 6-panel cap with a curved visor and adjustable strap.',
    price: 24.99
  },
  {
    type: 'mug',
    name: 'Ceramic Mug',
    sizes: ['M'],
    colors: [
      { name: 'Cloud White', value: '#ffffff' },
      { name: 'Midnight Black', value: '#000000' },
      { name: 'Soft Pink', value: '#ffdee2' },
    ],
    image: 'https://i.imgur.com/qK6PTJh.png',
    description: 'High-quality ceramic mug that keeps your beverages at the perfect temperature.',
    price: 19.99
  }
];

const Index = () => {
  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [prompt, setPrompt] = useState('');  // State for the prompt input field

  const selectedProduct = selectedType 
    ? productOptions.find(p => p.type === selectedType) 
    : null;

  // Check if all selections are made
  useEffect(() => {
    if (selectedProduct && selectedSize && selectedColor) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [selectedProduct, selectedSize, selectedColor]);

  // When product type changes, reset color and size selections
  const handleProductSelect = (type: ProductType) => {
    setSelectedType(type);
    setSelectedSize(null);
    setSelectedColor(null);
    
    // If selecting the same product, don't show the animation
    if (type !== selectedType) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!canProceed) return;
    
    // Show success animation
    setShowAnimation(true);
    
    // Reset form after animation
    setTimeout(() => {
      setShowAnimation(false);
      // You could add actual cart functionality here
      console.log('Added to cart:', {
        product: selectedProduct,
        size: selectedSize,
        color: selectedColor,
        quantity
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-lightest to-white text-gray-darkest">
      <ProductAnimation isVisible={showAnimation} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CustomizerHeader />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2 space-y-8">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold tracking-tight">Select Product</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {productOptions.map((product) => (
                  <ProductCard
                    key={product.type}
                    product={product}
                    selectedType={selectedType}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
            </motion.section>
            
            {/* Customization Options */}
            <AnimatePresence mode="wait">
              {selectedProduct && (
                <motion.section
                  key={selectedProduct.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card p-6 space-y-8"
                >
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">Customize Your {selectedProduct.name}</h2>
                    <p className="text-sm text-gray-dark">{selectedProduct.description}</p>
                  </div>
                  
                  {/* Size Selector */}
                  <SizeSelector
                    sizes={selectedProduct.sizes}
                    selectedSize={selectedSize}
                    onChange={setSelectedSize}
                  />
                  
                  {/* Color Selector */}
                  <ColorSelector
                    colors={selectedProduct.colors}
                    selectedColor={selectedColor}
                    onChange={setSelectedColor}
                  />
                  
                  {/* Quantity Control */}
                  <QuantityControl
                    quantity={quantity}
                    onChange={setQuantity}
                  />
                  
                  {/* Add to Cart Button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "w-full py-4 rounded-xl font-medium transition-all duration-300 mt-8",
                      canProceed
                        ? "bg-blue text-white shadow-md hover:shadow-lg hover:bg-blue-dark"
                        : "bg-gray-medium text-gray-dark cursor-not-allowed"
                    )}
                    disabled={!canProceed}
                    onClick={handleAddToCart}
                  >
                    {canProceed ? (
                      <span className="flex items-center justify-center gap-2">
                        Add to Cart
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                      </span>
                    ) : (
                      <span>Complete Selection</span>
                    )}
                  </motion.button>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
          
          {/* Product Display */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-lightest rounded-3xl shadow-subtle h-[600px] overflow-hidden relative"
            >
              {selectedProduct ? (
                <ProductDisplay
                  product={selectedProduct}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4,
                      ease: "easeInOut"
                    }}
                    className="mb-6 text-gray-400"
                  >
                    <svg 
                      width="40" 
                      height="40" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </motion.div>
                  <h3 className="font-medium text-xl text-gray-dark">
                    Select a product to start customizing!
                  </h3>
                  <ImageGenerator />
                </div>

               
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
