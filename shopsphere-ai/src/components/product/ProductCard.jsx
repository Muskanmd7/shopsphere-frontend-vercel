import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import api from "../../services/api";

export default function ProductCard({ product }) {
  const { addToCart } = useApp();
  const [wishlist, setWishlist] = useState([]);
  const isWishlisted = wishlist.some(
    item => item.product?.productId === product.id
);
  const discount = 0;
   useEffect(() => {

    fetchWishlist();

}, []);
const fetchWishlist = async () => {

    try {

        const response = await api.get("/wishlist");

        setWishlist(response.data);

    } catch (error) {

        console.log(error);

    }

};

const toggleWishlist = async () => {

    try {

        if (isWishlisted) {

            await api.delete(`/wishlist/product/${product.id}`);

        } else {

            await api.post(`/wishlist/${product.id}`);

        }

        fetchWishlist();

    } catch (error) {

        console.log(error);

    }

};
  return (
    <div className="card-hover group flex flex-col overflow-hidden">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
            -{discount}%
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 right-12 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
            <Zap className="w-3 h-3" /> Low Stock
          </span>
        )}
        <button
  onClick={toggleWishlist}
  className={`absolute top-3 right-3 p-2 rounded-xl shadow-sm transition-all duration-200 ${
    isWishlisted
      ? "bg-red-500 text-white"
      : "bg-white text-slate-400 hover:text-red-500 hover:bg-red-50"
  }`}
>
  <Heart
    className="w-4 h-4"
    fill={isWishlisted ? "currentColor" : "none"}
  />
</button>
</div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <Link to={`/products/${product.id}`} className="hover:text-primary-600 transition-colors">
          <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">{product.name}</h3>
        </Link>
        <span className="text-xs text-slate-400">{product.category}</span>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium">
    {product.rating} ⭐
</span>
        </div>

        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-50">
          <span className="text-xl font-bold text-slate-900">₹{product.price}</span>
         
        </div>

        <button onClick={() => addToCart(product)}
          className="btn-primary w-full mt-2 text-sm py-2"
          disabled={product.stock === 0}>
          <ShoppingCart className="w-4 h-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
