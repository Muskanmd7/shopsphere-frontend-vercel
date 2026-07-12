import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, MapPin, Bell, Star, ShoppingBag, ArrowRight, User, Settings, LogOut, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import api from "../services/api";
const STATUS_COLORS = {
  PLACED: 'badge-info',
  Delivered: 'badge-success',
  Processing: 'badge-warning',
  Shipped: 'badge-warning',
  Cancelled: 'badge-danger'
};

export default function UserDashboard() {
  const { user, logout } = useApp();
const [wishlist, setWishlist] = useState([]);
  const [tab, setTab] = useState('overview');
  const [myOrders, setMyOrders] = useState([]);
  useEffect(()=>{fetchWishlist();fetchOrders();},[]);

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

const fetchOrders = async () => {
  try {
    const response = await api.get("/orders");
    setMyOrders(response.data);
  } catch (error) {
    console.log(error);
  }
};
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card p-5">
            <div className="text-center mb-5 pb-5 border-b border-surface-100">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-blush-400 rounded-3xl flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold shadow-soft">
                {user?.avatar || 'U'}
              </div>
              <h2 className="font-display font-semibold text-surface-800">{user?.name || 'User'}</h2>
              <p className="text-sm text-surface-300">{user?.email}</p>
              <span className="badge-purple mt-2 capitalize">{user?.role}</span>
            </div>
            <nav className="space-y-0.5">
              {[
                { id: 'overview', icon: LayoutIcon, label: 'Overview' },
                { id: 'orders', icon: ShoppingBag, label: 'My Orders' },
                { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                { id: 'profile', icon: User, label: 'Profile' },
              ].map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-colors ${tab === id ? 'bg-primary-50 text-primary-700' : 'text-surface-800 hover:bg-surface-50'}`}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
              {user?.role === 'admin' && (
                <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors">
                  <TrendingUp className="w-4 h-4" /> Admin Panel
                </Link>
              )}
              <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-blush-500 hover:bg-blush-50 transition-colors mt-2">
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
                  { label: 'Total Orders', value: myOrders.length.toString(), icon: ShoppingBag, color: 'text-primary-600', bg: 'bg-primary-100' },
                  { label: 'Wishlist Items', value:wishlist.length.toString(), icon: Heart, color: 'text-blush-500', bg: 'bg-blush-100' },
                  { label: 'Total Spent',value: `₹${myOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}`, icon: TrendingUp, color: 'text-sage-600', bg: 'bg-sage-100' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className="card p-5 flex items-center gap-4">
                    <div className={`w-11 h-11 ${bg} rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-semibold text-surface-800">{value}</p>
                      <p className="text-xs text-surface-300 font-medium">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-semibold text-surface-800">Recent Orders</h3>
                  <button onClick={() => setTab('orders')} className="btn-ghost text-sm">View all <ArrowRight className="w-3.5 h-3.5" /></button>
                </div>
                <div className="space-y-3">
  {myOrders.slice(0, 3).map((order) => (
    <div
      key={order.id}
      className="flex items-center gap-3 p-3 bg-surface-50 rounded-2xl"
    
      >

      <div className="w-10 h-10 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
        <Package className="w-5 h-5 text-primary-600" strokeWidth={1.8} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-surface-800 text-sm">
          ORD-{order.id}
        </p>

        <p className="text-xs text-surface-300 truncate">
          {order.product.productName}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="font-bold text-surface-800 text-sm">
          ₹{order.totalPrice.toFixed(2)}
        </p>

        <span className={`badge text-xs ${STATUS_COLORS[order.orderStatus]}`}>
          {order.orderStatus}
        </span>
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
    <div className="p-5 border-b border-surface-100">
      <h3 className="font-display font-semibold text-surface-800">
        My Orders
      </h3>
    </div>

    <div className="divide-y divide-surface-50">
      {myOrders.map((order) => (
        <div key={order.id} className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
            <Package
              className="w-5 h-5 text-primary-600"
              strokeWidth={1.8}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-surface-800 text-sm">
                ORD-{order.id}
              </p>

              <span className={`badge ${STATUS_COLORS[order.orderStatus]}`}>
                {order.orderStatus}
              </span>
            </div>

            <p className="text-xs text-surface-300 truncate">
              {order.product.productName}
            </p>

            <p className="text-xs text-surface-300">
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="font-bold text-surface-800">
              ₹{order.totalPrice.toFixed(2)}
            </p>
          </div>
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
                  <Heart className="w-12 h-12 text-primary-200 mx-auto mb-3" strokeWidth={1.5} />
                  <h3 className="font-display font-semibold text-surface-800 mb-2">No wishlist items yet</h3>
                  <Link to="/products" className="btn-primary text-sm">Browse Products</Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {wishlist.map(p => (
                    <div key={p.id} className="card p-4 flex gap-3">
                      <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-2xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-surface-800 text-sm truncate">{p.name}</p>
                        <p className="text-xs text-surface-300">{p.category}</p>
                        <p className="font-bold text-primary-600 mt-1">₹{p.price}</p>
                        <button
                       onClick={() => removeWishlist(p.wishlistId)}
                      className="btn-ghost text-blush-500 mt-2"
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
              <h3 className="font-display font-semibold text-surface-800 mb-5">Profile Settings</h3>
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

