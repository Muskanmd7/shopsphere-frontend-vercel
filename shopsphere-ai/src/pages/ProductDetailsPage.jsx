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
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-5xl mb-4">😕</p>
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Product not found</h2>
      <Link to="/products" className="btn-primary mt-4">Back to Products</Link>
    </div>
  );

  const isWishlisted = wishlist.some(i => i.id === product.id);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => navigate(-1)} className="btn-ghost mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-10 mb-14">
  {/* Image */}
  <div className="relative">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-card"
    />
  </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
         <div>
  <span className="badge badge-info mb-2">
    {product.category}
  </span>

  <h1 className="text-3xl font-bold text-slate-900 leading-tight">
    {product.name}
  </h1>

  <p className="text-slate-500 text-sm mt-1">
    Product ID : {product.id}
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
            : "text-slate-200 fill-slate-200"
        }`}
      />
    ))}
  </div>

  <span className="font-semibold text-slate-700">
    {product.rating}
  </span>

</div>

<div className="flex items-baseline gap-3">
  <span className="text-4xl font-black text-slate-900">
    ₹{product.price}
  </span>
</div>

          <div className="flex items-center gap-2">
            {product.stock > 5 ? (
              <span className="badge badge-success"><Package className="w-3 h-3 mr-1" /> In Stock ({product.stock} left)</span>
            ) : product.stock > 0 ? (
              <span className="badge badge-warning"><Zap className="w-3 h-3 mr-1" /> Only {product.stock} left!</span>
            ) : (
              <span className="badge badge-danger">Out of Stock</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold text-slate-700 text-sm">Qty:</label>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-surface-50 font-bold transition-colors">−</button>
              <span className="w-10 text-center font-semibold text-slate-800">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-surface-50 font-bold transition-colors">+</button>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => addToCart(product, qty)} disabled={product.stock === 0}
              className="btn-primary flex-1 min-w-36 py-3">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product)}
              className={`px-4 py-3 rounded-xl border font-semibold transition-all flex items-center gap-2 ${isWishlisted ? 'border-red-300 bg-red-50 text-red-600' : 'border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-500'}`}>
              <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
            {[
              { icon: Truck, text: 'Free Shipping' },
              { icon: ShieldCheck, text: 'Secure Payment' },
              { icon: RefreshCw, text: '30-Day Return' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 p-3 bg-surface-50 rounded-xl text-center">
                <Icon className="w-5 h-5 text-primary-500" />
                <span className="text-xs font-medium text-slate-600">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-14">
        <div className="flex border-b border-slate-100">
          {['description', 'specifications', 'reviews'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-4 text-sm font-semibold capitalize transition-colors ${tab === t ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="p-6">
          {tab === 'description' && <p className="text-slate-600 leading-relaxed">{product.description}</p>}
          {tab === 'specifications' && (
  <table className="w-full text-sm">
    <tbody className="divide-y divide-slate-50">
      {[
  ['Product ID', product.id],
  ['Category', product.category],
  ['Price', `₹${product.price}`],
  ['Rating', `${product.rating}/5`],
  ['Stock', `${product.stock} Units`]
].map(([k, v]) => (
        <tr key={k} className="py-2">
          <td className="py-2.5 pr-4 font-semibold text-slate-700 w-40">{k}</td>
          <td className="py-2.5 text-slate-600">{v}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
          {tab === 'reviews' && (
  <div className="text-center py-10">
    <h3 className="text-xl font-semibold text-slate-700">
      Reviews Coming Soon 🚀
    </h3>

    <p className="text-slate-500 mt-2">
      Reviews will be loaded from the backend after Review API integration.
    </p>
  </div>
)}
</div>
</div>
</div>
  );
}

