import React from 'react';
import { X, User, Home, Grid, Clock, HelpCircle, FileText, LogOut, ChevronRight, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onAuthClick: (mode: 'login' | 'signup') => void;
  onProfileClick?: () => void;
  onOrdersClick?: () => void;
  onSupportClick?: () => void;
  onLegalClick?: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  onAuthClick,
  onProfileClick,
  onOrdersClick,
  onSupportClick,
  onLegalClick,
}) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleNavClick = (action?: () => void) => {
    if (action) {
      action();
    }
    onClose();
  };

  const menuItems = [
    { icon: Home, label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { icon: Grid, label: 'Catalog', onClick: () => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: Clock, label: 'Order History', onClick: onOrdersClick },
    { icon: HelpCircle, label: 'Support', onClick: onSupportClick },
    { icon: FileText, label: 'Legal', onClick: onLegalClick },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-400 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <img
              src="https://i.imgur.com/RVjWBcZ.png"
              alt="G-Store"
              className="h-8 w-auto"
            />
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-black" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {!isAuthenticated ? (
              /* Pre-Registration State */
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D]">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black tracking-tight">
                    Sign up to G-Store today!
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    'Easy access to order history',
                    'Faster and more secure',
                    'Exclusive deals & promotions',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD36A]/20">
                        <svg className="h-3 w-3 text-[#FF8A3D]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={() => onAuthClick('signup')}
                    className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 text-sm font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF8A3D]/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Sign up (free)
                  </button>
                  <button
                    onClick={() => onAuthClick('login')}
                    className="w-full rounded-full border-2 border-black py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            ) : (
              /* Post-Registration State */
              <div className="space-y-6">
                {/* Profile Section */}
                <button
                  onClick={() => handleNavClick(onProfileClick)}
                  className="w-full flex items-center space-x-4 pb-4 border-b border-gray-100 hover:opacity-80 transition-opacity"
                >
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center overflow-hidden">
                      {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-7 w-7 text-white" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-black flex items-center justify-center">
                      <Settings className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-black">{user?.email}</p>
                    <p className="text-sm text-gray-500">{user?.phone}</p>
                  </div>
                </button>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  {menuItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleNavClick(item.onClick)}
                      className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-black transition-all duration-200 hover:bg-gray-50 group"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 text-gray-400 group-hover:text-[#FF8A3D] transition-colors" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#FF8A3D] transition-colors" />
                    </button>
                  ))}
                </nav>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-red-500 transition-all duration-200 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign out</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-6 py-4">
            <p className="text-center text-xs text-gray-400">
              © 2024 G-Store. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
