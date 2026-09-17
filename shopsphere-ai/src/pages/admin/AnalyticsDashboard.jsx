import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { revenueData, categoryData } from '../../data/mockData';
import StatCard from '../../components/admin/StatCard';

const COLORS = ['#6366f1', '#f97316', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const ordersData = revenueData.map(d => ({ ...d, prevOrders: Math.round(d.orders * 0.8) }));

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState('6M');

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Analytics</h1>
          <p className="text-slate-500 mt-1">Business performance at a glance</p>
        </div>
        <div className="flex gap-2">
          {['1M', '3M', '6M', '1Y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${period === p ? 'bg-primary-600 text-white' : 'bg-surface-100 text-slate-600 hover:bg-surface-200'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Total Revenue" value="₹9,10,000" change={23.4} changeLabel="vs prev period" icon={DollarSign} color="text-emerald-600" bg="bg-emerald-100" />
        <StatCard title="Total Orders" value="1,847" change={8.2} changeLabel="vs prev period" icon={ShoppingBag} color="text-primary-600" bg="bg-primary-100" />
        <StatCard title="New Customers" value="312" change={15.7} changeLabel="vs prev period" icon={Users} color="text-violet-600" bg="bg-violet-100" />
        <StatCard title="Avg Order Value" value="₹493" change={-2.1} changeLabel="vs prev period" icon={Package} color="text-amber-600" bg="bg-amber-100" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="font-bold text-slate-800 mb-5">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="font-bold text-slate-800 mb-5">Orders vs Previous Period</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="orders" name="Current" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="prevOrders" name="Previous" fill="#e0e9ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-5">
          <h2 className="font-bold text-slate-800 mb-5">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="truncate">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 card p-5">
          <h2 className="font-bold text-slate-800 mb-5">Key Metrics</h2>
          <div className="space-y-4">
            {[
              { label: 'Conversion Rate', value: '3.8%', change: 0.4, positive: true, progress: 38 },
              { label: 'Cart Abandonment', value: '62%', change: -4.2, positive: true, progress: 62 },
              { label: 'Repeat Purchase Rate', value: '41%', change: 5.1, positive: true, progress: 41 },
              { label: 'Customer Satisfaction', value: '4.8/5', change: 0.2, positive: true, progress: 96 },
            ].map(m => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-slate-700">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{m.value}</span>
                    <span className={`flex items-center gap-0.5 text-xs font-semibold ${m.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                      {m.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(m.change)}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full transition-all" style={{ width: `${m.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
