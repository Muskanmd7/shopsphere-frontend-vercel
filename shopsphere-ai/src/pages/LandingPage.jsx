
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Sparkles, Zap, TrendingUp } from 'lucide-react';
import api from '../services/api';

const features = [
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'Bank-grade encryption on every transaction.' },
  { icon: Truck, title: 'Fast Shipping', desc: 'Free delivery on orders above ₹500.' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free return policy.' },
  { icon: Sparkles, title: 'AI Recommendations', desc: 'Personalized picks powered by AI.' },
];

export default function LandingPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryName = (category) => {
    if (typeof category === 'string') return category;
    return category.categoryName || category.name || '';
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-surface-900 via-slate-800 to-surface-900 text-white overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-violet-600/20 rounded-full blur-2xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 text-primary-300 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered Commerce Platform
            </div>
            <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6">
              Shop Smarter.<br />
              <span className="text-gradient">Sell Better.</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
              ShopSphere AI brings intelligent product discovery, real-time analytics, and seamless commerce to one powerful platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary text-base px-6 py-3">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/admin" className="btn-secondary text-base px-6 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Admin Demo
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {[['10K+', 'Products'], ['50K+', 'Customers'], ['4.9★', 'Rating']].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="text-2xl font-black text-white">{val}</p>
                  <p className="text-xs text-slate-400">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4" />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 p-5 rounded-2xl hover:bg-surface-50 transition-colors">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-0.5">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 bg-surface-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="section-title">Browse Categories</h2>
              <p className="text-slate-500 mt-2">Find exactly what you're looking for</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(category => {
                const categoryName = getCategoryName(category);

                if (!categoryName) return null;

                return (
                  <Link
                    key={category.categoryId || category.id || categoryName}
                    to={`/products?category=${encodeURIComponent(categoryName)}`}
                    className="card-hover p-5 text-center group"
                  >
                    <p className="font-semibold text-slate-700 text-sm group-hover:text-primary-600 transition-colors">{categoryName}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* AI Banner */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Powered by Artificial Intelligence
          </h2>
          <p className="text-primary-100 text-lg mb-8 leading-relaxed">
            Our AI engine analyzes product images, predicts categories, suggests tags, and scores quality — all in seconds.
          </p>
          <Link to="/admin/ai-analyzer" className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            <Sparkles className="w-5 h-5" /> Try AI Analyzer
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-surface-900">
        <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: TrendingUp, val: '₹2.4Cr', lbl: 'Total Revenue', sub: '+24% this month' },
            { icon: Star, val: '4.9/5', lbl: 'Average Rating', sub: 'From 50K+ reviews' },
            { icon: Zap, val: '<2s', lbl: 'AI Analysis Speed', sub: 'Per product image' },
          ].map(({ icon: Icon, val, lbl, sub }) => (
            <div key={lbl} className="text-white">
              <Icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
              <p className="text-4xl font-black mb-1">{val}</p>
              <p className="text-slate-300 font-semibold">{lbl}</p>
              <p className="text-slate-500 text-sm mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}