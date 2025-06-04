'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { HiClipboardCopy, HiCheck } from "react-icons/hi";

const mainCategories: Record<string, Record<string, string[]>> = {
  "T-Shirts": {
    "T-Shirt Design Prompts": [
      "A minimalist Earth illustration with 'Protect Our Planet' in stylish typography.",
      "A tree with roots forming a recycling symbol.",
      "A mountain landscape with 'Nature is Home' in handwritten script.",
      "An abstract pattern of green leaves and blue water waves.",
      "A cute Earth character wearing sunglasses and smiling.",
      "A minimal line-art whale with 'Save the Oceans' written beneath it.",
      "A vintage eco-conscious badge with 'Go Green, Stay Clean.'",
      "A futuristic eco-city with solar panels and wind turbines.",
      "A silhouette of a rainforest inside an animal shape.",
      "A watercolor-style tree growing inside a lightbulb.",
      "'FEARLESS' in glitch-style bold typography.",
      "The word 'HUSTLE' in a metallic 3D effect.",
      "'Dream Big' in retro neon-style typography.",
      "'GRIND MODE' with a shattered text effect.",
      "'SUCCESS' written in minimal, futuristic font.",
      "'Stay Wild' in a brush-stroke calligraphy style.",
      "'WORK HARD' written in a street graffiti-inspired font.",
      "'LIFE IS SHORT' inside a barcode-style design.",
      "'NO LIMITS' with 3D isometric typography.",
      "'BREAK THE RULES' in distorted, dynamic text."
    ],
    "Streetwear & Urban Fashion T-Shirt Designs 🏙": [
      "A graffiti-style spray paint can with neon splashes.",
      "A masked urban character with a hoodie and chains.",
      "A sneaker with a futuristic cyberpunk glow.",
      "A street-style monkey wearing sunglasses and headphones.",
      "Bold text saying 'No Rules' in a glitchy style.",
      "A roaring tiger with a chain around its neck.",
      "A city skyline at night with neon lights.",
      "An urban skater mid-air doing a trick.",
      "Hip-hop album covers with a unique color scheme.",
      "A cyberpunk-style gas mask with holographic reflections."
    ],
    "Motivational & Inspirational T-Shirt Designs ": [
      "'Stay Strong' in bold, brush-stroke typography.",
      "A mountain peak with 'Keep Climbing' written below.",
      "'Never Give Up' with a shattered effect.",
      "A rising sun with 'New Day, New Opportunities.'",
      "'One More Rep' for gym and fitness lovers.",
      "A lion's face with 'Lead with Strength.'",
      "An eagle soaring with 'Sky's the Limit.'",
      "'Dream Big, Work Hard' in a retro style.",
      "A silhouette of a runner with 'Push Beyond Limits.'",
      "'Progress Not Perfection' in minimal typography."
    ],
     "Eco-Friendly Designs": [
      "A minimalist Earth illustration with 'Protect Our Planet'.",
      "A tree with roots forming a recycling symbol.",
      "A watercolor-style tree growing inside a lightbulb.",
       "'FEARLESS' in glitch-style bold typography.",
      "The word 'HUSTLE' in a metallic 3D effect.",
      "'Dream Big' in retro neon-style typography.",
       
    ],
    "Minimal Zen": [
  "A single lotus flower with soft pastel background.",
  "Simple line art of meditating person with balanced chakras.",
  "'Breathe' written in soft cursive with cloud motifs.",
  "Abstract waves and moon phases in monochrome.",
  "A digital circuit board forming a heart shape.",
  "'404 NOT FOUND' styled in cyberpunk colors.",
  "Robot hand holding a flower with glitch effect.",
  "'UPLOADING DREAMS' with progress bar illustration.",
],
    "Royal / Luxury Vibes": [
  "'QUEEN' in gold foil style with crown icon.",
  "Lion's face with glowing eyes and ornate mane design.",
  "Black and gold geometric design with luxury texture.",
  "'ROYALTY' with vintage crest emblem background.",
  "'ROYALTY' with vintage crest emblem background.",
  "'KING MODE' with glowing crown and diamond texture.",
  "Gold chains and laurel wreaths forming a bold frame.",
  "'ELITE' written in a serif font with velvet background.",
  "Ornate sword crossing behind a golden shield crest.",
],
  },
  "Caps": {
    "Streetwear & Hip-Hop Caps": [
      "Bold graffiti-style typography with a city skyline.",
      "A neon skull wearing headphones in a street art style.",
      "A roaring lion with a hip-hop crown and golden chains.",
      "A spray paint can with an explosion of colors.",
      "A skateboard with flames and a grunge texture.",
      "A hand holding a vintage microphone with hip-hop elements.",
      "A DJ turntable with musical notes floating around.",
      "The word 'VIBES' in a glitchy street-style font.",
      "A masked urban ninja with glowing blue eyes.",
      "A roaring tiger with lightning effects."
    ],
    "Gaming & Esports Caps": [
      "A futuristic gaming controller with neon effects.",
      "A pixelated 'GAME OVER' sign with a glitch effect.",
      "A cyberpunk-style gamer wearing a VR headset.",
      "A retro arcade machine with electric sparks.",
      "A first-person shooter character with a sniper rifle.",
      "A gaming mouse with a trail of speed effects.",
      "A battle royale-inspired skull with crossed swords.",
      "A 'Respawn Ready' text with a futuristic theme.",
      "A glowing power button symbol with circuit board elements.",
      "A joystick with a 'Level Up' banner."
    ],
    "Minimalist & Aesthetic Caps": [
      "A simple black and white mountain outline.",
      "A tiny crescent moon and stars in a minimal style.",
      "A single brushstroke forming a wolf silhouette.",
      "A small, delicate lotus flower sketch.",
      "A simple wave line representing the ocean.",
      "A geometric deer head with thin golden lines.",
      "The word 'Balance' in an elegant, thin font.",
      "An abstract spiral representing energy and focus.",
      "A clean, modern infinity loop design.",
      "A soft gradient sunset with a bird silhouette."
    ],
    "Motivational & Quote-Based Caps": [
      "'Dream Big, Hustle Hard' in a bold font.",
      "'Never Give Up' with a lightning bolt icon.",
      "'Born to Win' in a brushstroke-style font.",
      "'Stay Humble' with a simple underline.",
      "'Success is a Mindset' in a modern layout.",
      "'Fearless' with an eagle silhouette.",
      "'Grind Now, Shine Later' with a dynamic font.",
      "'Believe & Achieve' with a rising sun effect.",
      "'No Pain, No Gain' with a gym dumbbell icon.",
      "'Good Vibes Only' in a colorful aesthetic."
    ],
    "Pakistani Cultural & Patriotic Caps": [
      "The crescent and star with a calligraphy effect.",
      "A truck art-inspired floral pattern.",
      "The word 'Pakistan' in traditional Urdu script.",
      "Minar-e-Pakistan with a grunge effect.",
      "An artistic rendering of Quaid-e-Azam's portrait.",
      "The phrase 'Dil Dil Pakistan' in a stylized font.",
      "A cricket bat and ball with 'Game On!' written.",
      "A green and white wave pattern representing the flag.",
      "A truck art peacock with vibrant colors.",
      "A traditional ajrak pattern in a minimal style."
    ],
    
  },
};

