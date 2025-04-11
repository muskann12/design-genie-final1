'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, Sparkles, Check, ShoppingCart } from 'lucide-react';

// Define Types for Props
interface CustomButtonProps {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}

// Custom Button Component
const CustomButton: React.FC<CustomButtonProps> = ({ label, icon: Icon, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="flex-1 px-6 py-3 rounded-2xl font-medium flex items-center justify-center gap-2  
      border border-zinc-600 bg-gradient-to-r from-[#001534] to-[#021f4b] 
      hover:from-blue-400 hover:to-blue-950 transition-all duration-300 
      shadow-md hover:shadow-lg transform hover:scale-105"
    >
      <Icon width={22} height={22} className="opacity-80 group-hover:opacity-100 text-white" />
      {label}
    </motion.button>
  );
};

const FuturisticImageGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Function handlers
  const handleGenerate = () => {
    if (!inputValue.trim()) {
      alert('Please enter a design description!');
      return;
    }
    console.log(`Generating design for: ${inputValue}`);
  };

  const handleDone = () => {
    alert('Design process completed!');
  };

  const handleAddToCart = () => {
    alert('Added to cart successfully!');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <div className="min-h-screen 
    bg-[#001534] flex flex-col items-center justify-center text-white p-8 sm:p-12 relative overflow-hidden border border-zinc-700 rounded-3xl shadow-xl mt-16 ">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))] rounded-3xl" />

      {/* Upload Photo */}
      <label className="cursor-pointer mt-6 sm:mt-12">
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        <CustomButton label="Upload Photo" icon={Upload} onClick={handleUploadClick} />
      </label>

      {/* Display Uploaded Image */}
      {uploadedImage && (
        <motion.img
          src={uploadedImage}
          alt="Uploaded"
          className="mt-6 sm:mt-10 w-80 h-80 object-cover rounded-xl border border-gray-300 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        />
      )}

      {/* Main Content */}
      <motion.div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8 px-6 py-8 mt-6 sm:mt-12 border border-gray-700 rounded-3xl  backdrop-blur-md">
        
        {/* Heading */}
        <div className="text-center space-y-5">
          <motion.span className="text-xs sm:text-sm uppercase tracking-wider bg-gray-800 px-5 py-2 rounded-full inline-block border border-zinc-600">
            AI Design Generator
          </motion.span>
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-100">
            Transform your imagination <br className="hidden sm:block" />
            <span className="text-zinc-400">into stunning visuals</span>
          </motion.h1>
        </div>

        {/* Search Box */}
        <motion.div className="relative w-full max-w-xl border rounded-2xl bg-gray-200 p-2 flex items-center">
          <Search width={22} height={22} className="ml-4 text-zinc-400" />
          <input
            type="text"
            value={`Create a design for printing ${inputValue}`}
            onChange={(e) => {
              // Ensure the prefix remains unchanged
              const newValue = e.target.value;
              if (newValue.startsWith("Create a design for printing ")) {
                setInputValue(newValue.replace("Create a design for printing ", ""));
              }
            }}
            className="w-full bg-transparent text-black placeholder-zinc-400 px-4 py-3 text-lg outline-none border-none"
            placeholder="Describe your design..."
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
          <CustomButton label="Generate Design" icon={Sparkles} onClick={handleGenerate} />
          <CustomButton label="Done" icon={Check} onClick={handleDone} />
          <CustomButton label="Add to Cart" icon={ShoppingCart} onClick={handleAddToCart} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FuturisticImageGenerator;
