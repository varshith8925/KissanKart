import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Plus,
  Cloud,
  Sprout,
  Users,
  TrendingUp,
  Settings,
  HelpCircle,
  Leaf,
  Store,
  Heart,
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const farmerLinks = [
    { to: '/farmer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/farmer/products', icon: Package, label: 'My Products' },
    { to: '/farmer/add-product', icon: Plus, label: 'Add Product' },
    { to: '/farmer/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/farmer/insights', icon: TrendingUp, label: 'AI Insights' },
    { to: '/farmer/supplies', icon: Sprout, label: 'Buy Supplies' },
    { to: '/farmer/weather', icon: Cloud, label: 'Weather' },
  ];

  const customerLinks = [
    { to: '/customer/dashboard', icon: LayoutDashboard, label: 'Marketplace' },
    { to: '/customer/orders', icon: ShoppingBag, label: 'My Orders' },
    { to: '/customer/wishlist', icon: Heart, label: 'Wishlist' },
  ];

  const storeLinks = [
    { to: '/store/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/store/farmers', icon: Users, label: 'Browse Farmers' },
    { to: '/store/products', icon: Package, label: 'Products' },
    { to: '/store/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/store/bulk-purchase', icon: Store, label: 'Bulk Purchase' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'farmer':
        return farmerLinks;
      case 'customer':
        return customerLinks;
      case 'store':
        return storeLinks;
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">
            <span className="text-primary-600">Kissan</span>
            <span className="text-secondary-500">Kart</span>
          </span>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-700 font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.name}</p>
              <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Main Menu
          </p>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? 'sidebar-link-active' : 'sidebar-link'
              }
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}

          <div className="pt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Support
            </p>
            <NavLink
              to="/settings"
              onClick={onClose}
              className="sidebar-link"
            >
              <Settings className="w-5 h-5" />
              Settings
            </NavLink>
            <NavLink
              to="/help"
              onClick={onClose}
              className="sidebar-link"
            >
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </NavLink>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-4 text-white">
            <h4 className="font-semibold mb-1">Need Help?</h4>
            <p className="text-sm text-primary-100 mb-3">
              Contact our support team for assistance
            </p>
            <button className="w-full bg-white text-primary-700 py-2 rounded-lg font-medium text-sm hover:bg-primary-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;