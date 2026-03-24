import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import HamburgerMenu from './HamburgerMenu';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onProfileClick?: () => void;
  onOrdersClick?: () => void;
  onSupportClick?: () => void;
  onLegalClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  onProfileClick,
  onOrdersClick,
  onSupportClick,
  onLegalClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, setShowAuthModal, setAuthModalStep } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange?.(e.target.value);
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthModalStep(mode);
    setShowAuthModal(true);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="https://i.imgur.com/RVjWBcZ.png"
                alt="G-Store"
                className="h-8 w-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            {/* Right side - Search & Menu */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div
                className={`relative hidden sm:block transition-all duration-300 ${
                  searchFocused ? 'w-64' : 'w-48'
                }`}
              >
                <div
                  className={`flex items-center rounded-full border bg-white/80 px-4 py-2 transition-all duration-300 ${
                    searchFocused
                      ? 'border-transparent ring-2 ring-[#FFD36A] shadow-lg shadow-[#FFD36A]/20'
                      : 'border-gray-200'
                  }`}
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="ml-2 w-full bg-transparent text-sm text-black placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              {/* Mobile Search Icon */}
              <button
                className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setSearchFocused(!searchFocused)}
              >
                <Search className="h-5 w-5 text-black" />
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                aria-label="Menu"
              >
                {menuOpen ? (
                  <X className="h-6 w-6 text-black transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu className="h-6 w-6 text-black transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchFocused && (
            <div className="sm:hidden pb-4 animate-fade-in">
              <div className="flex items-center rounded-full border border-[#FFD36A] bg-white px-4 py-2 ring-2 ring-[#FFD36A]/30">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                  className="ml-2 w-full bg-transparent text-sm text-black placeholder-gray-400 outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hamburger Menu Overlay */}
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        onAuthClick={handleAuthClick}
        onProfileClick={onProfileClick}
        onOrdersClick={onOrdersClick}
        onSupportClick={onSupportClick}
        onLegalClick={onLegalClick}
      />
    </>
  );
};

export default Header;
