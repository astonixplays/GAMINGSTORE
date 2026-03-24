import React, { useState, useCallback, useRef } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import SplashScreen from './SplashScreen';
import Header from './Header';
import HeroSection from './HeroSection';
import PopularProducts from './PopularProducts';
import BannerCarousel from './BannerCarousel';
import WhyGStore from './WhyGStore';
import ReviewsStats from './ReviewsStats';
import PaymentPartners from './PaymentPartners';
import Newsletter from './Newsletter';
import Footer from './Footer';
import AuthModal from './AuthModal';
import CheckoutModal from './CheckoutModal';
import OrderHistory from './OrderHistory';
import SupportModal from './SupportModal';
import LegalModal from './LegalModal';
import ProfileModal from './ProfileModal';

interface Game {
  id: string;
  name: string;
  image: string;
  category: string;
}

const AppContent: React.FC = () => {
  const { showSplash, setShowSplash } = useAuth();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, [setShowSplash]);

  const handleBrowseClick = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setShowCheckout(true);
  };

  const handleViewAllClick = () => {
    // Scroll to catalog section
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        onSearchChange={handleSearchChange}
        onProfileClick={() => setShowProfile(true)}
        onOrdersClick={() => setShowOrders(true)}
        onSupportClick={() => setShowSupport(true)}
        onLegalClick={() => setShowLegal(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection onBrowseClick={handleBrowseClick} />

        {/* Popular Products */}
        <div ref={catalogRef}>
          <PopularProducts
            onGameClick={handleGameClick}
            onViewAllClick={handleViewAllClick}
          />
        </div>

        {/* Banner Carousel */}
        <BannerCarousel />

        {/* Why G-Store */}
        <WhyGStore />

        {/* Reviews & Stats */}
        <ReviewsStats />

        {/* Payment Partners */}
        <PaymentPartners />

        {/* Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal />
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        game={selectedGame}
      />
      <OrderHistory
        isOpen={showOrders}
        onClose={() => setShowOrders(false)}
      />
      <SupportModal
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
      />
      <LegalModal
        isOpen={showLegal}
        onClose={() => setShowLegal(false)}
      />
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default AppLayout;
