import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  phone: string;
  documentType: string;
  documentId: string;
  profilePicture?: string;
  gender?: string;
  dateOfBirth?: string;
  isVerified: boolean;
  kycCompleted: boolean;
}

export interface OrderHistoryItem {
  id: string;
  productName: string;
  productImage: string;
  amount: number;
  transactionId: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showSplash: boolean;
  showAuthModal: boolean;
  authModalStep: 'login' | 'signup' | 'details' | 'otp' | 'pin' | 'kyc' | 'review';
  orderHistory: OrderHistoryItem[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setShowSplash: (show: boolean) => void;
  setShowAuthModal: (show: boolean) => void;
  setAuthModalStep: (step: 'login' | 'signup' | 'details' | 'otp' | 'pin' | 'kyc' | 'review') => void;
  updateUser: (data: Partial<User>) => void;
  addOrder: (order: OrderHistoryItem) => void;
  completeRegistration: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalStep, setAuthModalStep] = useState<'login' | 'signup' | 'details' | 'otp' | 'pin' | 'kyc' | 'review'>('login');
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (email && password) {
      setUser({
        id: '1',
        email,
        phone: '+975 17123456',
        documentType: 'National ID',
        documentId: '123456789',
        isVerified: true,
        kycCompleted: true,
      });
      setIsLoading(false);
      setShowAuthModal(false);
      return true;
    }
    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOrderHistory([]);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  }, []);

  const addOrder = useCallback((order: OrderHistoryItem) => {
    setOrderHistory(prev => [order, ...prev]);
  }, []);

  const completeRegistration = useCallback((userData: Partial<User>) => {
    setUser({
      id: Date.now().toString(),
      email: userData.email || '',
      phone: userData.phone || '',
      documentType: userData.documentType || '',
      documentId: userData.documentId || '',
      isVerified: true,
      kycCompleted: true,
      ...userData,
    });
    setShowAuthModal(false);
    setAuthModalStep('login');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        showSplash,
        showAuthModal,
        authModalStep,
        orderHistory,
        login,
        logout,
        setShowSplash,
        setShowAuthModal,
        setAuthModalStep,
        updateUser,
        addOrder,
        completeRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
