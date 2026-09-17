import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Heart, Menu, X, Sparkles, User, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const { cartCount, user, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?q=${search}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-violet-600 rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">ShopSphere</span>
            <span className="text-xs font-semibold bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded-md hidden sm:block">AI</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2 bg-surface-100 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>
          </form>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/products" className="btn-ghost text-sm">Products</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(p => !p)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-surface-100 rounded-xl transition-all">
                  <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar || user.name[0]}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-slate-700">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-card-hover z-50 overflow-hidden">
                    <div className="p-3 border-b border-slate-50">
                      <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-surface-50 rounded-lg transition-colors">
                        <User className="w-4 h-4 text-slate-400" /> My Account
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-surface-50 rounded-lg transition-colors">
                          <LayoutDashboard className="w-4 h-4 text-slate-400" /> Admin Panel
                        </Link>
                      )}
                      <button onClick={() => { logout(); setProfileOpen(false); navigate('/'); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-4">Sign In</Link>
            )}

            <button className="md:hidden p-2 text-slate-600 hover:bg-surface-100 rounded-xl" onClick={() => setMenuOpen(p => !p)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100 pt-3 space-y-2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                  className="w-full pl-9 pr-4 py-2 bg-surface-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all" />
              </div>
              <button type="submit" className="btn-primary py-2 px-3">Go</button>
            </form>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="block py-2 px-3 text-slate-700 hover:bg-surface-50 rounded-lg text-sm font-medium">Products</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
