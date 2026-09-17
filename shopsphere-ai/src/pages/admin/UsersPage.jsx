import React, { useState } from 'react';
import { Search, Shield, User as UserIcon } from 'lucide-react';
import { users } from '../../data/mockData';

export default function UsersPage() {
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="page-header">
        <h1 className="section-title">Users</h1>
        <p className="text-slate-500 mt-1">{users.length} registered users</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-4">
          <p className="text-2xl font-black text-slate-900">{users.length}</p>
          <p className="text-sm text-slate-500">Total Users</p>
        </div>
        <div className="card p-4">
          <p className="text-2xl font-black text-emerald-600">{users.filter(u => u.status === 'Active').length}</p>
          <p className="text-sm text-slate-500">Active</p>
        </div>
        <div className="card p-4">
          <p className="text-2xl font-black text-primary-600">{users.filter(u => u.role === 'Admin').length}</p>
          <p className="text-sm text-slate-500">Admins</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="input-field pl-9 text-sm" placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50">
              <tr>{['User', 'Role', 'Orders', 'Total Spent', 'Joined', 'Status'].map(h => <th key={h} className="table-header">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-violet-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{u.name}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${u.role === 'Admin' ? 'badge-purple' : 'badge-gray'} flex items-center gap-1 w-fit`}>
                      {u.role === 'Admin' ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="table-cell font-semibold text-slate-700">{u.orders}</td>
                  <td className="table-cell font-semibold text-slate-800">₹{u.spent.toLocaleString()}</td>
                  <td className="table-cell text-slate-400 text-sm">{u.joined}</td>
                  <td className="table-cell">
                    <span className={`badge ${u.status === 'Active' ? 'badge-success' : 'badge-gray'}`}>{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
