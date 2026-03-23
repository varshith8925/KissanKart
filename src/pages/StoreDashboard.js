import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ProductList from '../components/ProductList';
import OrderCard from '../components/OrderCard';
import { useCart } from '../context/CartContext';
import { mockProducts, mockOrders, mockFarmers } from '../data/mockData';
import {
  Search,
  Users,
  Package,
  ShoppingBag,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  ShoppingCart,
  Filter,
  Building,
} from 'lucide-react';

// Dashboard Overview
const StoreOverview = () => {
  const stats = [
    { title: 'Total Suppliers', value: mockFarmers.length, icon: Users, color: 'bg-blue-500' },
    { title: 'Products Available', value: mockProducts.length, icon: Package, color: 'bg-green-500' },
    { title: 'Active Orders', value: 5, icon: ShoppingBag, color: 'bg-yellow-500' },
    { title: 'Total Savings', value: '₹25,000', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to KissanKart Business! 🏪</h2>
        <p className="text-purple-100">Source fresh products directly from farmers at wholesale prices.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6 hover:border-primary-500 border-2 border-transparent cursor-pointer transition-all">
          <Users className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="font-semibold text-gray-800 mb-2">Browse Farmers</h3>
          <p className="text-sm text-gray-500">Find and connect with local farmers</p>
        </div>
        <div className="card p-6 hover:border-primary-500 border-2 border-transparent cursor-pointer transition-all">
          <Package className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="font-semibold text-gray-800 mb-2">Bulk Products</h3>
          <p className="text-sm text-gray-500">Order products in bulk at better prices</p>
        </div>
        <div className="card p-6 hover:border-primary-500 border-2 border-transparent cursor-pointer transition-all">
          <ShoppingBag className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="font-semibold text-gray-800 mb-2">Track Orders</h3>
          <p className="text-sm text-gray-500">Monitor your order status and deliveries</p>
        </div>
      </div>

      {/* Featured Farmers */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Top Farmers</h3>
          <a href="/store/farmers" className="text-primary-600 text-sm font-medium hover:underline">
            View All
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {mockFarmers.slice(0, 3).map((farmer) => (
            <div key={farmer.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{farmer.name}</p>
                <p className="text-sm text-gray-500">{farmer.location}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{farmer.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Browse Farmers Component
const BrowseFarmers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const filteredFarmers = mockFarmers.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Browse Farmers</h2>
        <p className="text-gray-500">Connect with verified farmers for bulk purchases</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search farmers by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      {/* Farmers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <div key={farmer.id} className="card p-6">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">{farmer.name}</h3>
                  {farmer.verified && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500">{farmer.farmName}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{farmer.rating}</span>
                  <span className="text-sm text-gray-400">({farmer.totalOrders} orders)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{farmer.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="w-4 h-4" />
                <span>{farmer.totalProducts} products available</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {farmer.specialization.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedFarmer(farmer)}
                className="flex-1 btn-outline py-2 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact
              </button>
              <button className="flex-1 btn-primary py-2">View Products</button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedFarmer.avatar}
                alt={selectedFarmer.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{selectedFarmer.name}</h3>
                <p className="text-sm text-gray-500">{selectedFarmer.farmName}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedFarmer.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedFarmer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{selectedFarmer.location}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedFarmer(null)}
              className="w-full py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Store Products Component
const StoreProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy'];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Products Catalog</h2>
          <p className="text-gray-500">Browse and order products in bulk</p>
        </div>
        <button
          onClick={() => navigate('/cart')}
          className="btn-primary flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          View Cart
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <ProductList products={filteredProducts} />
    </div>
  );
};

// Bulk Purchase Component
const BulkPurchase = () => {
  const [bulkItems, setBulkItems] = useState([
    { id: 1, product: mockProducts[0], quantity: 100, unit: 'kg' },
    { id: 2, product: mockProducts[4], quantity: 50, unit: 'kg' },
  ]);

  const totalAmount = bulkItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Bulk Purchase</h2>
        <p className="text-gray-500">Order products in large quantities at wholesale prices</p>
      </div>

      {/* Bulk Order Form */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Bulk Order</h3>
        
        <div className="space-y-4">
          {bulkItems.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                <p className="text-sm text-gray-500">{item.product.farmerName}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...bulkItems];
                    newItems[index].quantity = parseInt(e.target.value) || 0;
                    setBulkItems(newItems);
                  }}
                  className="w-24 input-field text-center"
                  min="1"
                />
                <span className="text-gray-500">{item.unit}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">₹{item.product.price}/{item.unit}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-gray-700">Total Amount:</span>
            <span className="text-2xl font-bold text-primary-600">
              ₹{totalAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <button className="flex-1 btn-primary py-3">
              Place Bulk Order
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Order Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Wholesale Prices</h3>
          <p className="text-sm text-gray-500">Get up to 20% off on bulk orders</p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Direct from Farms</h3>
          <p className="text-sm text-gray-500">Fresh produce sourced directly</p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Business Support</h3>
          <p className="text-sm text-gray-500">Dedicated account manager</p>
        </div>
      </div>
    </div>
  );
};

// Store Orders Component
const StoreOrders = () => {
  const orders = mockOrders.filter((o) => o.customerId === 3);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
        <p className="text-gray-500">Track and manage your store orders</p>
      </div>

      <div className="grid gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Store Dashboard Component
const StoreDashboard = () => {
  return (
    <DashboardLayout title="Store Dashboard">
      <Routes>
        <Route path="dashboard" element={<StoreOverview />} />
        <Route path="farmers" element={<BrowseFarmers />} />
        <Route path="products" element={<StoreProducts />} />
        <Route path="orders" element={<StoreOrders />} />
        <Route path="bulk-purchase" element={<BulkPurchase />} />
        <Route path="*" element={<StoreOverview />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StoreDashboard;