import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, MapPin, Bell, Star, ShoppingBag, ArrowRight, User, Settings, LogOut, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { orders, products } from '../data/mockData';
import api from "../services/api";

const STATUS_COLORS = { Delivered: 'badge-success', Processing: 'badge-info', Shipped: 'badge-warning', Cancelled: 'badge-danger' };

export default function UserDashboard() {
  const { user, logout } = useApp();
const [wishlist, setWishlist] = useState([]);
  const [tab, setTab] = useState('overview');
  useEffect(()=>{fetchWishlist()},[]);
  useEffect(() => {
    console.log("Wishlist State:", wishlist);
}, [wishlist]);

const fetchWishlist = async () => {

    try {

        const response = await api.get("/wishlist");

        console.log("Wishlist Response:", response.data);

        const data = response.data.map(item => ({
            wishlistId: item.wishlistId,
            id: item.product.productId,
            name: item.product.productName,
            image: item.product.imageUrl,
            category: item.product.productCategory.name,
            price: item.product.productPrice
        }));

        console.log("Mapped Wishlist:", data);

        setWishlist(data);

    } catch (error) {

        console.log(error);

    }

};
const removeWishlist = async (wishlistId) => {

    try {

        await api.delete(`/wishlist/${wishlistId}`);

        fetchWishlist();

    } catch (error) {

        console.log(error);

    }

};
  const myOrders = orders.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card p-5">
            <div className="text-center mb-5 pb-5 border-b border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white text-xl font-black">
                {user?.avatar || 'U'}
              </div>
              <h2 className="font-bold text-slate-900">{user?.name || 'User'}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
              <span className="badge badge-purple mt-2 capitalize">{user?.role}</span>
            </div>
            <nav className="space-y-0.5">
              {[
                { id: 'overview', icon: LayoutIcon, label: 'Overview' },
                { id: 'orders', icon: ShoppingBag, label: 'My Orders' },
                { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                { id: 'profile', icon: User, label: 'Profile' },
              ].map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === id ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-surface-50'}`}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
              {user?.role === 'admin' && (
                <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors">
                  <TrendingUp className="w-4 h-4" /> Admin Panel
                </Link>
              )}
              <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-2">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-3 space-y-6">
          {/* Overview */}
          {tab === 'overview' && (
            <>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-primary-600', bg: 'bg-primary-100' },
                  { label: 'Wishlist Items', value: wishlist.length.toString(), icon: Heart, color: 'text-red-500', bg: 'bg-red-100' },
                  { label: 'Total Spent', value: '₹8,420', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className="card p-5 flex items-center gap-4">
                    <div className={`w-11 h-11 ${bg} rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900">{value}</p>
                      <p className="text-xs text-slate-500 font-medium">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Recent Orders</h3>
                  <button onClick={() => setTab('orders')} className="btn-ghost text-sm">View all <ArrowRight className="w-3.5 h-3.5" /></button>
                </div>
                <div className="space-y-3">
                  {myOrders.slice(0, 3).map(order => (
                    <div key={order.id} className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm">{order.id}</p>
                        <p className="text-xs text-slate-500 truncate">{order.product}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-slate-800 text-sm">₹{order.amount}</p>
                        <span className={`badge text-xs ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Orders */}
          {tab === 'orders' && (
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">My Orders</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {myOrders.map(order => (
                  <div key={order.id} className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-slate-800 text-sm">{order.id}</p>
                        <span className={`badge ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{order.product}</p>
                      <p className="text-xs text-slate-400">{order.date}</p>
                    </div>
                    <p className="font-bold text-slate-900">₹{order.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist */}
          {tab === 'wishlist' && (
            <div>
              {wishlist.length === 0 ? (
                <div className="card p-12 text-center">
                  <Heart className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-600 mb-2">No wishlist items yet</h3>
                  <Link to="/products" className="btn-primary text-sm">Browse Products</Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {wishlist.map(p => (
                    <div key={p.id} className="card p-4 flex gap-3">
                      <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.category}</p>
                        <p className="font-bold text-primary-600 mt-1">₹{p.price}</p>
                        <button
                       onClick={() => removeWishlist(p.wishlistId)}
                      className="btn-ghost text-red-500 mt-2"
                        >
                       Remove
                     </button>
                        <Link to={`/products/${p.id}`} className="btn-primary text-xs py-1.5 px-3 mt-2">View Product</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile */}
          {tab === 'profile' && (
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 mb-5">Profile Settings</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[['Full Name', user?.name], ['Email', user?.email], ['Phone', '+91 98765 43210'], ['Location', 'Mumbai, India']].map(([label, val]) => (
                  <div key={label}>
                    <label className="label">{label}</label>
                    <input className="input-field" defaultValue={val} />
                  </div>
                ))}
              </div>
              <button className="btn-primary mt-5">Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LayoutIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
