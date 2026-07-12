import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RefreshCw,
  Zap,
  Package
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import api from "../services/api";
import AIRecommendationPopup from "../components/AIRecommendationPopup";
import ReviewSection from "../components/product/ReviewSection";

export default function ProductDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, toggleWishlist, wishlist } = useApp();

  const [product, setProduct] = useState(null);
  //const [related, setRelated] = useState([]);

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {

      const response = await api.get(`/products/${id}`);

      const p = response.data;

      const formattedProduct = {
        id: p.productId,
        name: p.productName,
        description: p.productDescription,
        price: p.productPrice,
        stock: p.productQuantity,
        category: p.productCategory.name,
        rating: p.productRating,
        image: p.imageUrl
      };

      setProduct(formattedProduct);

    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <p className="text-5xl mb-4">🌸</p>
      <h2 className="font-display text-2xl font-semibold text-surface-800 mb-2">Product not found</h2>
      <p className="text-surface-300 text-sm mb-6">It may have sold out or moved.</p>
      <Link to="/products" className="btn-primary mt-4">Back to Products</Link>
    </div>
  );

  const isWishlisted = wishlist.some(i => i.id === product.id);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => navigate(-1)} className="btn-ghost mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary-200/50 to-blush-200/40 rounded-full blur-2xl -z-10" />
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 lg:h-[520px] object-cover rounded-4xl shadow-card-hover border border-surface-200"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="badge-info mb-3">
              {product.category}
            </span>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-surface-800 leading-tight mt-2">
              {product.name}
            </h1>

            <p className="text-surface-300 text-xs mt-2">
              Product ID · {product.id}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-surface-200 fill-surface-200"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-surface-800 text-sm">
              {product.rating}
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-display font-semibold text-surface-800">
              ₹{product.price?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {product.stock > 5 ? (
              <span className="badge-success"><Package className="w-3 h-3 mr-1" /> In Stock ({product.stock} left)</span>
            ) : product.stock > 0 ? (
              <span className="badge-warning"><Zap className="w-3 h-3 mr-1" /> Only {product.stock} left!</span>
            ) : (
              <span className="badge-danger">Out of Stock</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold text-surface-800 text-sm">Quantity</label>
            <div className="flex items-center border border-surface-200 rounded-2xl overflow-hidden bg-white">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-surface-800 hover:bg-primary-50 font-bold transition-colors">−</button>
              <span className="w-10 text-center font-semibold text-surface-800">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-10 h-10 flex items-center justify-center text-surface-800 hover:bg-primary-50 font-bold transition-colors">+</button>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => addToCart(product, qty)} disabled={product.stock === 0}
              className="btn-primary flex-1 min-w-36 py-3.5">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product)}
              className={`px-5 py-3.5 rounded-2xl border font-semibold transition-all flex items-center gap-2 ${isWishlisted ? 'border-blush-300 bg-blush-50 text-blush-500' : 'border-surface-200 text-surface-300 hover:border-blush-300 hover:text-blush-500'}`}>
              <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-surface-100">
            {[
              { icon: Truck, text: 'Free Shipping' },
              { icon: ShieldCheck, text: 'Secure Payment' },
              { icon: RefreshCw, text: '30-Day Return' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 p-4 bg-surface-50 rounded-2xl text-center">
                <Icon className="w-5 h-5 text-primary-500" strokeWidth={1.8} />
                <span className="text-xs font-medium text-surface-800">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-14 overflow-hidden">
        <div className="flex border-b border-surface-100">
          {['description', 'specifications', 'reviews'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-4 text-sm font-semibold capitalize transition-colors ${tab === t ? 'text-primary-600 border-b-2 border-primary-500' : 'text-surface-300 hover:text-surface-800'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="p-7">
          {tab === 'description' && <p className="text-surface-800 leading-relaxed">{product.description}</p>}
          {tab === 'specifications' && (
            <table className="w-full text-sm">
              <tbody className="divide-y divide-surface-100">
                {[
                  ['Product ID', product.id],
                  ['Category', product.category],
                  ['Price', `₹${product.price}`],
                  ['Rating', `${product.rating}/5`],
                  ['Stock', `${product.stock} Units`]
                ].map(([k, v]) => (
                  <tr key={k} className="py-2">
                    <td className="py-2.5 pr-4 font-semibold text-surface-800 w-40">{k}</td>
                    <td className="py-2.5 text-surface-300">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === 'reviews' && (
            <ReviewSection productId={product.id} />
          )}
        </div>
      </div>

      {/* AI Compatibility Analysis popup */}
      <AIRecommendationPopup productId={product.id} />
    </div>
  );
}
