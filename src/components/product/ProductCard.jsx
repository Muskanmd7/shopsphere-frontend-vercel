import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Zap, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import api from "../../services/api";

export default function ProductCard({ product }) {
  const { addToCart } = useApp();
  const [wishlist, setWishlist] = useState([]);
  const [adding, setAdding] = useState(false);
  const isWishlisted = wishlist.some(item => item.product?.productId === product.id);
  const discount = 0;

  useEffect(() => { fetchWishlist(); }, []);

  const fetchWishlist = async () => {
    try {
      const response = await api.get("/wishlist");
      setWishlist(response.data);
    } catch (error) { console.log(error); }
  };

  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await api.delete(`/wishlist/product/${product.id}`);
      } else {
        await api.post(`/wishlist/${product.id}`);
      }
      fetchWishlist();
    } catch (error) { console.log(error); }
  };

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(product);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="group bg-white rounded-3xl border border-surface-200 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image */}
      <div className="relative overflow-hidden bg-surface-100 rounded-t-3xl">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Soft overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Badges */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-blush-500 text-white text-xs font-semibold px-2.5 py-1 rounded-xl shadow-sm">
            -{discount}%
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 left-3 bg-amber-400 text-white text-xs font-semibold px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1">
            <Zap className="w-3 h-3" /> Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-surface-800/70 text-white text-xs font-semibold px-2.5 py-1 rounded-xl">
            Sold Out
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-2xl shadow-soft transition-all duration-200 ${
            isWishlisted
              ? "bg-blush-500 text-white scale-110"
              : "bg-white/90 text-surface-300 hover:text-blush-500 hover:bg-blush-50"
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <span className="section-eyebrow text-[10px]">{product.category}</span>
          <Link to={`/products/${product.id}`} className="hover:text-primary-600 transition-colors">
            <h3 className="font-semibold text-surface-800 text-sm leading-snug line-clamp-2 mt-0.5">{product.name}</h3>
          </Link>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-surface-200 fill-surface-200'}`} />
            ))}
          </div>
          <span className="text-xs text-surface-300 font-medium">{product.rating}</span>
        </div>

        {/* Price + Cart */}
        <div className="mt-auto pt-3 border-t border-surface-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-xl font-bold text-surface-800">₹{product.price?.toLocaleString()}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 ${
              product.stock === 0
                ? 'bg-surface-100 text-surface-300 cursor-not-allowed'
                : adding
                ? 'bg-sage-400 text-white scale-95'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-soft hover:shadow-glow'
            }`}
          >
            {adding ? (
              <><Sparkles className="w-3.5 h-3.5" /> Added!</>
            ) : (
              <><ShoppingCart className="w-3.5 h-3.5" /> {product.stock === 0 ? 'Sold Out' : 'Add'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
