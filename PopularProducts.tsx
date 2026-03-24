import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setMessage('Thank you for subscribing! Check your inbox for exclusive deals.');
    setEmail('');
    
    // Reset after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <section className="bg-black py-20 px-4">
      <div className="mx-auto max-w-3xl text-center">
        {/* Icon */}
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D]">
          <Mail className="h-8 w-8 text-white" />
        </div>

        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Subscribe to get exclusive deals, promotions, and the latest gaming news delivered to your inbox.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setMessage('');
                  }
                }}
                placeholder="Enter your email"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full rounded-full bg-white/10 border px-5 py-3 text-white placeholder-gray-400 outline-none transition-all duration-300 ${
                  status === 'error'
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30'
                } disabled:opacity-50`}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] px-8 py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF8A3D]/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Subscribing...
                </span>
              ) : status === 'success' ? (
                <span className="flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Subscribed!
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`mt-4 flex items-center justify-center space-x-2 text-sm ${
                status === 'error' ? 'text-red-400' : 'text-green-400'
              } animate-fade-in`}
            >
              {status === 'error' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <span>{message}</span>
            </div>
          )}
        </form>

        {/* Privacy note */}
        <p className="mt-6 text-xs text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
