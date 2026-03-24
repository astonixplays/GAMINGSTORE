import React from 'react';
import { X, Package, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth, OrderHistoryItem } from '@/contexts/AuthContext';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose }) => {
  const { orderHistory, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const getStatusIcon = (status: OrderHistoryItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: OrderHistoryItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'failed':
        return 'bg-red-50 text-red-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">Order History</h2>
              <p className="text-sm text-gray-500">
                {orderHistory.length} {orderHistory.length === 1 ? 'order' : 'orders'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isAuthenticated ? (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Sign in to view orders
              </h3>
              <p className="text-gray-500 text-sm">
                Your order history will appear here after you sign in.
              </p>
            </div>
          ) : orderHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 text-sm">
                Your purchase history will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="h-16 w-16 rounded-xl object-cover"
                    />

                    {/* Order Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-black truncate">
                            {order.productName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(order.date)}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span className="font-mono">{order.transactionId}</span>
                        </div>
                        <div className="text-lg font-bold text-black">
                          Nu. {order.amount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
