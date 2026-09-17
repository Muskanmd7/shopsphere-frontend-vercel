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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary-100/60 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-blush-400 rounded-2xl flex items-center justify-center shadow-soft">
              <Sparkles className="w-[18px] h-[18px] text-white" strokeWidth={1.8} />
            </div>
            <span className="text-xl font-display font-semibold text-surface-800 hidden sm:block tracking-tight">ShopSphere</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for products, brands, categories…"
                className="w-full pl-10 pr-4 py-2.5 bg-surface-100 border border-surface-200 rounded-2xl text-sm text-surface-800 placeholder-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-200 focus:bg-white transition-all"
              />
            </div>
          </form>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/products" className="btn-ghost text-sm font-medium">Products</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <Link to="/cart" className="relative p-2.5 text-surface-800 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all">
              <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-blush-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[1.1rem] min-h-[1.1rem] px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(p => !p)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-primary-50 rounded-2xl transition-all">
                  <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-blush-400 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar || user.name[0]}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-surface-800">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-surface-300 hidden sm:block" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-primary-100 rounded-3xl shadow-card-hover z-50 overflow-hidden">
                    <div className="p-4 border-b border-surface-100 bg-gradient-to-br from-primary-50 to-blush-50">
                      <p className="text-sm font-semibold text-surface-800">{user.name}</p>
                      <p className="text-xs text-surface-300">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-surface-800 hover:bg-primary-50 rounded-xl transition-colors">
                        <User className="w-4 h-4 text-primary-400" /> My Account
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-surface-800 hover:bg-primary-50 rounded-xl transition-colors">
                          <LayoutDashboard className="w-4 h-4 text-primary-400" /> Admin Panel
                        </Link>
                      )}
                      <button onClick={() => { logout(); setProfileOpen(false); navigate('/'); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-blush-500 hover:bg-blush-50 rounded-xl transition-colors mt-1">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2.5 px-5">Sign In</Link>
            )}

            <button className="md:hidden p-2.5 text-surface-800 hover:bg-primary-50 rounded-2xl" onClick={() => setMenuOpen(p => !p)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-primary-100 pt-3 space-y-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                  className="w-full pl-9 pr-4 py-2.5 bg-surface-100 border border-surface-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:bg-white transition-all" />
              </div>
              <button type="submit" className="btn-primary py-2 px-4 text-sm">Go</button>
            </form>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-surface-800 hover:bg-primary-50 rounded-xl text-sm font-medium">Products</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
