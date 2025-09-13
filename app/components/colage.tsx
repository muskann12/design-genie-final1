"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      delay,
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
});

const HeroBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navigateToDesign = (designType: string) => {
    router.push(`/create-design?type=${designType}`);
  };

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 sm:py-20 lg:py-28 bg-gradient-to-r from-[#83C2EA] to-[#001534]">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-0"></div>

      <div className="relative mx-auto max-w-7xl z-10">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn(0.1)}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium tracking-wide text-white mb-4 border border-white/20">
            PARVAAZ
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Design The Way You Like
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Create custom designs that match your unique style and vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn(0.2)}
            className="col-span-1 md:col-span-2 aspect-[4/3]"
            onClick={() => navigateToDesign("modern")}
          >
            <div className="group relative h-full w-full overflow-hidden rounded-xl border-2 border-white/20 cursor-pointer hover:border-white/40 transition-all duration-300 shadow-2xl hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <img
                src="/images/colage1.jpeg"
                alt="Modern design concept"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-wide mb-2">
                  FEATURED DESIGN
                </span>
                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-shadow-lg mb-2">
                  Modern Aesthetics
                </h2>
                <p className="text-sm text-white/90 max-w-md">
                  Bringing futuristic aesthetics into reality with clean lines and bold concepts
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <span className="bg-white text-blue-950 px-6 py-2 rounded-full font-semibold shadow-lg">
                  Create This Design
                </span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5 md:space-y-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn(0.3)}
              className="aspect-[3/2]"
              onClick={() => navigateToDesign("minimal")}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-xl border-2 border-white/20 cursor-pointer hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img
                  src="/images/c22.jpeg"
                  alt="Sleek minimal design"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                  <h2 className="font-bold text-xl sm:text-2xl text-shadow-md">
                    Sleek Minimalism
                  </h2>
                  <p className="text-xs text-white/80 mt-1">
                    Less is more with our minimalist approach
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <span className="bg-white text-blue-950 px-4 py-1 rounded-full font-semibold text-sm shadow-lg">
                    Create Design
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn(0.4)}
              className="aspect-[3/2]"
              onClick={() => navigateToDesign("personalized")}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-xl border-2 border-white/20 cursor-pointer hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img
                  src="/images/c33.jpeg"
                  alt="Custom design choices"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                  <h2 className="font-bold text-xl sm:text-2xl text-shadow-md">
                    Personalized Style
                  </h2>
                  <p className="text-xs text-white/80 mt-1">
                    Designs tailored to your unique preferences
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <span className="bg-white text-blue-950 px-4 py-1 rounded-full font-semibold text-sm shadow-lg">
                    Create Design
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn(0.6)}
          className="text-center"
        >
          <button
            onClick={() => router.push("/shop")}
            className="relative bg-white hover:bg-white/90 text-blue-950 px-8 py-4 font-semibold tracking-wide text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 rounded-full overflow-hidden group"
          >
            <span className="relative z-10">Explore the Collection</span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 z-10 group-hover:translate-x-2 transition-transform">
              →
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;