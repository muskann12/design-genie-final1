"use client"; // Necessary for Framer Motion animations in Next.js

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi"; // Menu & Close Icons

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#021B41] shadow-md opacity-50"
    >
      <div className="container mx-auto flex items-center justify-between py-1 px-6">
        
        {/* Logo */}
        <Link href="/">
          <Image 
            src="/images/2.png" 
            alt="Logo"
            width={80}
            height={80}
            className="cursor-pointer mr-2"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-white hover:text-gray-300">HOME</Link>
          <Link href="/shop" className="text-white hover:text-gray-300">SHOP</Link>
          <Link href="/create-design" className="text-white hover:text-gray-300">CREATE DESIGN</Link>
          <Link href="/prompts" className="text-white hover:text-gray-300">VIEW PROMPTS</Link>
          <Link href="/about" className="text-white hover:text-gray-300">ABOUT</Link>
          <Link
  href="/cart"
  className="flex items-center gap-1 text-white hover:text-gray-300 text-sm sm:text-base"
>
  <AiOutlineShoppingCart className="text-lg sm:text-xl" />
  <span className="block sm:inline ">Cart</span>
</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-3xl" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-[#001028]  text-white flex flex-col items-center space-y-6 py-6"
          >
            <Link href="/" onClick={() => setIsOpen(false)}>HOME</Link>
            <Link href="/shop" onClick={() => setIsOpen(false)}>SHOP</Link>
            <Link href="/create-design" onClick={() => setIsOpen(false)}>CREATE DESIGN</Link>
            <Link href="/prompts" onClick={() => setIsOpen(false)}>VIEW PROPMTS</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>ABOUT</Link>
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              <AiOutlineShoppingCart className="text-2xl" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
