import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, DollarSign, AlertTriangle, Star, TrendingUp, Users, ArrowRight } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import { orders, products, revenueData } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const STATUS_COLORS = { Delivered: 'badge-success', Processing: 'badge-info', Shipped: 'badge-warning', Cancelled: 'badge-danger' };

export default function AdminDashboard() {
  const lowStock = products.filter(p => p.stock <= 10);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="page-header">
        <h1 className="section-title">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Total Products" value="583" change={12} changeLabel="vs last month" icon={Package} color="text-primary-600" bg="bg-primary-100" />
        <StatCard title="Total Orders" value="1,847" change={8.2} changeLabel="vs last month" icon={ShoppingBag} color="text-emerald-600" bg="bg-emerald-100" />
        <StatCard title="Revenue" value="₹9.1L" change={23.4} changeLabel="vs last month" icon={DollarSign} color="text-violet-600" bg="bg-violet-100" />
        <StatCard title="Active Users" value="12,489" change={5.1} changeLabel="vs last month" icon={Users} color="text-amber-600" bg="bg-amber-100" />
      </div>

      {/* Revenue Chart */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-slate-800">Revenue Overview</h2>
            <span className="badge badge-success">↑ 24% this month</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Low Stock Alerts */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="font-bold text-slate-800">Low Stock Alerts</h2>
            <span className="badge badge-warning ml-auto">{lowStock.length}</span>
          </div>
          <div className="space-y-3">
            {lowStock.map(p => (
              <div key={p.id} className="flex items-center gap-3 p-2.5 bg-amber-50 border border-amber-100 rounded-xl">
                <img src={p.image} alt={p.name} className="w-9 h-9 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{p.name}</p>
                  <p className="text-xs text-amber-600 font-bold">{p.stock} left</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/admin/inventory" className="btn-ghost w-full mt-3 text-sm text-amber-600 hover:bg-amber-50">
            View Inventory <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Recent Orders</h2>
            <Link to="/admin/orders" className="btn-ghost text-sm">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="divide-y divide-slate-50">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">{order.id}</p>
                    <span className={`badge ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{order.customer}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-900">₹{order.amount}</p>
                  <p className="text-xs text-slate-400">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div className="card overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Top Rated Products</h2>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="divide-y divide-slate-50">
            {topRated.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3.5">
                <span className="text-lg font-black text-slate-200 w-6 text-center">#{i + 1}</span>
                <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.reviews.toLocaleString()} reviews</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-slate-700">{p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
