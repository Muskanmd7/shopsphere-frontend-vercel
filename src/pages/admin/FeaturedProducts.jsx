import React, { useState } from 'react';
import { Star, ToggleLeft, ToggleRight } from 'lucide-react';
import { products as initialProducts } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function FeaturedProducts() {
  const [products, setProducts] = useState(initialProducts);
  const { showNotification } = useApp();

  const toggleFeatured = (id) => {
    setProducts(ps => ps.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
    const p = products.find(x => x.id === id);
    showNotification(p.featured ? `${p.name} removed from featured` : `${p.name} added to featured`, 'info');
  };

  const featured = products.filter(p => p.featured);
  const notFeatured = products.filter(p => !p.featured);

  return (
    <div className="p-6 lg:p-8">
      <div className="page-header">
        <h1 className="section-title">Featured Products</h1>
        <p className="text-slate-500 mt-1">{featured.length} products currently featured on the homepage</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Featured */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h2 className="font-bold text-slate-800">Currently Featured ({featured.length})</h2>
          </div>
          <div className="space-y-3">
            {featured.map(p => (
              <div key={p.id} className="card p-4 flex items-center gap-3 border-l-4 border-l-amber-400">
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.category} · ₹{p.price}</p>
                </div>
                <button onClick={() => toggleFeatured(p.id)} className="shrink-0 text-amber-500 hover:text-slate-400 transition-colors">
                  <ToggleRight className="w-7 h-7" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Not Featured */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-slate-300" />
            <h2 className="font-bold text-slate-800">Other Products ({notFeatured.length})</h2>
          </div>
          <div className="space-y-3">
            {notFeatured.map(p => (
              <div key={p.id} className="card p-4 flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.category} · ₹{p.price}</p>
                </div>
                <button onClick={() => toggleFeatured(p.id)} className="shrink-0 text-slate-300 hover:text-amber-500 transition-colors">
                  <ToggleLeft className="w-7 h-7" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
