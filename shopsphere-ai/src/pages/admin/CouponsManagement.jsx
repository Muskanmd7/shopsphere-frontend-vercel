import React, { useState } from 'react';
import { Plus, Trash2, Copy, Tag, ToggleLeft, ToggleRight } from 'lucide-react';
import { coupons as initialCoupons } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: '', discount: '', type: 'Percentage', minOrder: '', usageLimit: '', expiry: '' });
  const { showNotification } = useApp();

  const handleAdd = () => {
    const newCoupon = { id: Date.now(), ...form, minOrder: Number(form.minOrder), usageLimit: Number(form.usageLimit), used: 0, status: 'Active' };
    setCoupons(c => [newCoupon, ...c]);
    setShowModal(false);
    setForm({ code: '', discount: '', type: 'Percentage', minOrder: '', usageLimit: '', expiry: '' });
    showNotification('Coupon created!');
  };

  const toggleStatus = (id) => setCoupons(cs => cs.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c));
  const deleteCoupon = (id) => setCoupons(cs => cs.filter(c => c.id !== id));
  const copyCoupon = (code) => { navigator.clipboard?.writeText(code); showNotification(`Copied: ${code}`); };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title">Coupons</h1>
          <p className="text-slate-500 mt-1">{coupons.filter(c => c.status === 'Active').length} active coupons</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary"><Plus className="w-4 h-4" /> Create Coupon</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
        {coupons.map(coupon => (
          <div key={coupon.id} className={`card p-5 border-l-4 ${coupon.status === 'Active' ? 'border-l-emerald-500' : coupon.status === 'Expired' ? 'border-l-red-400' : 'border-l-slate-300'}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary-500" />
                <span className="font-black text-slate-900 tracking-wider text-lg">{coupon.code}</span>
                <button onClick={() => copyCoupon(coupon.code)} className="p-1 text-slate-400 hover:text-primary-600 transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className={`badge ${coupon.status === 'Active' ? 'badge-success' : coupon.status === 'Expired' ? 'badge-danger' : 'badge-gray'}`}>
                {coupon.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="bg-surface-50 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-0.5">Discount</p>
                <p className="font-bold text-slate-800">{coupon.discount}</p>
              </div>
              <div className="bg-surface-50 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-0.5">Type</p>
                <p className="font-bold text-slate-800">{coupon.type}</p>
              </div>
              <div className="bg-surface-50 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-0.5">Min Order</p>
                <p className="font-bold text-slate-800">₹{coupon.minOrder}</p>
              </div>
              <div className="bg-surface-50 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-0.5">Expiry</p>
                <p className="font-bold text-slate-800 text-xs">{coupon.expiry}</p>
              </div>
            </div>

            {/* Usage bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Usage</span>
                <span>{coupon.used}/{coupon.usageLimit}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(coupon.used / coupon.usageLimit) * 100}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {coupon.status !== 'Expired' && (
                <button onClick={() => toggleStatus(coupon.id)} className={`flex items-center gap-1.5 text-sm font-semibold ${coupon.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {coupon.status === 'Active' ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  {coupon.status === 'Active' ? 'Active' : 'Inactive'}
                </button>
              )}
              <button onClick={() => deleteCoupon(coupon.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="font-bold text-slate-800 text-lg mb-5">Create Coupon</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Coupon Code</label>
                <input className="input-field uppercase" placeholder="e.g. SUMMER25" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Discount</label>
                  <input className="input-field" placeholder="20% or ₹50" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Type</label>
                  <select className="input-field" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option>Percentage</option><option>Fixed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Min Order (₹)</label>
                  <input type="number" className="input-field" placeholder="0" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Usage Limit</label>
                  <input type="number" className="input-field" placeholder="100" value={form.usageLimit} onChange={e => setForm(f => ({ ...f, usageLimit: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="label">Expiry Date</label>
                <input type="date" className="input-field" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleAdd} className="btn-primary flex-1">Create Coupon</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
