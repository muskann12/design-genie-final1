"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Inter } from 'next/font/google';

// Load Inter font with required weights
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNavigate = () => {
    router.push("/create-design");
  };

  return (
    <section className={`relative w-full h-screen bg-gradient-to-r from-[#83C2EA] to-[#001534] overflow-hidden flex items-stretch ${inter.variable} font-sans`}>
      <div className="container mx-auto px-6 py-16 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 mt-[-40px]">
        {/* Left Side - Text Content */}
        <div className="flex-1 space-y-6 max-w-lg text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-extrabold lg:text-7xl"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-blue-600 font-extrabold">Unleash Your</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-blue-600 font-extrabold">Creativity,</span>
            <span className="block font-extrabold">Design <span className="bg-gradient-to-r from-gray-950 to-blue-600 bg-clip-text text-transparent">Your</span></span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-blue-600 font-extrabold">Way!</span>
          </motion.h1>

          {/* Button & Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center md:justify-start p-6 rounded-2xl shadow-lg max-w-xl"
          >
            {/* Left Side Content */}
            <div className="flex flex-col gap-3 text-center md:text-left">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-950 text-base font-light max-w-sm"
              >
                Transform your imagination into reality. <br />
                Design anything you dream of with the 
                freedom to customize every detail.
              </motion.p>

              {/* Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                onClick={handleNavigate}
                className="group flex items-center justify-center gap-3 text-gray-100 px-5 py-2.5 rounded-full border border-blue-950 hover:bg-gray-200 transition-all duration-300 shadow-md"
              >
                <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-100"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-semibold tracking-wide text-gray-800 group-hover:text-gray-900">
                  START CUSTOMIZING
                </span>
              </motion.button>
            </div>

            {/* Circular Image */}
            <div className="w-40 h-32 ml-6 overflow-hidden rounded-tr-[31px] hidden md:block">
              <img src="/images/hero3.png" alt="Circular" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        {/* Right Side - Image and Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex-1 flex justify-center lg:justify-end"
        >
          {/* Large Circles */}
          <div className="absolute bottom-0 right-0 w-72 h-72 md:w-80 md:h-80 bg-gradient-to-r from-gray-500 to-blue-500 rounded-full opacity-40 animate-pulse" />
          <div className="absolute top-0 left-0 w-64 h-64 md:w-64 md:h-64 bg-gradient-to-r from-gray-950 to-blue-500 rounded-full opacity-40 animate-pulse" />

          {/* Hero Image */}
          <motion.img
            src="/images/hero1.png"
            alt="Hero Image"
            className="w-auto h-auto max-h-[60vh] lg:mt-20 md:max-h-screen lg:w-[700px] lg:h-[700px] object-contain rounded-lg relative z-10 mt-[-20px]"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;