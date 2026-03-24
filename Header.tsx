import React, { useState } from 'react';
import { X, ChevronLeft, HelpCircle, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Game {
  id: string;
  name: string;
  image: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

const denominations = [
  { id: '1', amount: 86, diamonds: 86, price: 99 },
  { id: '2', amount: 172, diamonds: 172, price: 189 },
  { id: '3', amount: 257, diamonds: 257, price: 279 },
  { id: '4', amount: 344, diamonds: 344, price: 369 },
  { id: '5', amount: 429, diamonds: 429, price: 459 },
  { id: '6', amount: 514, diamonds: 514, price: 549 },
  { id: '7', amount: 706, diamonds: 706, price: 749 },
  { id: '8', amount: 878, diamonds: 878, price: 929 },
];

const banks = [
  { id: 'bob', name: 'Bank of Bhutan', logo: 'https://i.imgur.com/0kNGmVY.png' },
  { id: 'bnb', name: 'Bhutan National Bank', logo: 'https://i.imgur.com/26DERbA.png' },
  { id: 'dk', name: 'DK Bank', logo: 'https://i.imgur.com/ifULCkD.png' },
  { id: 'tbank', name: 'T-Bank', logo: 'https://i.imgur.com/KYCkiVJ.png' },
  { id: 'dpnb', name: 'Druk PNB', logo: 'https://i.imgur.com/ZHk8bjG.png' },
  { id: 'bdb', name: 'Bhutan Development Bank', logo: 'https://i.imgur.com/abgWSde.png' },
];

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, game }) => {
  const { isAuthenticated, setShowAuthModal, setAuthModalStep, addOrder } = useAuth();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDenom, setSelectedDenom] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [bankAccount, setBankAccount] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const selectedDenomData = denominations.find(d => d.id === selectedDenom);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`checkout-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      setAuthModalStep('login');
      setShowAuthModal(true);
      return;
    }
    setStep(2);
  };

  const handleBuyNow = () => {
    setStep(3);
  };

  const handleVerifyOtp = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const txId = `GS${Date.now()}`;
    setTransactionId(txId);
    
    // Add to order history
    if (game && selectedDenomData) {
      addOrder({
        id: txId,
        productName: `${game.name} - ${selectedDenomData.diamonds} Diamonds`,
        productImage: game.image,
        amount: selectedDenomData.price,
        transactionId: txId,
        date: new Date().toISOString(),
        status: 'completed',
      });
    }
    
    setIsProcessing(false);
    setOrderComplete(true);
    setStep(4);
  };

  const handleClose = () => {
    setStep(1);
    setUserId('');
    setZoneId('');
    setEmail('');
    setSelectedDenom(null);
    setSelectedBank(null);
    setBankAccount('');
    setOtp(['', '', '', '', '', '']);
    setOrderComplete(false);
    setTransactionId('');
    onClose();
  };

  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          {step > 1 && !orderComplete && (
            <button
              onClick={() => setStep(step - 1)}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-black" />
            </button>
          )}
          <div className="flex items-center space-x-3 flex-1">
            <img src={game.image} alt={game.name} className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <h3 className="font-semibold text-black">{game.name}</h3>
              <p className="text-xs text-gray-500">Step {step} of 4</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Identity & Catalog */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-black mb-1">Enter Player ID</h2>
                <p className="text-sm text-gray-500">
                  Your in-game ID is required for delivery
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-black mb-2">
                      User ID
                      <button
                        className="ml-1 relative"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                        {showTooltip && (
                          <div className="absolute left-0 top-6 w-48 p-2 bg-black text-white text-xs rounded-lg z-10">
                            Find your User ID in the game profile settings
                          </div>
                        )}
                      </button>
                    </label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                      placeholder="123456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Zone ID
                    </label>
                    <input
                      type="text"
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                      placeholder="1234"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Email for Receipt
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-black mb-3">Select Amount</h3>
                <div className="grid grid-cols-2 gap-3">
                  {denominations.map((denom) => (
                    <button
                      key={denom.id}
                      onClick={() => setSelectedDenom(denom.id)}
                      className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                        selectedDenom === denom.id
                          ? 'border-[#FFD36A] bg-[#FFD36A]/5 ring-2 ring-[#FFD36A]/30'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-black">{denom.diamonds} Diamonds</div>
                      <div className="text-sm text-gray-500">Nu. {denom.price}</div>
                      {selectedDenom === denom.id && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-5 w-5 text-[#FF8A3D]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={!userId || !zoneId || !email || !selectedDenom}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isAuthenticated ? 'Continue to Payment' : 'Sign in to Continue'}
              </button>
            </div>
          )}

          {/* Step 2: Payment Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-black mb-1">Select Payment</h2>
                <p className="text-sm text-gray-500">
                  Choose your bank for mobile banking
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`relative flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
                      selectedBank === bank.id
                        ? 'border-[#FFD36A] bg-[#FFD36A]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={bank.logo}
                      alt={bank.name}
                      className="h-10 w-10 object-contain mb-2"
                    />
                    <span className="text-xs text-center text-gray-600 line-clamp-2">
                      {bank.name}
                    </span>
                    {selectedBank === bank.id && (
                      <div className="absolute top-1 right-1">
                        <CheckCircle className="h-4 w-4 text-[#FF8A3D]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {selectedBank && (
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                    placeholder="Enter account number"
                  />
                </div>
              )}

              {/* Order Summary */}
              {selectedDenomData && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Product</span>
                    <span className="text-black">{selectedDenomData.diamonds} Diamonds</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price</span>
                    <span className="text-black">Nu. {selectedDenomData.price}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                    <span className="text-black">Total</span>
                    <span className="text-[#FF8A3D]">Nu. {selectedDenomData.price}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Shield className="h-4 w-4 text-[#FF8A3D]" />
                <span>Payment secured via RMA Bhutan gateway</span>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={!selectedBank || !bankAccount}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>
          )}

          {/* Step 3: OTP Verification */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-black mb-1">Verify Payment</h2>
                <p className="text-sm text-gray-500">
                  Enter the 6-digit OTP sent to your mobile
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`checkout-otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="h-12 w-12 rounded-xl border border-gray-200 text-center text-lg font-semibold text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={otp.some(d => !d) || isProcessing}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Verify & Pay'
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                Didn't receive code?{' '}
                <button className="font-medium text-[#FF8A3D] hover:underline">
                  Resend
                </button>
              </p>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && orderComplete && (
            <div className="space-y-6 text-center py-6">
              {/* Confetti effect */}
              <div className="relative">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center animate-scale-in">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Order Successful!
                </h2>
                <p className="text-gray-500">
                  Your diamonds have been delivered to your account
                </p>
              </div>

              {selectedDenomData && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Product</span>
                    <span className="text-black font-medium">
                      {game.name} - {selectedDenomData.diamonds} Diamonds
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Amount</span>
                    <span className="text-black font-medium">Nu. {selectedDenomData.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="text-black font-medium">{transactionId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="text-black font-medium">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleClose}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
