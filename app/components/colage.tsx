"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const HeroBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-[#83C2EA] to-[#001534]"></div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn(0.1)}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-xs font-medium tracking-wide text-black/80 mb-4 premium-border">
            DESIGN GENIE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white text-shadow-sm">
            Design The Way You Like
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn(0.2)}
            className="col-span-1 md:col-span-2 aspect-[4/3]"
          >
            <div className="group relative h-full w-full overflow-hidden rounded-xl premium-border premium-shadow">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              <img
                src="/images/colage1.jpeg"
                alt="Modern design concept"
                className="h-full w-full object-cover premium-transition group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <span className="inline-block rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-wide mb-2">
                  FEATURED
                </span>
                <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-shadow-md mb-1">
                  Modern Design
                </h2>
                <p className="text-sm text-white/90 max-w-md">
                  Bringing futuristic aesthetics into reality.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5 md:space-y-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn(0.3)}
              className="aspect-[3/2]"
            >
              <div className="group relative h-full w-full overflow-hidden rounded-xl premium-border premium-shadow">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img
                  src="/images/c22.jpeg"
                  alt="Sleek minimal design"
                  className="object-contain w-full mt-[-13px] premium-transition group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                  <h2 className="font-bold text-lg sm:text-xl text-shadow-md">
                    Sleek Minimalism
                  </h2>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn(0.4)}
              className="aspect-[3/2]"
            >
              <div className="group relative h-full w-full overflow-hidden rounded-xl premium-border premium-shadow">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img
                  src="/images/c33.jpeg"
                  alt="Custom design choices"
                  className="mt-[-33px] w-full object-contain premium-transition group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                  <h2 className="font-bold text-lg sm:text-xl text-shadow-md">
                    Personalized Aesthetics
                  </h2>
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
            className="bg-blue-950 hover:opacity-90 text-white px-8 py-4 font-semibold tracking-wide text-lg shadow-md transition-all transform active:scale-95 rounded-full"
          >
            Explore the Collection →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
