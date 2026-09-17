import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Notification from './components/common/Notification';
import AdminLayout from './components/admin/AdminLayout';

// Public pages
import LandingPage from './pages/LandingPage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import InventoryManagement from './pages/admin/InventoryManagement';
import CouponsManagement from './pages/admin/CouponsManagement';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import AIProductAnalyzer from './pages/admin/AIProductAnalyzer';
import OrdersPage from './pages/admin/OrdersPage';
import UsersPage from './pages/admin/UsersPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import FeaturedProducts from './pages/admin/FeaturedProducts';

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Notification />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><ProductListingPage /></PublicLayout>} />
          <Route path="/products/:id" element={<PublicLayout><ProductDetailsPage /></PublicLayout>} />
          <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />
          <Route path="/checkout" element={<PublicLayout><CheckoutPage /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
          <Route path="/dashboard" element={<PublicLayout><UserDashboard /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="coupons" element={<CouponsManagement />} />
            <Route path="featured" element={<FeaturedProducts />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="ai-analyzer" element={<AIProductAnalyzer />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={
            <PublicLayout>
              <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
                <div>
                  <p className="text-8xl font-black text-slate-100 mb-4">404</p>
                  <h2 className="text-2xl font-bold text-slate-700 mb-2">Page not found</h2>
                  <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn-primary">Go Home</a>
                </div>
              </div>
            </PublicLayout>
          } />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
