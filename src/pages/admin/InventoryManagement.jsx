import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { inventoryData } from '../../data/mockData';

const STATUS_CONFIG = {
  'In Stock':  { badge: 'badge-success', icon: CheckCircle, color: 'text-emerald-500' },
  'Low Stock': { badge: 'badge-warning', icon: AlertTriangle, color: 'text-amber-500' },
  'Critical':  { badge: 'badge-danger',  icon: XCircle,       color: 'text-red-500' },
};

export default function InventoryManagement() {
  const [inventory, setInventory] = useState(inventoryData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = inventory.filter(i => {
    const matchSearch = i.product.toLowerCase().includes(search.toLowerCase()) || i.sku.includes(search);
    const matchFilter = filter === 'All' || i.status === filter;
    return matchSearch && matchFilter;
  });

  const restock = (id) => setInventory(inv => inv.map(i => i.id === id ? { ...i, stock: i.reorderPoint * 3, status: 'In Stock' } : i));

  const criticalCount = inventory.filter(i => i.status === 'Critical').length;
  const lowCount = inventory.filter(i => i.status === 'Low Stock').length;

  return (
    <div className="p-6 lg:p-8">
      <div className="page-header">
        <h1 className="section-title">Inventory Management</h1>
        <p className="text-slate-500 mt-1">Track and manage your product stock levels</p>
      </div>

      {/* Alert Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Items', value: inventory.length, bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-100' },
          { label: 'Low Stock', value: lowCount, bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
          { label: 'Critical', value: criticalCount, bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' },
        ].map(({ label, value, bg, text, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-2xl p-5`}>
            <p className={`text-3xl font-black ${text}`}>{value}</p>
            <p className={`text-sm font-medium ${text} opacity-75`}>{label}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="input-field pl-9 text-sm" placeholder="Search products or SKU…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            {['All', 'In Stock', 'Low Stock', 'Critical'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${filter === f ? 'bg-primary-600 text-white' : 'bg-surface-100 text-slate-600 hover:bg-surface-200'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50">
              <tr>
                {['Product', 'SKU', 'Stock', 'Reorder Point', 'Warehouse', 'Status', 'Last Updated', 'Action'].map(h => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const cfg = STATUS_CONFIG[item.status];
                const pct = Math.min(100, (item.stock / (item.reorderPoint * 3)) * 100);
                return (
                  <tr key={item.id} className="table-row">
                    <td className="table-cell font-semibold text-slate-800">{item.product}</td>
                    <td className="table-cell text-slate-500 font-mono text-xs">{item.sku}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 w-8">{item.stock}</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-16">
                          <div className={`h-full rounded-full transition-all ${item.status === 'In Stock' ? 'bg-emerald-500' : item.status === 'Low Stock' ? 'bg-amber-400' : 'bg-red-500'}`}
                            style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-slate-600">{item.reorderPoint}</td>
                    <td className="table-cell"><span className="badge badge-gray">{item.warehouse}</span></td>
                    <td className="table-cell"><span className={`badge ${cfg.badge}`}>{item.status}</span></td>
                    <td className="table-cell text-slate-400 text-xs">{item.lastUpdated}</td>
                    <td className="table-cell">
                      {item.status !== 'In Stock' && (
                        <button onClick={() => restock(item.id)}
                          className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-semibold">
                          <RefreshCw className="w-3.5 h-3.5" /> Restock
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