const Index = () => {
  const [expandedMainCategory, setExpandedMainCategory] = useState<string | null>(null);
  const [expandedSubCategories, setExpandedSubCategories] = useState<string[]>([]);
  const [copiedPrompts, setCopiedPrompts] = useState<string[]>([]);

  const toggleMainCategory = (category: string) => {
    setExpandedMainCategory((prev) => (prev === category ? null : category));
    setExpandedSubCategories([]);
  };

  const toggleSubCategory = (subCategory: string) => {
    setExpandedSubCategories((prev) =>
      prev.includes(subCategory) ? prev.filter((cat) => cat !== subCategory) : [...prev, subCategory]
    );
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompts((prev) => [...prev, text]);
      alert("Copied to clipboard!");
      setTimeout(() => {
        setCopiedPrompts((prev) => prev.filter((p) => p !== text));
      }, 2000);
    } catch (err) {
      alert("Failed to copy. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4c6489] to-[#001534]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <motion.div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">AI Prompt Collection</h1>
          <p className="text-white text-opacity-80 max-w-2xl mx-auto text-lg">
            Select a category to explore design prompts.
          </p>
        </motion.div>

        <motion.div className="grid gap-6">
          {Object.entries(mainCategories).map(([mainCategory, subCategories]) => (
            <motion.div key={mainCategory} className="rounded-2xl overflow-hidden border bg-gray-200 shadow-sm">
              <motion.button
                onClick={() => toggleMainCategory(mainCategory)}
                className="w-full px-6 py-4 flex justify-between items-center text-black text-left hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">{mainCategory}</span>
                <motion.div animate={{ rotate: expandedMainCategory === mainCategory ? 180 : 0 }}>
                  <IoChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedMainCategory === mainCategory && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t">
                    <div className="grid gap-4 p-4">
                      {Object.entries(subCategories).map(([subCategory, prompts]) => (
                        <motion.div key={subCategory} className="rounded-xl border bg-white">
                          <motion.button
                            onClick={() => toggleSubCategory(subCategory)}
                            className="w-full px-6 py-3 flex justify-between items-center text-left hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-md font-medium text-gray-900">{subCategory}</span>
                            <motion.div animate={{ rotate: expandedSubCategories.includes(subCategory) ? 180 : 0 }}>
                              <IoChevronDown className="w-5 h-5 text-gray-500" />
                            </motion.div>
                          </motion.button>

                          <AnimatePresence>
                            {expandedSubCategories.includes(subCategory) && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t">
                                <div className="grid gap-2 p-4">
                                  {prompts.map((prompt) => (
                                    <motion.div key={prompt} className="group p-4 rounded-xl bg-gray-50 flex justify-between items-center gap-4">
                                      <span className="text-gray-700 text-sm sm:text-base">{prompt}</span>
                                      <button
                                        onClick={() => copyToClipboard(prompt)}
                                        className="shrink-0 p-2 rounded-lg text-gray-500 hover:text-gray-900"
                                        aria-label="Copy to clipboard"
                                      >
                                        {copiedPrompts.includes(prompt) ? <HiCheck className="w-5 h-5" /> : <HiClipboardCopy className="w-5 h-5" />}
                                      </button>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
