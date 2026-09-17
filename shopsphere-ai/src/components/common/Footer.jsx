import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-violet-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ShopSphere</span>
              <span className="text-xs font-bold bg-primary-700 text-primary-200 px-1.5 py-0.5 rounded">AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The AI-powered commerce platform for modern businesses. Smarter selling, better buying.
            </p>
            <div className="flex gap-3 mt-5">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-surface-800 hover:bg-primary-700 text-slate-400 hover:text-white rounded-lg transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {['All Products', 'Electronics', 'Fashion', 'Home & Living', 'Sports'].map(item => (
                <li key={item}><Link to="/products" className="text-slate-400 hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {['About Us', 'Careers', 'Press', 'Blog', 'Contact'].map(item => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-sm">
              {['Help Center', 'Returns', 'Shipping Policy', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">© 2025 ShopSphere AI. All rights reserved.</p>
          <p className="text-xs text-slate-500">Built with React + Vite + TailwindCSS</p>
        </div>
      </div>
    </footer>
  );
}
