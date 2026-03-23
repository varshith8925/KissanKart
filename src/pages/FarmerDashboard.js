import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ProductList from '../components/ProductList';
import OrderCard from '../components/OrderCard';
import { useAuth } from '../context/AuthContext';
import {
  mockProducts,
  mockOrders,
  weatherData,
  soilData,
  cropRecommendations,
  farmingSupplies,
} from '../data/mockData';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Plus,
  Cloud,
  Droplets,
  Wind,
  Sun,
  Thermometer,
  Sprout,
  AlertCircle,
  CheckCircle,
  X,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Leaf,
  Calendar,
  MapPin,
  Star,
  Upload,
  Image,
} from 'lucide-react';

// ==================== DASHBOARD OVERVIEW ====================
const DashboardOverview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const farmerProducts = mockProducts.filter((p) => p.farmerId === 1);
  const farmerOrders = mockOrders.filter((o) => o.farmerId === 1);

  const stats = [
    {
      title: 'Total Products',
      value: farmerProducts.length,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Total Orders',
      value: farmerOrders.length,
      icon: ShoppingBag,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive',
    },
    {
      title: 'Revenue',
      value: '₹45,230',
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+15%',
      changeType: 'positive',
    },
    {
      title: 'Growth',
      value: '23%',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+5%',
      changeType: 'positive',
    },
  ];

  const recentOrders = farmerOrders.slice(0, 3);
  const pendingOrders = farmerOrders.filter((o) => o.status === 'pending').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Welcome back, {user?.name}! 🌾
          </h2>
          <p className="text-primary-100 mb-4">
            Here's what's happening with your farm today.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-primary-100">Pending Orders</p>
              <p className="text-2xl font-bold">{pendingOrders}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-primary-100">Today's Weather</p>
              <p className="text-2xl font-bold">{weatherData.current.temperature}°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' 
                  ? 'text-green-600 bg-green-100' 
                  : 'text-red-600 bg-red-100'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Weather */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <button
              onClick={() => navigate('/farmer/orders')}
              className="text-primary-600 text-sm font-medium hover:underline"
            >
              View All
            </button>
          </div>
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">₹{order.total}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : order.status === 'accepted'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'shipped'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No recent orders</p>
            </div>
          )}
        </div>

        {/* Weather Widget */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Weather</h3>
          <div className="text-center mb-6">
            <span className="text-6xl">{weatherData.current.icon}</span>
            <p className="text-4xl font-bold text-gray-800 mt-2">
              {weatherData.current.temperature}°C
            </p>
            <p className="text-gray-500">{weatherData.current.condition}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Humidity: {weatherData.current.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Wind className="w-4 h-4 text-gray-500" />
              <span>Wind: {weatherData.current.windSpeed} km/h</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">5-Day Forecast</p>
            <div className="flex justify-between">
              {weatherData.forecast.slice(0, 5).map((day, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-gray-500">{day.day}</p>
                  <span className="text-xl">{day.icon}</span>
                  <p className="text-xs font-medium">{day.high}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">🤖 AI Crop Recommendations</h3>
          <button
            onClick={() => navigate('/farmer/insights')}
            className="text-primary-600 text-sm font-medium hover:underline"
          >
            View Details
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cropRecommendations.map((crop) => (
            <div
              key={crop.id}
              className="p-4 bg-gradient-to-br from-primary-50 to-green-50 rounded-xl border border-primary-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{crop.crop}</h4>
                <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                  {crop.suitability}% match
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{crop.season} Season</p>
              <p className="text-xs text-gray-500 line-clamp-2">{crop.tips}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={() => navigate('/farmer/add-product')}
          className="card p-6 text-left hover:border-primary-500 border-2 border-transparent transition-all group"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
            <Plus className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Add New Product</h3>
          <p className="text-sm text-gray-500">List your farm products for sale</p>
        </button>

        <button
          onClick={() => navigate('/farmer/supplies')}
          className="card p-6 text-left hover:border-primary-500 border-2 border-transparent transition-all group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
            <Sprout className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Buy Supplies</h3>
          <p className="text-sm text-gray-500">Seeds, fertilizers, and tools</p>
        </button>

        <button
          onClick={() => navigate('/farmer/insights')}
          className="card p-6 text-left hover:border-primary-500 border-2 border-transparent transition-all group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
            <TrendingUp className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">View Insights</h3>
          <p className="text-sm text-gray-500">AI-powered farming recommendations</p>
        </button>
      </div>
    </div>
  );
};

// ==================== MY PRODUCTS ====================
const MyProducts = () => {
  const [products, setProducts] = useState(mockProducts.filter((p) => p.farmerId === 1));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const navigate = useNavigate();

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Others'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product) => {
    navigate('/farmer/add-product', { state: { product, isEdit: true } });
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
          <p className="text-gray-500">Manage your product listings ({products.length} products)</p>
        </div>
        <button
          onClick={() => navigate('/farmer/add-product')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
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
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field w-auto"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1518977676601-b53f82ber1dd?w=400';
                  }}
                />
                {product.organic && (
                  <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    <Leaf className="w-3 h-3" />
                    Organic
                  </span>
                )}
                {product.stock < 20 && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    Low Stock
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-700">{product.rating}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3">Stock: {product.stock} {product.unit}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-primary-600">₹{product.price}</span>
                    <span className="text-gray-500 text-sm">/{product.unit}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(product)}
                    className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="py-2 px-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search or filters'
              : "You haven't added any products yet"}
          </p>
          <button
            onClick={() => navigate('/farmer/add-product')}
            className="btn-primary"
          >
            Add Your First Product
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Delete Product</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-4">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{selectedProduct?.name}</p>
                <p className="text-sm text-gray-500">₹{selectedProduct?.price}/{selectedProduct?.unit}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {selectedProduct && !showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="relative h-64">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              {selectedProduct.organic && (
                <span className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                  <Leaf className="w-4 h-4" />
                  Organic
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                  {selectedProduct.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{selectedProduct.rating}</span>
                  <span className="text-sm text-gray-400">({selectedProduct.reviews} reviews)</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-xl font-bold text-primary-600">
                    ₹{selectedProduct.price}/{selectedProduct.unit}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Available Stock</p>
                  <p className="text-xl font-bold text-gray-800">
                    {selectedProduct.stock} {selectedProduct.unit}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    handleEdit(selectedProduct);
                  }}
                  className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Edit Product
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== ADD/EDIT PRODUCT ====================
const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editProduct = location.state?.product;
  const isEdit = location.state?.isEdit || false;

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(editProduct?.image || '');
  const [formData, setFormData] = useState({
    name: editProduct?.name || '',
    description: editProduct?.description || '',
    price: editProduct?.price || '',
    unit: editProduct?.unit || 'kg',
    category: editProduct?.category || '',
    stock: editProduct?.stock || '',
    organic: editProduct?.organic || false,
    harvestDate: editProduct?.harvestDate || '',
  });
  const [errors, setErrors] = useState({});

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Others'];
  const units = ['kg', 'g', 'litre', 'ml', 'piece', 'dozen', 'bunch', 'packet', '500g'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.stock || formData.stock <= 0) newErrors.stock = 'Valid stock quantity is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setLoading(false);
    navigate('/farmer/products');
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h2>
        <p className="text-gray-500">
          {isEdit ? 'Update your product details' : 'Fill in the details to list your product'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
          <div className="flex items-start gap-6">
            {/* Preview */}
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Upload Area */}
            <div className="flex-1">
              <label className="block border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-xs">PNG, JPG up to 5MB</p>
              </label>
            </div>
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="e.g., Organic Tomatoes"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`input-field min-h-[120px] ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Describe your product - quality, freshness, growing methods..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Price & Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`input-field ${errors.price ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit <span className="text-red-500">*</span>
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="input-field"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  per {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input-field ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={`input-field ${errors.stock ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Available quantity"
              min="0"
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>
        </div>

        {/* Harvest Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
          <input
            type="date"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* Organic Checkbox */}
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
          <input
            type="checkbox"
            name="organic"
            id="organic"
            checked={formData.organic}
            onChange={handleChange}
            className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
          />
          <label htmlFor="organic" className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-gray-700 font-medium">This is an organic product</span>
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/farmer/products')}
            className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isEdit ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {isEdit ? 'Update Product' : 'Add Product'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// ==================== ORDERS ====================
const FarmerOrders = () => {
  const [orders, setOrders] = useState(mockOrders.filter((o) => o.farmerId === 1));
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAccept = (orderId) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: 'accepted' } : o))
    );
  };

  const handleReject = (orderId) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: 'rejected' } : o))
    );
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    accepted: orders.filter((o) => o.status === 'accepted').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    rejected: orders.filter((o) => o.status === 'rejected').length,
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
        <p className="text-gray-500">Manage and track your orders</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order ID or customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {filter !== 'all'
                ? `You don't have any ${filter} orders`
                : 'You haven\'t received any orders yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== AI INSIGHTS ====================
const AIInsights = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">🤖 AI Farming Insights</h2>
        <p className="text-gray-500">Smart recommendations powered by AI to maximize your yield</p>
      </div>

      {/* Soil Analysis Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Soil Analysis</h3>
          <span className="text-sm text-gray-500">Last tested: {soilData.lastTested}</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <p className="text-sm text-blue-600 mb-1">Soil pH</p>
            <p className="text-3xl font-bold text-blue-700">{soilData.ph}</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Optimal Range
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <p className="text-sm text-green-600 mb-1">Nitrogen Level</p>
            <p className="text-3xl font-bold text-green-700">{soilData.nitrogen}</p>
            <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Needs Attention
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <p className="text-sm text-purple-600 mb-1">Phosphorus</p>
            <p className="text-3xl font-bold text-purple-700">{soilData.phosphorus}</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Good Level
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl">
            <p className="text-sm text-cyan-600 mb-1">Moisture</p>
            <p className="text-3xl font-bold text-cyan-700">{soilData.moisture}%</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Adequate
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600">
            <strong>Soil Type:</strong> {soilData.type} | 
            <strong> Potassium:</strong> {soilData.potassium}
          </p>
        </div>
      </div>

      {/* Crop Recommendations */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Recommended Crops for Your Soil</h3>
        <div className="space-y-4">
          {cropRecommendations.map((crop) => (
            <div
              key={crop.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-800">{crop.crop}</h4>
                  <span className="text-sm text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded-full">
                    {crop.suitability}% Suitable
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {crop.season} Season
                  </span>
                  <span className="mx-2">•</span>
                  Expected Yield: {crop.expectedYield}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${crop.suitability}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{crop.tips}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips & Alerts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Alerts & Warnings
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
              <p className="font-medium text-yellow-800 mb-1">Weather Alert</p>
              <p className="text-sm text-yellow-700">
                Rain expected in next 2 days. Plan irrigation accordingly and protect sensitive crops.
              </p>
            </div>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="font-medium text-red-800 mb-1">Pest Alert</p>
              <p className="text-sm text-red-700">
                Aphid activity detected in nearby farms. Consider preventive measures for your vegetables.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="font-medium text-blue-800 mb-1">Market Update</p>
              <p className="text-sm text-blue-700">
                Tomato prices are expected to rise by 15% next week. Good time to harvest.
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Best Practices
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Water Early Morning</p>
                <p className="text-sm text-green-700">Reduces evaporation and fungal diseases</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Rotate Crops</p>
                <p className="text-sm text-green-700">Maintains soil health and reduces pest buildup</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Use Organic Fertilizers</p>
                <p className="text-sm text-green-700">Better for soil microbiome and long-term yield</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Monitor Soil Regularly</p>
                <p className="text-sm text-green-700">Test soil every 3-6 months for optimal results</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ==================== BUY SUPPLIES ====================
const BuySupplies = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Tools'];

  const filteredSupplies = farmingSupplies.filter((supply) => {
    const matchesCategory = selectedCategory === 'All' || supply.category === selectedCategory;
    const matchesSearch = supply.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (supply) => {
    const existing = cart.find((item) => item.id === supply.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === supply.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...supply, quantity: 1 }]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Buy Farming Supplies</h2>
          <p className="text-gray-500">Seeds, fertilizers, tools and more for your farm</p>
        </div>
        {cartCount > 0 && (
          <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
            <ShoppingBag className="w-6 h-6 text-primary-600" />
            <div>
              <p className="font-medium text-primary-700">{cartCount} items in cart</p>
              <p className="text-sm text-primary-600">Total: ₹{cartTotal}</p>
            </div>
            <button className="btn-primary py-2 px-4">Checkout</button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search supplies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Supplies Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSupplies.map((supply) => (
          <div key={supply.id} className="card overflow-hidden group">
            <div className="h-48 overflow-hidden bg-gray-100">
              <img
                src={supply.image}
                alt={supply.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400';
                }}
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                {supply.category}
              </span>
              <h3 className="font-semibold text-gray-800 mt-2 line-clamp-1">{supply.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{supply.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-xl font-bold text-primary-600">₹{supply.price}</span>
                  <span className="text-gray-500 text-sm">/{supply.unit}</span>
                </div>
                <button
                  onClick={() => addToCart(supply)}
                  className="btn-primary py-2 px-4 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Stock: {supply.stock} available</p>
            </div>
          </div>
        ))}
      </div>

      {filteredSupplies.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No supplies found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

// ==================== WEATHER ====================
const Weather = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Weather Forecast</h2>
        <p className="text-gray-500">Plan your farming activities based on weather conditions</p>
      </div>

      {/* Current Weather - Hero Card */}
      <div className="card p-8 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <span className="text-8xl lg:text-9xl">{weatherData.current.icon}</span>
            <div>
              <p className="text-6xl lg:text-7xl font-bold">{weatherData.current.temperature}°C</p>
              <p className="text-xl text-blue-100 mt-1">{weatherData.current.condition}</p>
              <p className="text-sm text-blue-200 mt-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Punjab, India
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Droplets className="w-8 h-8 text-blue-200" />
              <div>
                <p className="text-blue-200 text-sm">Humidity</p>
                <p className="text-2xl font-semibold">{weatherData.current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Wind className="w-8 h-8 text-blue-200" />
              <div>
                <p className="text-blue-200 text-sm">Wind Speed</p>
                <p className="text-2xl font-semibold">{weatherData.current.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Sun className="w-8 h-8 text-blue-200" />
              <div>
                <p className="text-blue-200 text-sm">UV Index</p>
                <p className="text-2xl font-semibold">Moderate</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Thermometer className="w-8 h-8 text-blue-200" />
              <div>
                <p className="text-blue-200 text-sm">Feels Like</p>
                <p className="text-2xl font-semibold">30°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">5-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {weatherData.forecast.map((day, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-xl transition-all ${
                index === 0
                  ? 'bg-primary-50 border-2 border-primary-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <p className={`font-medium ${index === 0 ? 'text-primary-700' : 'text-gray-700'}`}>
                {day.day}
              </p>
              <span className="text-5xl my-3 block">{day.icon}</span>
              <p className="text-sm text-gray-500">{day.condition}</p>
              <p className="font-semibold text-gray-800 mt-2">
                <span className="text-red-500">{day.high}°</span>
                <span className="mx-1">/</span>
                <span className="text-blue-500">{day.low}°</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weather-Based Farming Tips */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🌾 Weather-Based Farming Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
            <Cloud className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-800">Rain Expected Wednesday</p>
              <p className="text-sm text-blue-700 mt-1">
                Delay any planned pesticide spraying until after the rain. 
                Good time to plant rain-fed crops.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl">
            <Sun className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-800">Sunny Days Ahead</p>
              <p className="text-sm text-yellow-700 mt-1">
                Good time for harvesting and drying crops. 
                Ensure adequate irrigation for water-sensitive plants.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
            <Droplets className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800">Optimal Humidity</p>
              <p className="text-sm text-green-700 mt-1">
                Current humidity levels are ideal for most crops. 
                Monitor for any fungal diseases.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
            <Wind className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-purple-800">Moderate Winds</p>
              <p className="text-sm text-purple-700 mt-1">
                Safe for spraying operations. 
                Stake tall plants to prevent wind damage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Calendar */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Seasonal Planting Calendar</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Crop</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Best Season</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Sowing Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Harvest Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">Wheat</td>
                <td className="py-3 px-4">Rabi</td>
                <td className="py-3 px-4">Oct - Nov</td>
                <td className="py-3 px-4">Mar - Apr</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">Rice</td>
                <td className="py-3 px-4">Kharif</td>
                <td className="py-3 px-4">Jun - Jul</td>
                <td className="py-3 px-4">Oct - Nov</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4">Tomato</td>
                <td className="py-3 px-4">Year-round</td>
                <td className="py-3 px-4">Any month</td>
                <td className="py-3 px-4">60-90 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Potato</td>
                <td className="py-3 px-4">Rabi</td>
                <td className="py-3 px-4">Oct - Nov</td>
                <td className="py-3 px-4">Jan - Feb</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN FARMER DASHBOARD ====================
const FarmerDashboard = () => {
  return (
    <DashboardLayout title="Farmer Dashboard">
      <Routes>
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="products" element={<MyProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<FarmerOrders />} />
        <Route path="insights" element={<AIInsights />} />
        <Route path="supplies" element={<BuySupplies />} />
        <Route path="weather" element={<Weather />} />
        <Route path="*" element={<DashboardOverview />} />
      </Routes>
    </DashboardLayout>
  );
};

export default FarmerDashboard;