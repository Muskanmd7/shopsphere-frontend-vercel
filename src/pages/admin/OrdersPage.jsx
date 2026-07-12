import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { orders } from '../../data/mockData';

const STATUS_COLORS = { Delivered: 'badge-success', Processing: 'badge-info', Shipped: 'badge-warning', Cancelled: 'badge-danger' };
const ALL_STATUSES = ['All', 'Delivered', 'Processing', 'Shipped', 'Cancelled'];

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = orders.filter(o => {
    const matchSearch = o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="page-header">
        <h1 className="section-title">Orders</h1>
        <p className="text-slate-500 mt-1">{orders.length} total orders</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {ALL_STATUSES.slice(1).map(status => (
          <div key={status} className={`card p-4 border-l-4 ${status === 'Delivered' ? 'border-l-emerald-500' : status === 'Processing' ? 'border-l-blue-500' : status === 'Shipped' ? 'border-l-amber-500' : 'border-l-red-500'}`}>
            <p className="text-2xl font-black text-slate-900">{orders.filter(o => o.status === status).length}</p>
            <p className="text-sm text-slate-500 font-medium">{status}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="input-field pl-9 text-sm" placeholder="Search orders or customers…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="relative">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field pr-8 appearance-none text-sm">
              {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50">
              <tr>{['Order ID', 'Customer', 'Product', 'Amount', 'Items', 'Status', 'Date'].map(h => <th key={h} className="table-header">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="table-row">
                  <td className="table-cell font-mono font-bold text-primary-600 text-sm">{order.id}</td>
                  <td className="table-cell">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{order.customer}</p>
                      <p className="text-xs text-slate-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="table-cell text-slate-600 max-w-40">
                    <p className="truncate text-sm">{order.product}</p>
                  </td>
                  <td className="table-cell font-bold text-slate-900">₹{order.amount}</td>
                  <td className="table-cell text-slate-600">{order.items}</td>
                  <td className="table-cell"><span className={`badge ${STATUS_COLORS[order.status]}`}>{order.status}</span></td>
                  <td className="table-cell text-slate-400 text-sm">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
