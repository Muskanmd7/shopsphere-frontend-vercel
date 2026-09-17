import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-surface-200 mt-24">
      {/* Top decorative strip */}
      <div className="h-1 bg-gradient-to-r from-primary-300 via-blush-300 to-sage-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-blush-400 rounded-2xl flex items-center justify-center shadow-soft">
                <Sparkles className="w-4 h-4 text-white" strokeWidth={1.8} />
              </div>
              <span className="text-xl font-display font-semibold text-surface-800">ShopSphere</span>
            </div>
            <p className="text-sm text-surface-300 leading-relaxed">
              A curated beauty and lifestyle experience — powered by AI that quietly learns what you love.
            </p>
            <div className="flex gap-2.5 mt-6">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-surface-100 hover:bg-primary-100 text-surface-300 hover:text-primary-600 rounded-xl transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-surface-300 mb-5">Shop</h4>
            <ul className="space-y-3 text-sm">
              {['All Products', 'New Arrivals', 'Trending Now', 'Best Sellers', 'Gifts & Sets'].map(item => (
                <li key={item}>
                  <Link to="/products" className="text-surface-800 hover:text-primary-600 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-surface-300 mb-5">Help</h4>
            <ul className="space-y-3 text-sm">
              {['Help Center', 'Track Order', 'Returns & Refunds', 'Shipping Policy', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <a href="#" className="text-surface-800 hover:text-primary-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-surface-300 mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {['About Us', 'Careers', 'Press', 'Blog', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="text-surface-800 hover:text-primary-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-200 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-surface-300">© 2025 ShopSphere. All rights reserved.</p>
          <p className="text-xs text-surface-300 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-blush-400 fill-blush-400" /> for beauty lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
