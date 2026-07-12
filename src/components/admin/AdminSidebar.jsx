import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, Tag, Warehouse, ShoppingBag, Ticket,
  Star, Users, BarChart2, Cpu, Sparkles, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',        path: '/admin' },
  { icon: Package,         label: 'Products',         path: '/admin/products' },
  { icon: Tag,             label: 'Categories',       path: '/admin/categories' },
  { icon: Warehouse,       label: 'Inventory',        path: '/admin/inventory' },
  { icon: ShoppingBag,     label: 'Orders',           path: '/admin/orders' },
  { icon: Ticket,          label: 'Coupons',          path: '/admin/coupons' },
  { icon: Star,            label: 'Featured',         path: '/admin/featured' },
  { icon: Users,           label: 'Users',            path: '/admin/users' },
  { icon: BarChart2,       label: 'Analytics',        path: '/admin/analytics' },
  { icon: Cpu,             label: 'AI Analyzer',      path: '/admin/ai-analyzer' },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} shrink-0 bg-gradient-to-b from-surface-900 to-slate-900 flex flex-col transition-all duration-300 min-h-screen relative`}>
      {/* Logo */}
      <div className={`flex items-center gap-2.5 h-16 px-4 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-violet-600 rounded-xl flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {!collapsed && <span className="text-white font-bold text-lg tracking-tight">ShopSphere</span>}
      </div>

      {/* Toggle */}
      <button onClick={() => setCollapsed(p => !p)}
        className="absolute -right-3 top-[72px] w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm z-10 hover:bg-surface-50 transition-colors">
        {collapsed ? <ChevronRight className="w-3 h-3 text-slate-600" /> : <ChevronLeft className="w-3 h-3 text-slate-600" />}
      </button>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto mt-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = pathname === path;
          return (
            <Link key={path} to={path}
              className={active ? 'sidebar-link-active' : 'sidebar-link'}
              title={collapsed ? label : undefined}>
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className={`p-3 border-t border-white/10 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 mb-3 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.avatar}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">{user.name}</p>
              <p className="text-slate-400 text-xs truncate">{user.role}</p>
            </div>
          </div>
        )}
        <button onClick={logout}
          className={`sidebar-link w-full ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}>
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
