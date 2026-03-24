import React, { useState } from 'react';
import { X, FileText, Shield } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black">Legal</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-4 text-sm font-medium transition-all ${
              activeTab === 'terms'
                ? 'text-[#FF8A3D] border-b-2 border-[#FF8A3D]'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-4 text-sm font-medium transition-all ${
              activeTab === 'privacy'
                ? 'text-[#FF8A3D] border-b-2 border-[#FF8A3D]'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'terms' ? (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-500 text-sm mb-6">
                Last updated: January 1, 2024
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                1. Acceptance of Terms
              </h3>
              <p className="text-gray-600 mb-6">
                By accessing and using G-Store Bhutan's services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                2. Description of Service
              </h3>
              <p className="text-gray-600 mb-6">
                G-Store Bhutan provides a platform for purchasing digital game credits, gift cards, and mobile recharges. We act as an authorized reseller for various game publishers and service providers.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                3. User Accounts
              </h3>
              <p className="text-gray-600 mb-6">
                To make purchases, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                4. Payment Terms
              </h3>
              <p className="text-gray-600 mb-6">
                All payments are processed through RMA-approved payment gateways. Prices are displayed in Bhutanese Ngultrum (BTN). Payment must be completed before digital goods are delivered.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                5. Delivery Policy
              </h3>
              <p className="text-gray-600 mb-6">
                Digital goods are delivered instantly upon successful payment confirmation. In rare cases of delivery delays, please contact our support team with your transaction ID.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                6. Refund Policy
              </h3>
              <p className="text-gray-600 mb-6">
                Refunds are only available for failed deliveries. Once digital goods have been successfully delivered to your game account, they cannot be refunded. Refund requests must be submitted within 24 hours of purchase.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                7. Limitation of Liability
              </h3>
              <p className="text-gray-600 mb-6">
                G-Store Bhutan shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                8. Contact Information
              </h3>
              <p className="text-gray-600">
                For any questions regarding these terms, please contact us at gstorebhutan@gmail.com
              </p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-500 text-sm mb-6">
                Last updated: January 1, 2024
              </p>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl mb-6">
                <Shield className="h-6 w-6 text-[#FF8A3D]" />
                <p className="text-sm text-gray-600">
                  Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-black mb-3">
                1. Information We Collect
              </h3>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
                <li>Email address and phone number</li>
                <li>Identity documents for KYC verification</li>
                <li>Payment information (processed securely by banks)</li>
                <li>Game account IDs for delivery purposes</li>
              </ul>

              <h3 className="text-lg font-semibold text-black mb-3">
                2. How We Use Your Information
              </h3>
              <p className="text-gray-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
                <li>Process and deliver your purchases</li>
                <li>Send transaction confirmations and receipts</li>
                <li>Provide customer support</li>
                <li>Comply with legal requirements</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>

              <h3 className="text-lg font-semibold text-black mb-3">
                3. Information Security
              </h3>
              <p className="text-gray-600 mb-6">
                We implement appropriate security measures to protect your personal information. All payment transactions are encrypted using SSL technology and processed through RMA-approved secure gateways.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                4. Data Retention
              </h3>
              <p className="text-gray-600 mb-6">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account and associated data at any time.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                5. Third-Party Services
              </h3>
              <p className="text-gray-600 mb-6">
                We may share your information with trusted third parties who assist us in operating our service, including payment processors and game publishers. These parties are obligated to keep your information confidential.
              </p>

              <h3 className="text-lg font-semibold text-black mb-3">
                6. Your Rights
              </h3>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h3 className="text-lg font-semibold text-black mb-3">
                7. Contact Us
              </h3>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at gstorebhutan@gmail.com
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
