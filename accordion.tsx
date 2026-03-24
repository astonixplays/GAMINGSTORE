import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Send, Mail, Phone, ExternalLink } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  'How do I top up?',
  'Payment failed',
  'Refund request',
  'Contact support',
];

const botResponses: Record<string, string> = {
  'how do i top up?': 'To top up your game:\n1. Select your game from the catalog\n2. Enter your Player ID and Zone ID\n3. Choose the amount you want to purchase\n4. Select your payment method and complete the transaction\n\nYour credits will be delivered instantly!',
  'payment failed': 'If your payment failed, please check:\n1. Your bank account has sufficient balance\n2. You entered the correct OTP\n3. Your mobile banking is active\n\nIf the issue persists, please contact us at gstorebhutan@gmail.com',
  'refund request': 'For refund requests:\n1. Refunds are processed within 3-5 business days\n2. Please email gstorebhutan@gmail.com with your transaction ID\n3. Include your bank account details for the refund\n\nNote: Refunds are only available for failed deliveries.',
  'contact support': 'You can reach us through:\n📧 Email: gstorebhutan@gmail.com\n📱 Phone: +975 17XXXXXX\n\nOur support team is available 24/7 to help you!',
  default: 'Thank you for your message! Our support team will get back to you shortly. For urgent matters, please email us at gstorebhutan@gmail.com',
};

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'contact'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! 👋 Welcome to G-Store Support. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase().trim();
      const response = botResponses[lowerText] || botResponses.default;

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">G-Store Support</h2>
                <p className="text-sm text-white/80">We're here to help</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-[#FF8A3D]'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'contact'
                  ? 'bg-white text-[#FF8A3D]'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'chat' ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] text-white'
                        : 'bg-gray-100 text-black'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-white/70'
                          : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Email */}
            <a
              href="mailto:gstorebhutan@gmail.com"
              className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black">Email Us</h4>
                <p className="text-sm text-gray-500">gstorebhutan@gmail.com</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-[#FF8A3D] transition-colors" />
            </a>

            {/* Phone */}
            <a
              href="tel:+97517000000"
              className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black">Call Us</h4>
                <p className="text-sm text-gray-500">+975 17XXXXXX</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-[#FF8A3D] transition-colors" />
            </a>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-black mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { name: 'Facebook', color: '#1877F2' },
                  { name: 'Instagram', color: '#E4405F' },
                  { name: 'TikTok', color: '#000000' },
                ].map((social) => (
                  <button
                    key={social.name}
                    className="flex-1 py-3 rounded-xl bg-gray-50 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {social.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h4 className="font-semibold text-black mb-4">Quick Help</h4>
              <div className="space-y-2">
                {[
                  'How to find my Player ID?',
                  'Payment methods available',
                  'Delivery time',
                  'Refund policy',
                ].map((faq) => (
                  <button
                    key={faq}
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage(faq);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {faq}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportModal;
