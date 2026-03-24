import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  image?: string;
}

const banners: Banner[] = [
  {
    id: '1',
    title: 'Double Diamonds Week',
    subtitle: 'Get 2x diamonds on all Mobile Legends top-ups',
    gradient: 'from-purple-600 to-pink-500',
  },
  {
    id: '2',
    title: 'PUBG Season Pass',
    subtitle: 'Exclusive UC bundles with bonus items',
    gradient: 'from-[#FFD36A] to-[#FF8A3D]',
  },
  {
    id: '3',
    title: 'New Year Special',
    subtitle: '15% off on all game top-ups this week',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    id: '4',
    title: 'Free Fire Max',
    subtitle: 'Instant delivery on all diamond purchases',
    gradient: 'from-orange-500 to-red-500',
  },
];

const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="bg-white py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Slides Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`min-w-full relative h-48 sm:h-64 md:h-80 bg-gradient-to-r ${banner.gradient} flex items-center justify-center`}
              >
                {/* Bhutanese pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                
                <div className="relative z-10 text-center px-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                    {banner.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base md:text-lg">
                    {banner.subtitle}
                  </p>
                  <button className="mt-6 rounded-full bg-white/20 backdrop-blur-sm px-6 py-2 text-sm font-medium text-white border border-white/30 transition-all duration-300 hover:bg-white hover:text-black">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm p-2 text-white transition-all duration-300 hover:bg-white hover:text-black"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm p-2 text-white transition-all duration-300 hover:bg-white hover:text-black"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;
