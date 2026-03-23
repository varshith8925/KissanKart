import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ProductList from '../components/ProductList';
import OrderCard from '../components/OrderCard';
import { useCart } from '../context/CartContext';
import { mockProducts, mockOrders, categories } from '../data/mockData';
import {
  Search,
  Filter,
  ShoppingCart,
  Heart,
  Package,
  X,
  Plus,
  Minus,
  Star,
  MapPin,
  Leaf,
} from 'lucide-react';

// Marketplace Component
const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Fresh Farm Products</h2>
          <p className="text-gray-500">Directly from local farmers to your table</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/cart')}
            className="btn-primary flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            View Cart
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat.name
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <ProductList
        products={filteredProducts}
        onView={handleViewProduct}
        emptyMessage="No products found matching your criteria"
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

// Product Detail Modal Component
const ProductDetailModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-64 md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.organic && (
              <span className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                <Leaf className="w-4 h-4" />
                Organic
              </span>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Details */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
            
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{product.farmerName} • {product.farmLocation}</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div>
                <span className="text-3xl font-bold text-primary-600">₹{product.price}</span>
                <span className="text-gray-500">/{product.unit}</span>
              </div>
              <span className="text-sm text-gray-500">
                {product.stock} {product.unit} available
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-gray-500">{product.unit}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6">
              <span className="text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-primary-600">
                ₹{(product.price * quantity).toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 py-3 border-2 border-primary-600 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Customer Orders Component
const CustomerOrders = () => {
  const orders = mockOrders.filter((o) => o.customerId === 2);
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
        <p className="text-gray-500">Track and manage your orders</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'shipped', 'delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
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
      <div className="grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Wishlist Component
const Wishlist = () => {
  const [wishlistItems] = useState(mockProducts.slice(0, 4));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
        <p className="text-gray-500">Products you've saved for later</p>
      </div>

      {wishlistItems.length > 0 ? (
        <ProductList products={wishlistItems} />
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Your wishlist is empty</p>
        </div>
      )}
    </div>
  );
};

// Main Customer Dashboard Component
const CustomerDashboard = () => {
  return (
    <DashboardLayout title="Marketplace">
      <Routes>
        <Route path="dashboard" element={<Marketplace />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="*" element={<Marketplace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default CustomerDashboard;