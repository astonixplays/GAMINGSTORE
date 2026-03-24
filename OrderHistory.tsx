import React from 'react';

interface HeroSectionProps {
  onBrowseClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBrowseClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-16 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFD36A]/5 via-transparent to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#FFD36A]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FF8A3D]/10 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
        {/* Trust Badge */}
        <div className="animate-fade-in-up mb-6">
          <span className="inline-flex items-center rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-black">
            <span className="mr-2 flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#FF8A3D] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFD36A]" />
            </span>
            Trusted by 10,000+ Bhutanese Gamers
          </span>
        </div>

        {/* Subheadline */}
        <p 
          className="animate-fade-in-up text-lg font-medium text-gray-500 tracking-wide mb-4"
          style={{ animationDelay: '0.1s' }}
        >
          Game Top-ups Made Easy
        </p>

        {/* Main Headline */}
        <h1 
          className="animate-fade-in-up text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight mb-6"
          style={{ animationDelay: '0.2s' }}
        >
          LEVEL UP
          <br />
          <span className="bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] bg-clip-text text-transparent">
            YOUR GAME
          </span>
        </h1>

        {/* Description */}
        <div 
          className="animate-fade-in-up mb-10 space-y-2"
          style={{ animationDelay: '0.3s' }}
        >
          <p className="text-lg text-gray-600">
            Instant game top-ups • Exclusive in-game rewards
          </p>
          <p className="text-lg text-gray-600">
            Seamless payments in Bhutan
          </p>
        </div>

        {/* CTA Button */}
        <div 
          className="animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <button
            onClick={onBrowseClick}
            className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF8A3D]/40 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Browse Games</span>
            <svg 
              className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div 
          className="animate-fade-in-up absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
            <div className="h-12 w-6 rounded-full border-2 border-gray-300 p-1">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
