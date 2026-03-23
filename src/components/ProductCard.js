import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  Eye,
  Check,
  Leaf,
} from 'lucide-react';

const ProductCard = ({ product, onView, onEdit, onDelete, showActions = false }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const canAddToCart = user?.role === 'customer' || user?.role === 'store';

  return (
    <div className="card overflow-hidden group cursor-pointer animate-fadeIn">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1518977676601-b53f82ber1dd?w=400';
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.organic && (
            <span className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
              <Leaf className="w-3 h-3" />
              Organic
            </span>
          )}
          {product.stock < 20 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              Low Stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full shadow-lg transition-all ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          {onView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(product);
              }}
              className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:text-primary-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Add Button */}
        {canAddToCart && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-primary-700 hover:bg-primary-50'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium text-gray-700">{product.rating}</span>
            <span className="text-gray-400">({product.reviews})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Farmer Info */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin className="w-3 h-3" />
          <span>{product.farmerName}</span>
          <span>•</span>
          <span>{product.farmLocation}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">₹{product.price}</span>
            <span className="text-gray-500 text-sm">/{product.unit}</span>
          </div>
          <span className="text-sm text-gray-500">
            Stock: {product.stock} {product.unit}
          </span>
        </div>

        {/* Action Buttons for Farmer */}
        {showActions && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              className="flex-1 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product);
              }}
              className="flex-1 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;