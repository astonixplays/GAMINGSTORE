import React, { useState, useRef, useEffect } from 'react';
import { X, Eye, EyeOff, Upload, ChevronLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    setShowAuthModal,
    authModalStep,
    setAuthModalStep,
    login,
    completeRegistration,
    isLoading,
  } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('+975 ');
  const [documentType, setDocumentType] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [frontDoc, setFrontDoc] = useState<File | null>(null);
  const [backDoc, setBackDoc] = useState<File | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!showAuthModal) {
      // Reset form on close
      setEmail('');
      setPassword('');
      setPhone('+975 ');
      setDocumentType('');
      setDocumentId('');
      setOtp(['', '', '', '', '', '']);
      setPin(['', '', '', '', '', '']);
      setFrontDoc(null);
      setBackDoc(null);
      setAgreedToTerms(false);
      setError('');
    }
  }, [showAuthModal]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent,
    type: 'otp' | 'pin'
  ) => {
    if (e.key === 'Backspace') {
      const refs = type === 'otp' ? otpRefs : pinRefs;
      const values = type === 'otp' ? otp : pin;
      
      if (!values[index] && index > 0) {
        refs.current[index - 1]?.focus();
      }
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'front' | 'back'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'front') setFrontDoc(file);
      else setBackDoc(file);
    }
  };

  const handleSubmitRegistration = () => {
    completeRegistration({
      email,
      phone,
      documentType,
      documentId,
    });
  };

  const goBack = () => {
    const steps: Array<'login' | 'signup' | 'details' | 'otp' | 'pin' | 'kyc' | 'review'> = [
      'login',
      'signup',
      'details',
      'otp',
      'pin',
      'kyc',
      'review',
    ];
    const currentIndex = steps.indexOf(authModalStep);
    if (currentIndex > 0) {
      setAuthModalStep(steps[currentIndex - 1]);
    }
  };

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowAuthModal(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          {authModalStep !== 'login' && authModalStep !== 'signup' && (
            <button
              onClick={goBack}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-black" />
            </button>
          )}
          <div className="flex-1 text-center">
            <img
              src="https://i.imgur.com/RVjWBcZ.png"
              alt="G-Store"
              className="h-8 w-auto mx-auto"
            />
          </div>
          <button
            onClick={() => setShowAuthModal(false)}
            className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Login Step */}
          {authModalStep === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  Welcome back
                </h2>
                <p className="text-gray-500 mt-1">Sign in to your account</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalStep('signup')}
                  className="font-medium text-[#FF8A3D] hover:underline"
                >
                  Create one
                </button>
              </p>
            </form>
          )}

          {/* Signup Step */}
          {authModalStep === 'signup' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  Create account
                </h2>
                <p className="text-gray-500 mt-1">Join G-Store today</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setAuthModalStep('details')}
                disabled={!email || !password}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                Continue
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  onClick={() => setAuthModalStep('login')}
                  className="font-medium text-[#FF8A3D] hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* Details Step */}
          {authModalStep === 'details' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  Let's Begin
                </h2>
                <p className="text-gray-500 mt-1">Tell us about yourself</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                    placeholder="+975 17XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Document Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30 bg-white"
                  >
                    <option value="">Select document type</option>
                    <option value="national_id">National ID</option>
                    <option value="passport">Passport</option>
                    <option value="driving_license">Driving License</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Document ID
                  </label>
                  <input
                    type="text"
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                    placeholder="Enter document ID"
                  />
                </div>
              </div>

              <button
                onClick={() => setAuthModalStep('otp')}
                disabled={!phone || !documentType || !documentId}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {/* OTP Step */}
          {authModalStep === 'otp' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  Verify Mobile
                </h2>
                <p className="text-gray-500 mt-1">
                  Enter the 6-digit code sent to {phone}
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e, 'otp')}
                    className="h-12 w-12 rounded-xl border border-gray-200 text-center text-lg font-semibold text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                  />
                ))}
              </div>

              <button
                onClick={() => setAuthModalStep('pin')}
                disabled={otp.some((d) => !d)}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                Verify
              </button>

              <p className="text-center text-sm text-gray-500">
                Didn't receive code?{' '}
                <button className="font-medium text-[#FF8A3D] hover:underline">
                  Resend
                </button>
              </p>
            </div>
          )}

          {/* PIN Step */}
          {authModalStep === 'pin' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  Create PIN
                </h2>
                <p className="text-gray-500 mt-1">
                  Set a 6-digit PIN for quick access
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (pinRefs.current[index] = el)}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e, 'pin')}
                    className="h-12 w-12 rounded-xl border border-gray-200 text-center text-lg font-semibold text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                  />
                ))}
              </div>

              <button
                onClick={() => setAuthModalStep('kyc')}
                disabled={pin.some((d) => !d)}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {/* KYC Step */}
          {authModalStep === 'kyc' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  Document Upload
                </h2>
                <p className="text-gray-500 mt-1">
                  Upload photos of your {documentType?.replace('_', ' ')}
                </p>
              </div>

              <div className="space-y-4">
                {/* Front */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Front of Document
                  </label>
                  <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#FFD36A] transition-colors">
                    {frontDoc ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">{frontDoc.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">
                          Click to upload
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'front')}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Back */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Back of Document
                  </label>
                  <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#FFD36A] transition-colors">
                    {backDoc ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">{backDoc.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">
                          Click to upload
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'back')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                onClick={() => setAuthModalStep('review')}
                disabled={!frontDoc || !backDoc}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {/* Review Step */}
          {authModalStep === 'review' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  Review & Submit
                </h2>
                <p className="text-gray-500 mt-1">
                  Confirm your information
                </p>
              </div>

              <div className="space-y-4 bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-black">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium text-black">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Document</span>
                  <span className="font-medium text-black capitalize">
                    {documentType?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Document ID</span>
                  <span className="font-medium text-black">{documentId}</span>
                </div>
              </div>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FF8A3D] focus:ring-[#FFD36A]"
                />
                <span className="text-sm text-gray-500">
                  I agree to the{' '}
                  <a href="#terms" className="text-[#FF8A3D] hover:underline">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-[#FF8A3D] hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button
                onClick={handleSubmitRegistration}
                disabled={!agreedToTerms}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                Submit Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
