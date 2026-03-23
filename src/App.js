import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';


import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FarmerDashboard from './pages/FarmerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import StoreDashboard from './pages/StoreDashboard';
import Cart from './pages/Cart';
import Orders from './pages/Orders';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const DashboardRouter = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'farmer':
      return <Navigate to="/farmer/dashboard" replace />;
    case 'customer':
      return <Navigate to="/customer/dashboard" replace />;
    case 'store':
      return <Navigate to="/store/dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                }
              />

             
              <Route
                path="/farmer/*"
                element={
                  <ProtectedRoute allowedRoles={['farmer']}>
                    <FarmerDashboard />
                  </ProtectedRoute>
                }
              />

              
              <Route
                path="/customer/*"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />

              
              <Route
                path="/store/*"
                element={
                  <ProtectedRoute allowedRoles={['store']}>
                    <StoreDashboard />
                  </ProtectedRoute>
                }
              />

              
              <Route
                path="/cart"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'store']}>
                    <Cart />
                  </ProtectedRoute>
                }
              />

            
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

             
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;