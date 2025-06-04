'use client';
import { useState, useRef, useEffect } from "react";
import Card from "@/app/components/ui/card";
import { CardContent } from "@/app/components/ui/cardconten";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, Sparkles, ShoppingCart, Check, ChevronRight, Palette, Shirt, Zap, Loader } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Design {
  area: string;
  image: string;
  prompt?: string;
}

interface CartItem {
  name: string;
  designs: Design[];
  price: number;
  size: string;
  color: string;
  quantity: number;
  colorCodes?: string[];
  sizes?: string[];
}

interface ProductItem {
  name: string;
  image: string;
  sizes: string[];
  colors: string[];
  price: number;
  colorCodes: string[];
  designAreas: {
    name: string;
    preview: string;
    className?: string;
  }[];
}

const CreatorDesignPage = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("Shirt");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("Black");
  const [size, setSize] = useState("M");
  const [activeDesignArea, setActiveDesignArea] = useState("Front");
  const [designs, setDesigns] = useState<Record<string, Design>>({});
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const prefix = "create design for printing ";
  
  const setImageRef = (area: string) => (el: HTMLDivElement | null) => {
    imageRefs.current[area] = el;
  };

  const items: ProductItem[] = [
    { 
      name: "Shirt", 
      image: "/images/plain-shirt1.png", 
      sizes: ["S", "M", "L", "XL"], 
      colors: ["Black", "White", "Brown", "Orange", "Red", "Blue", "Yellow", "Green", "Navy", "Pink"], 
      price: 1300,
      colorCodes: ["#000000", "#FFFFFF", "#795548", "#FF9800", "#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#001F3F", "#E91E63"],
      designAreas: [
        { name: "Front", preview: "/images/front.png", className: "col-span-1" },
        { name: "Back", preview: "/images/back.png", className: "col-span-1" },
        { name: "Right Sleeve", preview: "/images/sleeve.png", className: "col-span-1" },
        { name: "Left Sleeve", preview: "/images/sleeve.png", className: "col-span-1" }
      ]
    },
    { 
      name: "Cap", 
      image: "/images/plain-cap.png", 
      sizes: ["M", "L"], 
      colors: ["Black", "Navy", "White", "Pink"], 
      price: 800,
      colorCodes: ["#000000", "#001F3F", "#FFFFFF", "#E91E63"],
      designAreas: [
        { name: "Front", preview: "/images/capfront.png", className: "col-span-1" },
        { name: "Side", preview: "/images/capside.png", className: "col-span-1" },
        { name: "Back", preview: "/images/capback.png", className: "col-span-1" }
      ]
    },
  ];

  const suggestedPrompts = [
    "Vintage car by the beach, golden hour, retro look",
    "Floral skull art, dark theme, modern tattoo design",
    "Minimalist quote: 'Stay Wild', bold font, white background",
    "Space girl with glowing hair, stars around, surreal feel",
    "Arabic calligraphy, gold ink on black, elegant style",
    "Hand holding blooming flowers, minimal line art, white canvas",
    "Text art: 'Soft Heart, Strong Mind' — serif font, beige tones, clean poster look",
    "Text art: 'Soft Heart, Strong Mind' — serif font, beige tones, clean poster look",
    "Aesthetic word art: 'Sabr ✦ Shukr' — elegant Arabic-English mix, soft pastel background"
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = prefix.length;
      inputRef.current.selectionEnd = prefix.length;
    }
    const currentItem = items.find(item => item.name === selectedItem);
    if (currentItem) {
      setActiveDesignArea(currentItem.designAreas[0].name);
      const newDesigns = {...designs};
      currentItem.designAreas.forEach(area => {
        if (!newDesigns[area.name]) {
          newDesigns[area.name] = { area: area.name, image: "", prompt: "" };
        }
      });
      setDesigns(newDesigns);
    }
  }, [selectedItem]);

  const selectedProduct = items.find((item) => item.name === selectedItem) || {
    name: "", 
    image: "", 
    sizes: [], 
    colors: [], 
    colorCodes: [], 
    price: 0, 
    designAreas: []
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (Object.values(imageRefs.current).some(ref => ref?.contains(e.target as Node))) {
        e.preventDefault();
        toast.info("Design saving is disabled to protect your work");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 's' || e.key === 'p')) || e.key === 'PrintScreen') {
        e.preventDefault();
        toast.info("Design saving is disabled to protect your work");
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, area: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error("Only JPG/PNG images are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDesigns(prev => ({
        ...prev,
        [area]: { ...prev[area], image: reader.result as string }
      }));
      toast.success(`${area} design uploaded successfully`);
    };
    reader.readAsDataURL(file);
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setCustomPrompt(prompt);
    toast.success(`Selected: ${prompt}`);
  };

  const generateImage = async () => {
    const prompt = prefix + customPrompt.trim();
    if (!prompt.trim() || prompt === prefix) {
      toast.error("Please enter your design description!");
      return;
    }
  
    setLoading(true);
    toast.info(`Generating ${activeDesignArea} design...`);
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() })
      });

      if (!response.ok) throw new Error('Failed to generate image');

      const data = await response.json();
      if (!data.imageUrl) throw new Error("Invalid response format");

      const blobResponse = await fetch(data.imageUrl);
      const blob = await blobResponse.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      setDesigns(prev => ({
        ...prev,
        [activeDesignArea]: {
          ...prev[activeDesignArea],
          image: blobUrl,
          prompt: prompt.trim()
        }
      }));
      toast.success(`${activeDesignArea} design created successfully!`);
    } catch (error: any) {
      console.error("Generation Error:", error);
      toast.error(error.message || "Failed to generate design");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = selectedProduct.price;
    const designCount = Object.values(designs).filter(design => design.image).length;
    const additionalDesignCost = designCount >= 2 ? 300 : 0;
    return (basePrice + additionalDesignCost) * quantity;
  };

  const addToCart = () => {
    if (typeof window === 'undefined') return;
    
    if (!Object.values(designs).some(design => design.image)) {
      toast.error("Please create at least one design first");
      return;
    }

    const cartItem: CartItem = {
      name: selectedProduct.name,
      designs: Object.values(designs).filter(design => design.image),
      price: calculateTotalPrice() / quantity,
      size,
      color,
      quantity,
      colorCodes: selectedProduct.colorCodes,
      sizes: selectedProduct.sizes
    };

    const existingCart = localStorage.getItem("cart");
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    cartItems.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    setIsAddedToCart(true);
    toast.success(`${selectedProduct.name} with ${cartItem.designs.length} designs added to cart!`, {
      action: { label: "View Cart", onClick: () => window.location.href = "/cart" },
      duration: 3000
    });
    
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith(prefix)) {
      e.target.value = prefix + (value || customPrompt);
      if (inputRef.current) {
        inputRef.current.selectionStart = prefix.length + (value || customPrompt).length;
        inputRef.current.selectionEnd = prefix.length + (value || customPrompt).length;
      }
      return;
    }
    setCustomPrompt(value.slice(prefix.length));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const cursorPos = input.selectionStart;
    
    if (cursorPos !== null && cursorPos <= prefix.length) {
      if (e.key === 'Backspace' || e.key === 'Delete') e.preventDefault();
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        input.setSelectionRange(prefix.length, prefix.length);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const cursorPos = input.selectionStart;
    if (cursorPos !== null && cursorPos < prefix.length) {
      input.setSelectionRange(prefix.length, prefix.length);
    }
  };

  const removeDesign = (area: string) => {
    setDesigns(prev => ({
      ...prev,
      [area]: { ...prev[area], image: "" }
    }));
  };

  return (
    <div className="p-4 md:p-6 bg-neutral-100 min-h-screen">
      <div className="text-center mb-6 md:mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-3xl font-extrabold tracking-wide text-neutral-800"
        >
          Atelier <span className="font-extrabold">Design</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-500 mt-1 text-sm"
        >
          Craft your custom {selectedItem.toLowerCase()} with precision
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-5 rounded-lg shadow-sm border border-neutral-200"
        >
          <h3 className="text-base font-normal text-neutral-700 mb-4 flex items-center">
            <span className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center mr-2">
              <Shirt size={14} className="text-neutral-600" />
            </span>
            Product Configuration
          </h3>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {items.map((item) => (
              <motion.div
                key={`product-${item.name}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-2 cursor-pointer transition-all duration-300 rounded-lg border ${
                    selectedItem === item.name 
                      ? "border-neutral-800 bg-neutral-50" 
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                  onClick={() => {
                    setSelectedItem(item.name);
                    setSize(item.sizes[0] || "");
                    setColor(item.colors[0] || "Black");
                    setDesigns({});
                    setIsAddedToCart(false);
                  }}
                >
                  <CardContent className="flex flex-col items-center p-1">
                    <div className="w-16 h-16 flex items-center justify-center mb-2">
                      <img src={item.image} alt={item.name} className="object-contain h-full"/>
                    </div>
                    <p className="text-center font-normal text-neutral-700 text-sm">{item.name}</p>
                    <p className="text-center text-xs font-light text-neutral-500 mt-0.5">PKR {item.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedProduct.designAreas.length > 0 && (
            <div className="mb-4">
              <label className="block text-xs font-normal text-neutral-600 mb-2">
                Design Placement <span className="ml-1 text-neutral-400">({selectedItem})</span>
              </label>
              <div className={`grid ${selectedItem === "Shirt" ? "grid-cols-2" : "grid-cols-4"} gap-2`}>
                {selectedProduct.designAreas.map((area) => (
                  <motion.button
                    key={`area-${area.name}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative overflow-hidden rounded-lg border ${
                      activeDesignArea === area.name 
                        ? "border-blue-600 ring-2 ring-blue-200" 
                        : "border-neutral-200 hover:border-neutral-300"
                    } ${area.className || ''} h-24`}
                    onClick={() => setActiveDesignArea(area.name)}
                  >
                    <div className="absolute inset-0 bg-neutral-50 flex items-center justify-center">
                      <img src={area.preview} alt={area.name} className="w-full h-full object-contain p-2"/>
                    </div>
                    <div className={`absolute inset-0 flex items-end justify-center ${
                      activeDesignArea === area.name ? 'bg-blue-50/20' : 'bg-white/20'
                    }`}>
                      <span className={`text-xs font-medium mb-1 ${
                        activeDesignArea === area.name ? 'text-blue-800' : 'text-neutral-700'
                      }`}>{area.name}</span>
                    </div>
                    {activeDesignArea === area.name && (
                      <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5">
                        <Check size={10} />
                      </div>
                    )}
                    {designs[area.name]?.image && (
                      <div className="absolute top-1 left-1 bg-green-600 text-white rounded-full p-0.5">
                        <Check size={10} />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-xs font-normal text-neutral-600 mb-2">Color Selection</label>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.colors.map((col, index) => (
                <motion.div
                  key={`color-${col}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-7 h-7 rounded-full border cursor-pointer flex items-center justify-center transition-all ${
                    color === col ? "border-neutral-800" : "border-neutral-200"
                  }`}
                  style={{ backgroundColor: selectedProduct.colorCodes[index] }}
                  onClick={() => setColor(col)}
                >
                  {color === col && <Check size={12} className="text-white" />}
                </motion.div>
              ))}
            </div>
          </div>

          {selectedProduct.sizes.length > 0 && (
            <div className="mb-4">
              <label className="block text-xs font-normal text-neutral-600 mb-2">Size</label>
              <div className="flex gap-1.5">
                {selectedProduct.sizes.map((sz) => (
                  <motion.button
                    key={`size-${sz}`}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-1.5 text-xs rounded border transition-all ${
                      size === sz 
                        ? "bg-blue-950 text-white border-neutral-800" 
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
                    }`}
                    onClick={() => setSize(sz)}
                  >
                    {sz}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-normal text-neutral-600 mb-2">Quantity</label>
            <div className="flex items-center border border-neutral-200 rounded-lg w-min">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1 text-neutral-600 hover:bg-neutral-50 border-r text-sm"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </motion.button>
              <span className="px-3 py-1 text-neutral-800 w-6 text-center text-sm">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1 text-neutral-600 hover:bg-neutral-50 border-l text-sm"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-5 rounded-lg shadow-sm border border-neutral-200"
        >
          <h3 className="text-base font-normal text-neutral-700 mb-4 flex items-center">
            <span className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center mr-2">
              <Palette size={14} className="text-neutral-600" />
            </span>
            Design Studio - {activeDesignArea}
          </h3>

          <div 
            ref={setImageRef(activeDesignArea)}
            className="mb-4 h-96 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-center overflow-hidden relative"
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={(e) => {
              if (e.target instanceof HTMLImageElement) {
                e.preventDefault();
              }
            }}
          >
            {!designs[activeDesignArea]?.image ? (
              <motion.div 
                whileHover={{ scale: 0.99 }}
                className="p-4 text-center cursor-pointer h-full w-full flex flex-col items-center justify-center"
              >
                <label className="flex flex-col items-center cursor-pointer">
                  <UploadCloud size={28} className="text-neutral-400 mb-2" />
                  <span className="text-neutral-500 font-light text-sm">Upload your {activeDesignArea.toLowerCase()} design</span>
                  <span className="text-xs text-neutral-400 mt-0.5">PNG or JPG, 10MB max</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(e, activeDesignArea)} 
                  />
                </label>
              </motion.div>
            ) : (
              <div className="relative h-full w-full flex items-center justify-center p-3">
                <div className="absolute inset-0 z-10 select-none pointer-events-none"></div>
                <div className="h-full w-full flex items-center justify-center">
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={designs[activeDesignArea].image} 
                    alt={`Generated ${activeDesignArea}`} 
                    className="h-full w-full object-contain"
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      WebkitTouchCallout: 'none'
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeDesign(activeDesignArea)}
                  className="absolute top-2 right-2 bg-blue-950 text-white rounded-full p-1 hover:bg-neutral-800 z-20"
                >
                  <X size={12} />
                </motion.button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-normal text-neutral-600">Design Inspiration</label>
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/prompt")}
                className="flex items-center text-xs text-blue-600 hover:text-blue-800"
              >
                View all prompts <ChevronRight size={14} className="ml-0.5" />
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {suggestedPrompts.map((prompt, index) => (
                <motion.div
                  key={`prompt-${index}`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-2 py-1 text-xs rounded cursor-pointer border ${
                    selectedPrompt === prompt 
                      ? "bg-blue-950 text-white border-neutral-800" 
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
                  }`}
                  onClick={() => handlePromptSelect(prompt)}
                >
                  {prompt}
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                ref={inputRef}
                value={prefix + customPrompt}
                onChange={handlePromptChange}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                className="w-full px-4 py-2 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-neutral-800 focus:border-transparent text-neutral-800 bg-white placeholder-neutral-400"
                placeholder={`Describe your ${activeDesignArea.toLowerCase()} design...`}
              />
            </div>
          </div>

          <motion.button 
            onClick={generateImage} 
            disabled={loading} 
            className={`w-full py-2.5 rounded text-sm font-normal mb-3 ${
              loading 
                ? "bg-neutral-300 cursor-not-allowed" 
                : "bg-blue-950 hover:bg-neutral-700 text-white"
            } flex items-center justify-center gap-1.5`}
          >
            {loading ? (
              <>
                <Loader size={14} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                CREATE {activeDesignArea.toUpperCase()} DESIGN
              </>
            )}
          </motion.button>

          <motion.div 
            className="border-t border-neutral-100 pt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={!isAddedToCart ? { y: -1 } : {}}
              whileTap={!isAddedToCart ? { scale: 0.99 } : {}}
              className={`w-full py-2.5 rounded text-sm font-normal flex items-center justify-center gap-1.5 ${
                Object.values(designs).some(d => d.image)
                  ? isAddedToCart
                    ? "bg-green-600 text-white"
                    : "bg-blue-950 hover:bg-neutral-700 text-white"
                  : "bg-neutral-200 cursor-not-allowed text-neutral-400"
              }`}
              disabled={!Object.values(designs).some(d => d.image) || isAddedToCart}
              onClick={addToCart}
            >
              {isAddedToCart ? (
                <>
                  <Check size={14} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  Add to Cart • PKR {calculateTotalPrice().toFixed(2)}
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {isAddedToCart && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-center mt-2"
                >
                  <a 
                    href="/cart" 
                    className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-700 hover:underline"
                  >
                    Proceed to checkout <ChevronRight size={12} className="ml-0.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {selectedProduct.designAreas.length > 1 && (
            <div className="mt-4 pt-3 border-t border-neutral-100">
              <h4 className="text-xs font-normal text-neutral-600 mb-2">Design Progress</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.designAreas.map(area => (
                  <div 
                    key={`status-${area.name}`} 
                    className={`px-2 py-1 text-xs rounded border ${
                      designs[area.name]?.image 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : "bg-neutral-100 text-neutral-600 border-neutral-200"
                    }`}
                  >
                    {area.name}: {designs[area.name]?.image ? "✓" : "—"}
                  </div>
                ))}
              </div>
              {Object.values(designs).filter(d => d.image).length >= 2 && (
                <div className="mt-2 text-xs text-neutral-500">
                  +300 PKR for multiple designs
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorDesignPage;
