import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { useAuth } from '../context/AuthContext';
import { mockOrders } from '../data/mockData';
import { Package, Search, Filter } from 'lucide-react';

const Orders = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter orders based on user role
  const getUserOrders = () => {
    switch (user?.role) {
      case 'farmer':
        return mockOrders.filter((o) => o.farmerId === 1);
      case 'customer':
        return mockOrders.filter((o) => o.customerId === 2);
      case 'store':
        return mockOrders.filter((o) => o.customerId === 3);
      default:
        return [];
    }
  };

  const orders = getUserOrders();

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusTabs = ['all', 'pending', 'accepted', 'shipped', 'delivered'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-500">Track and manage all your orders</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusTabs.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
              <p className="text-gray-500">
                {filter !== 'all'
                  ? `You don't have any ${filter} orders`
                  : "You haven't placed any orders yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;