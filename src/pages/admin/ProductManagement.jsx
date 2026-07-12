import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Star, Package } from 'lucide-react';
import { products as initialProducts } from '../../data/mockData';

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category: '', stock: '', description: '' });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm({ name: '', price: '', category: '', stock: '', description: '' }); setEditProduct(null); setShowModal(true); };
  const openEdit = (p) => { setForm({ name: p.name, price: p.price, category: p.category, stock: p.stock, description: p.description }); setEditProduct(p); setShowModal(true); };
  const handleDelete = (id) => setProducts(ps => ps.filter(p => p.id !== id));
  const handleSave = () => {
    if (editProduct) {
      setProducts(ps => ps.map(p => p.id === editProduct.id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p));
    } else {
      const newP = { ...form, id: Date.now(), price: Number(form.price), stock: Number(form.stock), rating: 0, reviews: 0, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', tags: [], featured: false, originalPrice: null, sold: 0, sku: `NEW-${Date.now()}` };
      setProducts(ps => [newP, ...ps]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title">Products</h1>
          <p className="text-slate-500 mt-1">{products.length} total products</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><Plus className="w-4 h-4" /> Add Product</button>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="input-field pl-9 text-sm" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50">
              <tr>
                {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-xl shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell"><span className="badge badge-info">{p.category}</span></td>
                  <td className="table-cell font-semibold text-slate-800">₹{p.price}</td>
                  <td className="table-cell">
                    <span className={`badge ${p.stock > 10 ? 'badge-success' : p.stock > 0 ? 'badge-warning' : 'badge-danger'}`}>{p.stock}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-medium text-slate-700">{p.rating}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${p.stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                      {p.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex gap-1.5">
                      <button onClick={() => openEdit(p)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="font-bold text-slate-800 text-lg mb-5">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <div className="space-y-4">
              {[['name','Product Name'],['price','Price (₹)'],['category','Category'],['stock','Stock']].map(([key,label]) => (
                <div key={key}>
                  <label className="label">{label}</label>
                  <input className="input-field" value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={label} />
                </div>
              ))}
              <div>
                <label className="label">Description</label>
                <textarea className="input-field resize-none h-20" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Product description…" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSave} className="btn-primary flex-1">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
