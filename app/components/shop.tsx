
'use client'
import { useState, useEffect } from "react";
import { ShoppingBag, CheckCircle, ChevronDown, Search, Filter, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Product data
const products = [
  { name: "White Printed T-Shirt", category: "T-Shirts", image: "/images/s8.png", price: 1399 },
  { name: "Printed Mug", category: "Mugs", image: "/images/pm1.jpg", price: 1800 },
  { name: "Drop  Cat T-Shirt", category: "T-Shirts", image: "/images/ps2.jpg", price: 1399 },
  { name: "Tokyo Printed  T-Shirt", category: "T-Shirts", image: "/images/s3.png", price: 1399 },
  { name: "Tokyo Printed  T-Shirt", category: "Caps", image: "/images/cap1.jpg", price: 700 },
  { name: "Hustle Harder Mug", category: "Mugs", image: "/images/pm3.jpg", price: 2500 },
  { name: "Swag Baggy T-Shirt", category: "T-Shirts", image: "/images/s11.png", price: 1399 },
  { name: "Classy Baggy T-Shirt", category: "T-Shirts", image: "/images/s13.png", price: 1399 },
  { name: "Tokyo Black T-Shirt", category: "Caps", image: "/images/cap2.jpg", price: 700 },
  { name: "Money Classy T-Shirt", category: "T-Shirts", image: "/images/s15.png", price: 1399 },
  { name: "White Mind T-Shirt", category: "T-Shirts", image: "/images/s17.png", price: 1399 },
  { name: "Classy Color T-Shirt", category: "T-Shirts", image: "/images/ps4.jpg", price: 1399 },
  { name: "Tokyo Black T-Shirt", category: "Caps", image: "/images/cap3.jpg", price: 700 },
  { name: "Pink Hearts Cute Mug", category: "Mugs", image: "/images/mug3.jpg", price: 2500 },
  { name: "Spooky Black T-Shirt", category: "T-Shirts", image: "/images/s5.png", price: 1399 },
  { name: "Simple Print T-Shirt", category: "T-Shirts", image: "/images/slider5.png", price: 1399 },
  { name: "Tokyo Black T-Shirt", category: "Caps", image: "/images/cap4.jpg", price: 700 },
  { name: "Swag PinkPanther T-Shirt", category: "T-Shirts", image: "/images/s16.png", price: 1399 },
  { name: "Bluish Quote White T-Shirt", category: "T-Shirts", image: "/images/s1.png", price: 1399 },
  { name: "Black and Blue Mug", category: "Mugs", image: "/images/pm4.jpg", price: 2500 },
  { name: "Galaxy Theme T-Shirt", category: "T-Shirts", image: "/images/ps1.jpg", price: 1399 },
  { name: "Black Printed Mug", category: "Mugs", image: "/images/pm5.jpg", price: 2500 },
  { name: "Slay Mug", category: "Mugs", image: "/images/pm6.jpg", price: 2500 },
  { name: "Funky Dark Blue T-Shirt", category: "T-Shirts", image: "/images/ps6.jpg", price: 1399 },
  { name: "Blue Theme Mug", category: "Mugs", image: "/images/mug1.jpg", price: 2500 },
  { name: "Butterfly theme T-Shirt", category: "T-Shirts", image: "/images/s2.png", price: 1399 },
  { name: "Bows Theme Mug", category: "Mugs", image: "/images/mug2.jpg", price: 2500 },
  { name: "Classic White T-Shirt", category: "T-Shirts", image: "/images/s18.png", price: 1399 },
  { name: "Funcky Bear T-Shirt", category: "T-Shirts", image: "/images/s19.png", price: 1399 },
  { name: "Fairy Pastel Mug", category: "Mugs", image: "/images/mug4.jpg", price: 2500 },
  { name: "Drama Queen T-Shirt", category: "T-Shirts", image: "/images/s20.png", price: 1399 },
  { name: "Classic Rise Grind Shine Mug", category: "Mugs", image: "/images/mug5.jpg", price: 2500 },
];

const sizes = ["S", "M", "L", "XL"];
const categories = ["All", "Caps", "T-Shirts", "Mugs", "Deals"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<any[]>([]);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
    
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    
    setPageLoaded(true);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("category-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddToCart = (product: any, index: number) => {
    const size = selectedSizes[index] || "M";
    const productWithSize = { ...product, size };
    
    const newCart = [...cart, productWithSize];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setAddedToCart(index);

    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleSizeChange = (index: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [index]: size }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const toggleWishlist = (index: number) => {
    const newWishlist = wishlist.includes(index)
      ? wishlist.filter(item => item !== index)
      : [...wishlist, index];
    
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  // Filter products based on category and search term
  const filteredProducts = products
    .filter(product => selectedCategory === "All" || product.category === selectedCategory)
    .filter(product => 
      searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white relative overflow-hidden">
      {/* Background elegant patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-blue-100/20 w-[30rem] h-[30rem] rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 bg-gray-200/30 w-[30rem] h-[30rem] rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/4 bg-pink-100/20 w-[20rem] h-[20rem] rounded-full blur-3xl"></div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {addedToCart !== null && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-blue-950/90 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center"
          >
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            <span>Added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section with enhanced styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-blue-950/5 backdrop-blur-sm text-gray-700 text-sm px-4 py-1 rounded-full mb-2"
          >
            Premium Collection
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-950 to-gray-800">
              Shop the Best
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-2xl mx-auto text-gray-500 text-lg"
          >
            Discover our curated collection of premium merchandise designed for style and comfort.
          </motion.p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 items-center"
        >
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            {/* Category Dropdown */}
            <div id="category-dropdown" className="relative flex-1 sm:flex-none">
              <button
                onClick={toggleDropdown}
                className="w-full min-w-[180px] bg-white border border-gray-200 shadow-sm rounded-full py-3 px-5 flex items-center justify-between text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{selectedCategory} Products</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`}
                />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                  >
                    <ul className="py-1">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <button
                            onClick={() => selectCategory(category)}
                            className={`w-full text-left px-4 py-3 text-sm ${
                              selectedCategory === category
                                ? "bg-blue-50 text-blue-800 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            } transition-colors duration-150`}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filters button (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex sm:hidden items-center justify-center bg-blue-950 text-white rounded-full w-12 h-12 shadow-sm"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Product count and sort options */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-medium">{filteredProducts.length}</span> products
          </p>
          
          <div className="hidden sm:flex gap-2 text-sm">
            {["Popular", "Latest", "Price: Low to High", "Price: High to Low"].map((sort, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-full ${i === 0 ? 'bg-blue-950 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid with enhanced cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filteredProducts.map((product, index) => {
            const isDiscounted = product.price === 1399;
            const originalPrice = 1500;
            const discountPercentage = isDiscounted
              ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
              : 0;
            const isWishlisted = wishlist.includes(index);

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index % 8), duration: 0.5 }}
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                {/* Product image with overlay */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={product.image || "https://placehold.co/400x500/e2e8f0/a0aec0?text=No+Image"}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/400x500/e2e8f0/a0aec0?text=No+Image";
                    }}
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block text-xs font-medium text-gray-600 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Discount badge */}
                  {isDiscounted && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-block text-xs font-bold text-white bg-red-500/90 px-3 py-1 rounded-full shadow-sm">
                        {discountPercentage}% OFF
                      </span>
                    </div>
                  )}
                  
                  {/* Wishlist button */}
                  <button
                    onClick={() => toggleWishlist(index)}
                    className={`absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                      isWishlisted 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 backdrop-blur-sm text-gray-600 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Product details */}
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-950 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Price Section */}
                  <div className="flex items-center gap-2 mb-3">
                    {isDiscounted ? (
                      <>
                        <p className="text-red-500 text-xs md:text-sm font-medium line-through">
                          PKR {originalPrice.toLocaleString()}
                        </p>
                        <p className="text-gray-800 text-sm md:text-base font-bold">
                          PKR {product.price.toLocaleString()}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-800 text-sm md:text-base font-bold">
                        PKR {product.price.toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* Size Selector with improved styling */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Size:</label>
                    <div className="flex gap-1">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeChange(index, size)}
                          className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-all ${
                            selectedSizes[index] === size || (!selectedSizes[index] && size === "M")
                              ? "bg-blue-950 text-white border-blue-950"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to cart button with animation */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAddToCart(product, index)}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-950 to-blue-800 text-white text-sm font-semibold rounded-lg flex items-center justify-center shadow-sm hover:shadow transition-all"
                  >
                    <ShoppingBag className="inline-block w-4 h-4 mr-2" />
                    Add to Cart
                  </motion.button>

                  {/* Added to cart indicator */}
                  <AnimatePresence>
                    {addedToCart === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center shadow-lg"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Added to Cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state when no products match filter */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 mt-8 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-950 text-white rounded-lg text-sm font-medium"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* "Load More" button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Load More Products
            </button>
          </div>
        )}
      </div>

      {/* Cart Floating Button */}
      <AnimatePresence>
        {pageLoaded && cart.length > 0 && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="fixed bottom-6 right-6 bg-blue-950 text-white px-4 py-3 rounded-full shadow-xl z-50 flex items-center gap-2 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </div>
            <span className="text-sm font-medium hidden sm:block">
              <Link href="/cart">View Cart</Link>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;