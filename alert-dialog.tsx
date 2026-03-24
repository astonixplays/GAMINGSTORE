import React from 'react';
import { Zap, Clock, CreditCard, Headphones, Gift } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Easy & Fast',
    description: 'Simple 3-step process to top-up your favorite games in seconds.',
  },
  {
    icon: Clock,
    title: 'Instant Delivery',
    description: 'Receive your credits immediately after payment confirmation.',
  },
  {
    icon: CreditCard,
    title: 'RMA Bhutan Gateway',
    description: 'Secure payments through Royal Monetary Authority approved channels.',
  },
  {
    icon: Headphones,
    title: '24/7 Local Support',
    description: 'Dedicated Bhutanese support team ready to help anytime.',
  },
  {
    icon: Gift,
    title: 'Promotions & Giveaways',
    description: 'Exclusive deals and rewards for our loyal customers.',
  },
];

const WhyGStore: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
            Why Top Up on G-Store Bhutan?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We're Bhutan's most trusted gaming marketplace, delivering instant top-ups 
            with secure local payment options and dedicated customer support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 transition-all duration-400 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD36A]/20 to-[#FF8A3D]/20 transition-all duration-300 group-hover:from-[#FFD36A] group-hover:to-[#FF8A3D]">
                <feature.icon className="h-6 w-6 text-[#FF8A3D] transition-colors group-hover:text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] rounded-b-2xl transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGStore;
