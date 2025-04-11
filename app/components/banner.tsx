export default function Banner() {
  return (
    <div className="relative bg-gradient-to-r from-[#0e1a31] to-[#002942] text-white text-center py-10 px-5 overflow-hidden w-full min-h-[50vh] flex flex-col justify-center items-center">
      {/* Decorative circles */}
      <div className="absolute top-5 left-10 w-10 h-10 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-10 right-20 w-16 h-16 bg-white/10 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/15 rounded-full"></div>
      
      {/* Main content */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl text-blue-100 font-bold animate-pulse drop-shadow-lg px-4">
        Design Your Way: Create, Customize, Shine!
      </h1>
      <p className="mt-4 text-base sm:text-lg md:text-xl max-w-3xl font-inter text-gray-200 mx-auto px-4">
        Turn your imagination into reality by designing personalized shirts, hoodies, and mugs. Add your favorite text, images, or unique prompts, and we’ll transform them into stunning custom pieces just for you!
      </p>
    </div>
  );
}
