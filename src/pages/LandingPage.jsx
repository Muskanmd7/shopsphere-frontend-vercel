import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/product/ProductCard';

const trustFeatures = [
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'Bank-grade encryption on every transaction.' },
  { icon: Truck, title: 'Free Shipping', desc: 'Complimentary delivery on orders above ₹500.' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free return policy.' },
  { icon: Sparkles, title: 'Personalised Picks', desc: 'AI-curated recommendations made for you.' },
];

// Soft pastel backgrounds per category (cycles if more cats exist)
const categoryPalettes = [
  'from-primary-100 to-primary-50',
  'from-blush-100 to-blush-50',
  'from-sage-100 to-sage-50',
  'from-cream-100 to-cream-50',
  'from-purple-100 to-purple-50',
  'from-pink-100 to-pink-50',
  'from-teal-100 to-teal-50',
  'from-amber-100 to-amber-50',
];

const categoryIcons = ['🌸', '✨', '🌿', '💆', '💄', '🛁', '🌺', '🍃'];

export default function LandingPage() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products');
      const formatted = (response.data || []).slice(0, 8).map(p => ({
        id: p.productId,
        name: p.productName,
        description: p.productDescription,
        price: p.productPrice,
        stock: p.productQuantity,
        category: p.productCategory?.name || p.productCategory,
        rating: p.productRating,
        image: p.imageUrl,
      }));
      setFeaturedProducts(formatted);
    } catch (err) { console.error(err); }
    finally { setLoadingProducts(false); }
  };

  const getCategoryName = (cat) => {
    if (typeof cat === 'string') return cat;
    return cat.categoryName || cat.name || '';
  };

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative bg-hero-pastel min-h-[88vh] flex items-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-200/50 to-blush-200/30 blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-sage-200/40 to-cream-200/30 blur-3xl translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-blush-100/40 blur-2xl" />

        {/* Floating petal shapes */}
        <svg className="absolute top-16 right-[15%] opacity-20 text-primary-400 w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(120 50 50)" />
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(180 50 50)" />
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(240 50 50)" />
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(300 50 50)" />
        </svg>
        <svg className="absolute bottom-24 left-[8%] opacity-15 text-blush-400 w-20 h-20" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(72 50 50)" />
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(144 50 50)" />
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(216 50 50)" />
          <ellipse cx="50" cy="25" rx="15" ry="25" transform="rotate(288 50 50)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/70 border border-primary-100 text-primary-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow-soft mb-8">
            <Sparkles className="w-3.5 h-3.5" /> Beauty begins with knowing yourself
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-surface-800 leading-tight tracking-tight mb-6">
            Your style.{' '}
            <span className="block italic text-gradient">Your skin.</span>
            Your ShopSphere.
          </h1>

          {/* Sub */}
          <p className="text-base sm:text-lg text-surface-300 max-w-xl mx-auto leading-relaxed mb-10">
            A curated collection of beauty and lifestyle essentials — discovered effortlessly, because your preferences guide every recommendation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/preferences"
  className="btn-primary text-base px-8 py-3.5 gap-2.5">
  ✨ Discover Your Match
  <ArrowRight className="w-4 h-4" />
    </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-14 text-xs text-surface-300">
            {['Free returns within 30 days', 'Secure checkout', 'Curated by experts'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary-300 inline-block" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-8 bg-white border-y border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustFeatures.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3.5 p-4 rounded-2xl hover:bg-primary-50 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-blush-100 rounded-2xl flex items-center justify-center shrink-0">
                <Icon className="w-[18px] h-[18px] text-primary-600" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-surface-800 mb-0.5">{title}</h3>
                <p className="text-xs text-surface-300 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      {categories.length > 0 && (
        <section className="py-20 bg-surface-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-eyebrow">Explore</p>
              <h2 className="section-title">Shop by Category</h2>
              <p className="text-surface-300 mt-2 text-sm">Find what suits your mood today</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categories.map((category, idx) => {
                const categoryName = getCategoryName(category);
                if (!categoryName) return null;
                const palette = categoryPalettes[idx % categoryPalettes.length];
                const emoji = categoryIcons[idx % categoryIcons.length];
                return (
                  <Link
                    key={category.categoryId || category.id || categoryName}
                    to={`/products?category=${encodeURIComponent(categoryName)}`}
                    className={`group relative bg-gradient-to-br ${palette} rounded-3xl p-6 text-center hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 border border-white/80`}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{emoji}</div>
                    <p className="font-semibold text-surface-800 text-sm leading-snug group-hover:text-primary-600 transition-colors">{categoryName}</p>
                    <div className="absolute inset-0 rounded-3xl ring-2 ring-primary-300/0 group-hover:ring-primary-300/60 transition-all duration-300" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-eyebrow">Handpicked for you</p>
              <h2 className="section-title">Trending This Week</h2>
            </div>
            <Link to="/products" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingProducts ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-surface-100 rounded-3xl h-80 animate-pulse" />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ── AI SECTION ── */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-50 via-white to-blush-50 rounded-4xl border border-primary-100 p-12 sm:p-16 text-center relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-100/60 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blush-100/60 to-transparent rounded-full blur-2xl" />

            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-200 to-blush-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft">
                <Sparkles className="w-6 h-6 text-primary-600" strokeWidth={1.8} />
              </div>
              <p className="section-eyebrow mx-auto">Personalised for you</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-surface-800 mb-4 leading-snug">
                Because beauty is personal.
              </h2>
              <p className="text-surface-300 text-base max-w-xl mx-auto leading-relaxed mb-8">
                Our AI quietly learns your preferences — your skin type, your aesthetic, your rituals — to surface products you'll truly love. Every recommendation starts with understanding you.
              </p>
              <Link to="/products" className="btn-primary px-8 py-3.5">
                Explore My Picks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL STRIP ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { bg: 'from-primary-100 to-primary-50', label: 'New Arrivals', emoji: '🌸', desc: 'Fresh drops, every week.' },
              { bg: 'from-blush-100 to-blush-50', label: 'Customer Favourites', emoji: '💖', desc: 'Loved by our community.' },
              { bg: 'from-sage-100 to-sage-50', label: 'Mindful Picks', emoji: '🌿', desc: 'Clean, conscious beauty.' },
            ].map(({ bg, label, emoji, desc }) => (
              <Link
                key={label}
                to="/products"
                className={`group bg-gradient-to-br ${bg} rounded-3xl p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-white/80 flex flex-col`}
              >
                <span className="text-4xl mb-4">{emoji}</span>
                <h3 className="font-display font-semibold text-surface-800 text-lg mb-1 group-hover:text-primary-600 transition-colors">{label}</h3>
                <p className="text-sm text-surface-300">{desc}</p>
                <span className="mt-4 text-xs font-semibold text-primary-500 flex items-center gap-1">
                  Shop now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
