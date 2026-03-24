import React from 'react';
import { Shield, Lock, CheckCircle } from 'lucide-react';

const banks = [
  { name: 'Bank of Bhutan', logo: 'https://i.imgur.com/0kNGmVY.png' },
  { name: 'Bhutan National Bank', logo: 'https://i.imgur.com/26DERbA.png' },
  { name: 'DK Bank', logo: 'https://i.imgur.com/ifULCkD.png' },
  { name: 'T-Bank', logo: 'https://i.imgur.com/KYCkiVJ.png' },
  { name: 'Druk PNB', logo: 'https://i.imgur.com/ZHk8bjG.png' },
  { name: 'Bhutan Development Bank', logo: 'https://i.imgur.com/abgWSde.png' },
];

const PaymentPartners: React.FC = () => {
  // Double the banks array for seamless infinite scroll
  const scrollBanks = [...banks, ...banks];

  return (
    <section className="bg-gray-50 py-20 px-4 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[#FF8A3D] tracking-widest uppercase mb-2">
            Trusted Partners
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
            Payment Methods
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Secure payments through all major Bhutanese banks and mobile banking services
          </p>
        </div>

        {/* Scrolling Bank Logos */}
        <div className="relative mb-12">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          
          <div className="flex animate-scroll-left">
            {scrollBanks.map((bank, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <div className="h-16 w-32 flex items-center justify-center bg-white rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-xs text-gray-500 font-medium text-center">${bank.name}</span>`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { icon: Shield, text: 'SSL Security' },
            { icon: Lock, text: 'Bank-grade Security' },
            { icon: CheckCircle, text: 'RMA Approved' },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm"
            >
              <badge.icon className="h-4 w-4 text-[#FF8A3D]" />
              <span className="text-sm font-medium text-gray-700">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* RMA Badge */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">
            Regulated by
          </p>
          <div className="inline-flex items-center justify-center bg-white rounded-xl px-6 py-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-black text-sm">Royal Monetary Authority</p>
                <p className="text-xs text-gray-500">of Bhutan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPartners;
