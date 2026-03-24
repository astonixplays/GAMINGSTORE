import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Tshering Dorji',
    avatar: 'TD',
    rating: 5,
    text: 'Super fast delivery! Got my Mobile Legends diamonds within seconds. Best service in Bhutan!',
  },
  {
    id: 2,
    name: 'Karma Wangmo',
    avatar: 'KW',
    rating: 5,
    text: 'Finally a reliable gaming top-up service for Bhutan. The local payment options make it so convenient.',
  },
  {
    id: 3,
    name: 'Pema Tshering',
    avatar: 'PT',
    rating: 5,
    text: 'Been using G-Store for 6 months now. Never had any issues. Customer support is amazing!',
  },
  {
    id: 4,
    name: 'Sonam Choden',
    avatar: 'SC',
    rating: 4,
    text: 'Great prices and instant delivery. The promotions are really good too!',
  },
  {
    id: 5,
    name: 'Jigme Namgyal',
    avatar: 'JN',
    rating: 5,
    text: 'Trustworthy and secure. I recommend G-Store to all my gaming friends.',
  },
];

const stats = [
  { value: 10000, suffix: '+', label: 'Happy Gamers' },
  { value: 50000, suffix: '+', label: 'Transactions' },
  { value: 4.5, suffix: '/5', label: 'Average Rating' },
  { value: 24, suffix: '/7', label: 'Support' },
];

const ReviewsStats: React.FC = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = current;
          return newCounters;
        });
      }, duration / steps);
    });
  };

  const formatNumber = (num: number, index: number) => {
    if (stats[index].value === 4.5) {
      return num.toFixed(1);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <section ref={sectionRef} className="bg-white py-20 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Stats Section */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-black tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] bg-clip-text text-transparent">
                    {formatNumber(counters[index], index)}
                  </span>
                  <span className="text-black">{stat.suffix}</span>
                </div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
              What Our Gamers Say
            </h2>
            <p className="text-gray-500">
              Join thousands of satisfied customers across Bhutan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="relative bg-gray-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 h-8 w-8 text-[#FFD36A]/30" />

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? 'fill-[#FFD36A] text-[#FFD36A]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <span className="font-medium text-black">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* More reviews indicator */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#FF8A3D] transition-colors">
              <span>View all {testimonials.length} reviews</span>
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsStats;
