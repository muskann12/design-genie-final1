export default function Banner() {
  return (
    <div className="relative bg-gradient-to-br from-[#0e1a31] via-[#002942] to-[#0a1120] text-white text-center py-16 px-5 overflow-hidden w-full min-h-[60vh] flex flex-col justify-center items-center">
      {/* Animated decorative elements */}
      <div className="absolute top-5 left-10 w-10 h-10 bg-white/20 rounded-full animate-float"></div>
      <div className="absolute bottom-10 right-20 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
      <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-white/15 rounded-full animate-float animation-delay-3000"></div>
      
      {/* Floating product icons */}
      <div className="absolute top-1/4 right-1/5 w-14 h-14 animate-float animation-delay-1000">
        <span className="text-4xl">👕</span>
      </div>
      <div className="absolute bottom-1/3 left-1/5 w-14 h-14 animate-float animation-delay-2500">
        <span className="text-4xl">🧥</span>
      </div>
      <div className="absolute top-1/3 right-1/3 w-14 h-14 animate-float animation-delay-3500">
        <span className="text-4xl">☕</span>
      </div>

      {/* Glowing center element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full bg-blue-400/10 blur-3xl animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 space-y-6 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 animate-fadeIn">
          Create Custom <span className="text-white">T-Shirts, Hoodies & Caps</span>
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl md:text-2xl font-medium text-gray-300 mx-auto px-4 leading-relaxed animate-fadeIn animation-delay-300">
          Transform your ideas into wearable art! Design personalized t-shirts, cozy hoodies, 
          and premium caps with your favorite images, text, or unique designs. 
          Perfect for gifts, events, or personal style.
        </p>
        
        
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent"></div>
    </div>
  );
}