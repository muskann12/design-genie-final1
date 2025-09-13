'use client'
import { useState, useEffect } from "react";
import { ShoppingBag, CheckCircle, ChevronDown, Search, Filter, X, Heart, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const products = [
  // Gaming Collection
  { name: "PRVZ PixelWarp", category: "Gaming", image: "/images/gaming1.png", price: 1499, sale: false },
  { name: "PRVZ RetroConsole", category: "Gaming", image: "/images/gaming2.png", price: 1499, sale: false },
  
  
  // Gym Collection
  { name: "PRVZ IronFlex", category: "Gym", image: "/images/gym1.png", price: 1499, sale: false },
  { name: "PRVZ MuscleTech", category: "Gym", image: "/images/gym3.png", price: 1499, sale: false },
  { name: "PRVZ CardioBurn", category: "Gym", image: "/images/gym4.png", price: 1499, sale: false },
  { name: "PRVZ Gain", category: "Gym", image: "/images/gym6.png", price: 1499, sale: false },
  
  // Technology Collection
  { name: "PRVZ QuantumChip", category: "Technology", image: "/images/tec1.png", price: 1499, sale: false },
  { name: "PRVZ CyberMatrix", category: "Technology", image: "/images/tec2.png", price: 1499, sale: false },
  { name: "PRVZ NanoByte", category: "Technology", image: "/images/tec3.png", price: 1499, sale: false },
  { name: "PRVZ FutureGrid", category: "Technology", image: "/images/tec4.png", price: 1499, sale: false },
  
  // Travel Collection
  { name: "PRVZ GlobeTrotter", category: "Travel", image: "/images/travel1.png", price: 1499, sale: false },
  { name: "PRVZ WanderLust", category: "Travel", image: "/images/travel2.png", price: 1499, sale: false },
  { name: "PRVZ NomadVibe", category: "Travel", image: "/images/travel3.png", price: 1499, sale: false },
  { name: "PRVZ AdventurePeak", category: "Travel", image: "/images/travel4.png", price: 1499, sale: false },
  
    // Cultural collection 
  { name: "PRVZ Khana Badosh", category: "Cultural", image: "/images/khana1.png", price: 1499, sale: false },
  { name: "PRVZ Fate Punk", category: "Cultural", image: "/images/punk2.png", price: 1499, sale: false },
  { name: "PRVZ Death Meets", category: "Cultural", image: "/images/get3.png", price: 1499, sale: false },
  // { name: "PRVZ Fly", category: "Cultural", image: "/images/fly.png", price: 1499, sale: false },
  
  // Couple collection 
  { name: "PRVZ Love Forever", category: "Couple Goal", image: "/images/couple1.png", price: 2599, sale: false },

  // // Caps Collection
  // { name: "PRVZ CrownCaps", category: "Caps", image: "/images/cap1.jpg", price: 800, sale: true },
  // { name: "PRVZ FlightCap", category: "Caps", image: "/images/cap2.jpg", price: 800, sale: false },
  // { name: "PRVZ AuraPeak", category: "Caps", image: "/images/cap3.jpg", price: 800, sale: true },
  // { name: "PRVZ StreetSpell", category: "Caps", image: "/images/cap4.jpg", price: 800, sale: false },
  // { name: "PRVZ BolPRVZenie", category: "Caps", image: "/images/c1.jpg", price: 800, sale: true },
  // { name: "PRVZ MysticCover", category: "Caps", image: "/images/c2.jpg", price: 800, sale: false },
  // { name: "PRVZ UrbanHalo", category: "Caps", image: "/images/c3.jpg", price: 800, sale: true },
  // { name: "PRVZ DreamTopper", category: "Caps", image: "/images/c4.jpg", price: 800, sale: false },
  // { name: "PRVZ VibeVault", category: "Caps", image: "/images/c5.jpg", price: 800, sale: true },
  // { name: "PRVZ SkyCraft", category: "Caps", image: "/images/c6.jpg", price: 800, sale: false },
  
  // T-Shirts Collection
  { name: "PRVZ NeonNova", category: "T-Shirts", image: "/images/s1.png", price: 1499, sale: false },
  { name: "PRVZ PixelPulse", category: "T-Shirts", image: "/images/s2.png", price: 1499, sale: false },
  { name: "PRVZ CyberSpirit", category: "T-Shirts", image: "/images/s3.png", price: 1499, sale: false },
  { name: "PRVZ GlitchGlory", category: "T-Shirts", image: "/images/s4.png", price: 1499, sale: false },
  { name: "PRVZ MatrixMuse", category: "T-Shirts", image: "/images/s7.png", price: 1499, sale: false },
  { name: "PRVZ TechTonic", category: "T-Shirts", image: "/images/s15.png", price: 1499, sale: false },
  { name: "PRVZ CodeCraze", category: "T-Shirts", image: "/images/s16.png", price: 1499, sale: false },
  { name: "PRVZ FutureFabric", category: "T-Shirts", image: "/images/s17.png", price: 1499, sale: false },
  { name: "PRVZ DigitalDrip", category: "T-Shirts", image: "/images/s18.png", price: 1499, sale: false },
  { name: "PRVZ HologramHood", category: "T-Shirts", image: "/images/s19.png", price: 1499, sale: false },
  { name: "PRVZ QuantumQuirk", category: "T-Shirts", image: "/images/ps1.jpg", price: 1499, sale: false },
  { name: "PRVZ RetroRush", category: "T-Shirts", image: "/images/ps2.jpg", price: 1499, sale: false },
  { name: "PRVZ ArcadeAura", category: "T-Shirts", image: "/images/ps4.jpg", price: 1499, sale: false },
  { name: "PRVZ PixelPanther", category: "T-Shirts", image: "/images/ps6.jpg", price: 1499, sale: false },
  { name: "PRVZ NeonNomad", category: "T-Shirts", image: "/images/slider5.png", price: 1499, sale: false }
];

const sizes = ["S", "M", "L", "XL"];
const categories = ["All", "Gaming", "Gym", "Technology", "Travel", "Street Style", "Cultural", "Couple Goal", "Caps", "T-Shirts"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under PKR 1000", min: 0, max: 999 },
  { label: "PKR 1000 - PKR 1499", min: 1000, max: 1499 },
  { label: "PKR 1499 - PKR 2000", min: 1499, max: 2000 },
  { label: "Above PKR 2000", min: 2001, max: Infinity }
];

const Index = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("Popular");

  useEffect(() => {
    setIsClient(true);
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
    
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    
    const handleClickOutside = (event: MouseEvent) => {
      const categoryDropdown = document.getElementById("category-dropdown");
      const priceDropdown = document.getElementById("price-dropdown");
      
      if (categoryDropdown && !categoryDropdown.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (priceDropdown && !priceDropdown.contains(event.target as Node)) {
        setIsPriceOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddToCart = (product: any, index: number) => {
    const size = selectedSizes[index] || "M";
    const productWithSize = { ...product, size, quantity: 1 };
    
    const existingProductIndex = cart.findIndex(
      item => item.name === product.name && item.size === size
    );
    
    let newCart;
    if (existingProductIndex >= 0) {
      newCart = [...cart];
      newCart[existingProductIndex].quantity += 1;
    } else {
      newCart = [...cart, productWithSize];
    }
    
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setAddedToCart(index);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const filteredProducts = products
    .filter(product => selectedCategory === "All" || product.category === selectedCategory)
    .filter(product => {
      const range = priceRanges.find(r => r.label === selectedPriceRange) || priceRanges[0];
      return product.price >= range.min && product.price <= range.max;
    })
    .filter(product => 
      searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch(sortOption) {
        case "Price: Low to High": return a.price - b.price;
        case "Price: High to Low": return b.price - a.price;
        default: return 0;
      }
    });

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Gaming": return "bg-purple-100 text-purple-800";
      case "Gym": return "bg-red-100 text-red-800";
      case "Technology": return "bg-blue-100 text-blue-800";
      case "Travel": return "bg-green-100 text-green-800";
      case "Street Style": return "bg-yellow-100 text-yellow-800";
      case "Caps": return "bg-indigo-100 text-indigo-800";
      case "T-Shirts": return "bg-green-100 text-green-800";
      case "Cultural": return "bg-red-100 text-red-800";
      case "Couple Goal": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"></div>
      </div>

      <AnimatePresence>
        {addedToCart !== null && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center text-sm"
          >
            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
            <span>Added to cart</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mb-3 font-medium">
            PARVAAZ Collections
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Premium Streetwear & Lifestyle
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500">
            Explore our exclusive collections for gaming, gym, technology, travel, and street style enthusiasts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search DG collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <div id="category-dropdown" className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? "transform rotate-180" : ""}`} />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center ${
                        selectedCategory === category ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${getCategoryColor(category).replace('text-', 'bg-').split(' ')[0]}`}></span>
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div id="price-dropdown" className="relative">
              <button
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>{selectedPriceRange}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isPriceOpen ? "transform rotate-180" : ""}`} />
              </button>
              
              {isPriceOpen && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => {
                        setSelectedPriceRange(range.label);
                        setIsPriceOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm ${
                        selectedPriceRange === range.label ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 bg-gray-900 text-white rounded-lg py-2 px-3 text-sm hover:bg-gray-800 transition-colors"
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-gray-900 focus:ring-gray-900"
                        />
                        <span className={`text-sm ${getCategoryColor(category)} px-2 py-1 rounded-full`}>
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={selectedPriceRange === range.label}
                          onChange={() => setSelectedPriceRange(range.label)}
                          className="h-4 w-4 text-gray-900 focus:ring-gray-900"
                        />
                        <span className="text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
                  <div className="space-y-2">
                    {["Popular", "Price: Low to High", "Price: High to Low"].map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={sortOption === option}
                          onChange={() => setSortOption(option)}
                          className="h-4 w-4 text-gray-900 focus:ring-gray-900"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {isClient ? filteredProducts.length : '...'} {isClient ? (filteredProducts.length === 1 ? "product" : "products") : ''}
          </div>
          {selectedCategory !== "All" && (
            <div className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(selectedCategory)}`}>
              {selectedCategory} Collection
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product, index) => {
            const isWishlisted = wishlist.includes(index);
            const discountPercent = product.sale ? Math.round(Math.random() * 10 + 10) : 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative group"
              >
                {product.sale && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    SALE {discountPercent}% OFF
                  </div>
                )}
                
                <div className="relative aspect-square">
                  <img
                    src={product.image || "https://placehold.co/400x400/e5e7eb/9ca3af?text=PRVZ"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <button
                    onClick={() => {
                      const newWishlist = wishlist.includes(index)
                        ? wishlist.filter(item => item !== index)
                        : [...wishlist, index];
                      setWishlist(newWishlist);
                      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
                      isWishlisted 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
                    {product.name}
                  </h3>
                  <div className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(product.category)} inline-block mb-2`}>
                    {product.category}
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-semibold text-gray-900">
                      PKR {product.price.toLocaleString()}
                    </span>
                    {product.sale && (
                      <span className="ml-2 text-xs text-gray-500 line-through">
                        PKR {Math.round(product.price * (1 + discountPercent/100)).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-1 mb-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes({...selectedSizes, [index]: size})}
                        className={`text-xs py-1 rounded transition-colors ${
                          selectedSizes[index] === size || (!selectedSizes[index] && size === "M")
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product, index)}
                    className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded flex items-center justify-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200 mt-6">
            <Search className="w-10 h-10 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedPriceRange("All");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {isClient && cart.length > 0 && (
        <Link href="/cart" passHref>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className="fixed bottom-6 right-6 bg-gray-900 text-white p-3 rounded-full shadow-lg z-50 flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
              </span>
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              View Cart
            </span>
          </motion.div>
        </Link>
      )}
    </div>
  );
};

export default Index;