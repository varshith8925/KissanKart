import React from 'react';
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const OrderCard = ({ order, onAccept, onReject, onViewDetails, expandable = true }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-700',
          icon: Clock,
          label: 'Pending',
        };
      case 'accepted':
        return {
          color: 'bg-blue-100 text-blue-700',
          icon: Package,
          label: 'Accepted',
        };
      case 'shipped':
        return {
          color: 'bg-purple-100 text-purple-700',
          icon: Truck,
          label: 'Shipped',
        };
      case 'delivered':
        return {
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle,
          label: 'Delivered',
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-700',
          icon: XCircle,
          label: 'Rejected',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700',
          icon: Package,
          label: status,
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="card overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Order #{order.id}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(order.orderDate)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
              <StatusIcon className="w-4 h-4" />
              {statusConfig.label}
            </span>
            {order.bulkOrder && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                Bulk Order
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">{order.customerName}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Phone className="w-4 h-4" />
            <span>{order.customerPhone}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{order.customerAddress}</span>
          </div>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="p-4">
        <div className="space-y-3">
          {(isExpanded ? order.items : order.items.slice(0, 2)).map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-primary-100 rounded flex items-center justify-center text-xs font-medium text-primary-700">
                  {item.quantity}
                </span>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="font-medium text-gray-800">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          
          {order.items.length > 2 && expandable && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  +{order.items.length - 2} more items <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="font-medium text-gray-700">Total Amount</span>
          <span className="text-xl font-bold text-primary-600">₹{order.total.toFixed(2)}</span>
        </div>

        {/* Action Buttons */}
        {order.status === 'pending' && onAccept && onReject && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => onReject(order.id)}
              className="flex-1 py-2 text-red-600 bg-red-50 rounded-lg font-medium hover:bg-red-100 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={() => onAccept(order.id)}
              className="flex-1 py-2 text-white bg-primary-600 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Accept
            </button>
          </div>
        )}

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(order)}
            className="w-full mt-4 py-2 text-primary-600 bg-primary-50 rounded-lg font-medium hover:bg-primary-100 transition-colors"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;