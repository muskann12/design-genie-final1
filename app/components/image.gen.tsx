'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, X, Sparkles, ArrowRight, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Index = () => {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [cart, setCart] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    "Futuristic city skyline",
    "Enchanted forest with glowing plants",
    "Cyberpunk-style character",
    "Space station orbiting a planet"
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be less than 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    toast.success(`Selected prompt: ${prompt}`);
  };

  const handleViewAll = () => {
    router.push('/prompts');
  };

  const handleAddToCart = () => {
    if (selectedPrompt) {
      setCart([...cart, selectedPrompt]);
      toast.success("Added to Cart");
    } else {
      toast.error("Select a prompt first");
    }
  };

  const generateImage = async () => {
    const prompt = selectedPrompt || customPrompt;
    if (!prompt) {
      toast.error("Please select or enter a prompt!");
      return;
    }

    setLoading(true);
    toast.info("Generating image, please wait...");

    try {
      const response = await axios.post(
        "/api/generate",
        { prompt },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.imageUrl) {
        setUploadedImage(response.data.imageUrl);
        toast.success("Image generated successfully!");
      } else {
        toast.error("Failed to generate image.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Something went wrong while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-lg w-full glass-card rounded-3xl overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-2">CREATE YOUR DESIGN</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Upload an image or create it with AI using creative prompts</p>
        </div>

        <div className="mb-6">
          {!uploadedImage ? (
            <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer">
              <label className="flex flex-col items-center">
                <UploadCloud size={24} className="text-blue-500 mb-2 sm:size-32" />
                <span className="text-gray-700 text-xs sm:text-sm font-medium">Click to Upload or Create Design</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          ) : (
            <div className="relative">
              <img src={uploadedImage} alt="Generated" className="w-full rounded-lg shadow-lg" />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Sparkles size={14} className="text-amber-500" /> Creative Prompts:
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedPrompts.map((prompt, index) => (
            <motion.div
              key={index}
              className={`px-3 py-1 text-xs sm:text-sm rounded-full cursor-pointer border ${selectedPrompt === prompt ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => handlePromptSelect(prompt)}
            >
              {prompt}
            </motion.div>
          ))}
        </div>

        <button className="text-blue-600 text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline mb-4" onClick={handleViewAll}>
          View All Prompts <ArrowRight size={14} />
        </button>

        <div className="mt-4">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 text-black"
            placeholder="Enter your custom prompt..."
          />
          <button onClick={generateImage} disabled={loading} className="w-full mt-2 py-2 bg-blue-950 text-white rounded-lg hover:bg-gray-600 text-xs sm:text-sm">
            {loading ? "Generating..." : "GENERATE DESIGN"}
          </button>
        </div>

        <button onClick={handleAddToCart} className="w-full mt-4 py-2 bg-gradient-to-r from-blue-950 to-gray-500 px-4 text-white flex items-center justify-center gap-2 rounded-lg hover:bg-green-600 text-xs sm:text-sm">
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </motion.div>
    </div>
  );
};

export default Index;
