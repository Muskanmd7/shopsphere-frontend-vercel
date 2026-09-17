import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { categories as initialCategories } from '../../data/mockData';

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', icon: '', count: 0 });

  const handleAdd = () => {
    setCategories(c => [...c, { ...form, id: Date.now(), count: Number(form.count), color: 'bg-slate-100 text-slate-700' }]);
    setShowModal(false);
    setForm({ name: '', icon: '', count: 0 });
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Categories</h1>
          <p className="text-slate-500 mt-1">{categories.length} categories</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary"><Plus className="w-4 h-4" /> Add Category</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(cat => (
          <div key={cat.id} className="card-hover p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center text-2xl`}>{cat.icon}</div>
              <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => setCategories(c => c.filter(x => x.id !== cat.id))}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-bold text-slate-800">{cat.name}</h3>
            <p className="text-slate-500 text-sm mt-0.5">{cat.count} products</p>
            <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-violet-500 rounded-full" style={{ width: `${Math.min(100, (cat.count / 250) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="font-bold text-slate-800 text-lg mb-5">Add Category</h2>
            <div className="space-y-4">
              <div><label className="label">Name</label><input className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Category name" /></div>
              <div><label className="label">Icon (emoji)</label><input className="input-field" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="e.g. 🎮" /></div>
              <div><label className="label">Initial Count</label><input type="number" className="input-field" value={form.count} onChange={e => setForm(f => ({ ...f, count: e.target.value }))} /></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleAdd} className="btn-primary flex-1">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
