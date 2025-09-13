"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();

  const handleCreateDesign = () => {
    router.push("/create-design");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-black bg-cover bg-center text-white px-6 sm:px-12 py-12"
      style={{ backgroundImage: "url('/images/boy.png')" }}
    >
      {/* Heading Section */}
      <motion.div
        className="text-center mb-10 mt-12 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl sm:text-4xl italic font-extrabold text-gray-300">
          Meet the Magic Behind the Designs
        </h2>
        <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#d1d1d1] via-[#aeaeae] to-[#000d5a] bg-clip-text text-transparent mt-2">
          Welcome to PARVAAZ
        </h1>
      </motion.div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-4 gap-8">
        {/* Left Side (Text) */}
        <motion.div
          className="md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
            Where imagination meets craftsmanship! We turn your ideas into reality with personalized designs for hoodies, t-shirts, mugs, and more. Whether it's creating unique merchandise for your brand or gifts that stand out, we're here to make every design meaningful and memorable.
          </p>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
            At PARVAAZ, we believe every design tells a story. Our passionate team combines creativity and precision to deliver high-quality, custom products that reflect your style and vision. Along with modern fashion, we also work on cultural and traditional designs that carry a unique essence. These exclusive pieces are available on our website and Instagram page, showcasing the perfect blend of heritage and contemporary style. Let us bring a little magic to your designs and help you make an unforgettable impression!
          </p>
        </motion.div>

        {/* Right Side (Image) */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Image
            src="/images/img1.png"
            alt="PARVAAZ"
            width={400}
            height={400}
            className="rounded-lg shadow-lg w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        className="mt-12 text-center max-w-4xl px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <h2 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#d1d1d1] via-[#aeaeae] to-[#000d5a] bg-clip-text text-transparent">
          Your Design, Your Rules – Create Effortlessly!
        </h2>

        <div className="mt-6 space-y-3 text-lg sm:text-xl lg:text-2xl text-gray-300">
          <p>From Idea to Reality – Upload, Adjust, Done!</p>
          <p>Customize with Ease – Design That Fits You!</p>
          <p>Simple Steps to Stunning Designs!</p>
          <p>Transform Ideas into Products – Your Way!</p>
          <p>Upload. Adjust. Create Magic.</p>
          <p>Bring Your Vision to Life – Effortlessly!</p>
          <p>Design Made Simple – Just Upload and Perfect!</p>
        </div>

        <motion.button
          className="mt-10 mb-20 px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-2xl font-bold text-white bg-[#001534] shadow-xl hover:bg-gray-700 transition duration-300 tracking-wide rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={handleCreateDesign}
        >
          CREATE DESIGN
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AboutPage;
