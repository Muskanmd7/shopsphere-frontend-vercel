export const products = [
  { id: 1, name: 'Pro Wireless Headphones', price: 299, originalPrice: 399, category: 'Electronics', rating: 4.8, reviews: 1243, stock: 45, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', tags: ['wireless', 'audio', 'pro'], featured: true, description: 'Immersive sound with 40hr battery life and active noise cancellation. Premium build quality for audiophiles and professionals alike.', sku: 'ELEC-001', sold: 892 },
  { id: 2, name: 'Minimal Desk Lamp', price: 89, originalPrice: 119, category: 'Home & Living', rating: 4.6, reviews: 567, stock: 120, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', tags: ['lighting', 'minimal', 'desk'], featured: false, description: 'Architect-style LED lamp with stepless dimming and 3 color temperatures. Perfect for home offices.', sku: 'HOME-002', sold: 430 },
  { id: 3, name: 'Smart Watch Series X', price: 449, originalPrice: 549, category: 'Electronics', rating: 4.9, reviews: 2891, stock: 8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', tags: ['smartwatch', 'fitness', 'health'], featured: true, description: 'Health monitoring, GPS, and a brilliant always-on display in a slim titanium case.', sku: 'ELEC-003', sold: 1567 },
  { id: 4, name: 'Canvas Tote Bag', price: 39, originalPrice: 55, category: 'Fashion', rating: 4.5, reviews: 389, stock: 200, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80', tags: ['bag', 'eco', 'canvas'], featured: false, description: 'Organic cotton canvas with reinforced handles. Ethically made and endlessly versatile.', sku: 'FASH-004', sold: 267 },
  { id: 5, name: 'Mechanical Keyboard', price: 189, originalPrice: 229, category: 'Electronics', rating: 4.7, reviews: 934, stock: 32, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80', tags: ['keyboard', 'mechanical', 'gaming'], featured: true, description: 'TKL layout with hot-swappable switches, per-key RGB, and aluminum chassis.', sku: 'ELEC-005', sold: 711 },
  { id: 6, name: 'Yoga Mat Pro', price: 79, originalPrice: 99, category: 'Sports', rating: 4.8, reviews: 712, stock: 88, image: 'https://images.unsplash.com/photo-1601925228856-2a5b13264fa5?w=400&q=80', tags: ['yoga', 'fitness', 'mat'], featured: false, description: 'Non-slip cork surface with alignment lines. 6mm thick for joint protection and comfort.', sku: 'SPRT-006', sold: 534 },
  { id: 7, name: 'Ceramic Pour-Over Set', price: 65, originalPrice: 85, category: 'Home & Living', rating: 4.6, reviews: 423, stock: 55, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', tags: ['coffee', 'ceramic', 'kitchen'], featured: false, description: 'Handcrafted ceramic dripper with server and filters. Elevate your morning ritual.', sku: 'HOME-007', sold: 312 },
  { id: 8, name: 'Running Shoes Lite', price: 139, originalPrice: 179, category: 'Sports', rating: 4.7, reviews: 1567, stock: 3, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', tags: ['shoes', 'running', 'sports'], featured: true, description: 'Lightweight foam midsole with breathable mesh upper. Built for everyday runners.', sku: 'SPRT-008', sold: 1203 },
];

export const categories = [
  { id: 1, name: 'Electronics', count: 142, icon: '💻', color: 'bg-blue-100 text-blue-700' },
  { id: 2, name: 'Fashion', count: 89, icon: '👗', color: 'bg-pink-100 text-pink-700' },
  { id: 3, name: 'Home & Living', count: 67, icon: '🏠', color: 'bg-amber-100 text-amber-700' },
  { id: 4, name: 'Sports', count: 54, icon: '⚽', color: 'bg-emerald-100 text-emerald-700' },
  { id: 5, name: 'Books', count: 231, icon: '📚', color: 'bg-violet-100 text-violet-700' },
  { id: 6, name: 'Beauty', count: 78, icon: '✨', color: 'bg-rose-100 text-rose-700' },
];

export const orders = [
  { id: 'ORD-8821', customer: 'Aarav Sharma', email: 'aarav@email.com', product: 'Pro Wireless Headphones', amount: 299, status: 'Delivered', date: '2025-06-10', items: 1 },
  { id: 'ORD-8820', customer: 'Priya Mehta', email: 'priya@email.com', product: 'Smart Watch Series X', amount: 898, status: 'Processing', date: '2025-06-11', items: 2 },
  { id: 'ORD-8819', customer: 'Rohan Verma', email: 'rohan@email.com', product: 'Mechanical Keyboard', amount: 189, status: 'Shipped', date: '2025-06-11', items: 1 },
  { id: 'ORD-8818', customer: 'Sneha Patel', email: 'sneha@email.com', product: 'Yoga Mat Pro', amount: 79, status: 'Delivered', date: '2025-06-09', items: 1 },
  { id: 'ORD-8817', customer: 'Kiran Nair', email: 'kiran@email.com', product: 'Running Shoes Lite', amount: 278, status: 'Cancelled', date: '2025-06-08', items: 2 },
  { id: 'ORD-8816', customer: 'Ananya Singh', email: 'ananya@email.com', product: 'Canvas Tote Bag', amount: 39, status: 'Delivered', date: '2025-06-08', items: 1 },
  { id: 'ORD-8815', customer: 'Dev Kapoor', email: 'dev@email.com', product: 'Ceramic Pour-Over Set', amount: 65, status: 'Processing', date: '2025-06-12', items: 1 },
];

export const users = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@email.com', role: 'Customer', orders: 12, spent: 2340, joined: '2024-01-15', status: 'Active', avatar: 'AS' },
  { id: 2, name: 'Priya Mehta', email: 'priya@email.com', role: 'Customer', orders: 8, spent: 1890, joined: '2024-02-20', status: 'Active', avatar: 'PM' },
  { id: 3, name: 'Rohan Verma', email: 'rohan@email.com', role: 'Admin', orders: 3, spent: 560, joined: '2023-11-05', status: 'Active', avatar: 'RV' },
  { id: 4, name: 'Sneha Patel', email: 'sneha@email.com', role: 'Customer', orders: 19, spent: 4120, joined: '2023-09-10', status: 'Active', avatar: 'SP' },
  { id: 5, name: 'Kiran Nair', email: 'kiran@email.com', role: 'Customer', orders: 2, spent: 218, joined: '2025-01-30', status: 'Inactive', avatar: 'KN' },
];

export const coupons = [
  { id: 1, code: 'WELCOME20', discount: '20%', type: 'Percentage', minOrder: 500, usageLimit: 100, used: 67, expiry: '2025-08-31', status: 'Active' },
  { id: 2, code: 'SAVE50', discount: '₹50', type: 'Fixed', minOrder: 300, usageLimit: 200, used: 189, expiry: '2025-07-15', status: 'Active' },
  { id: 3, code: 'FLASH30', discount: '30%', type: 'Percentage', minOrder: 1000, usageLimit: 50, used: 50, expiry: '2025-05-30', status: 'Expired' },
  { id: 4, code: 'NEWUSER15', discount: '15%', type: 'Percentage', minOrder: 0, usageLimit: 500, used: 312, expiry: '2025-12-31', status: 'Active' },
];

export const revenueData = [
  { month: 'Jan', revenue: 42000, orders: 145 },
  { month: 'Feb', revenue: 51000, orders: 178 },
  { month: 'Mar', revenue: 47000, orders: 162 },
  { month: 'Apr', revenue: 63000, orders: 221 },
  { month: 'May', revenue: 78000, orders: 267 },
  { month: 'Jun', revenue: 91000, orders: 312 },
];

export const inventoryData = [
  { id: 1, product: 'Pro Wireless Headphones', sku: 'ELEC-001', stock: 45, reorderPoint: 20, status: 'In Stock', warehouse: 'WH-A', lastUpdated: '2025-06-10' },
  { id: 2, product: 'Smart Watch Series X', sku: 'ELEC-003', stock: 8, reorderPoint: 15, status: 'Low Stock', warehouse: 'WH-A', lastUpdated: '2025-06-11' },
  { id: 3, product: 'Running Shoes Lite', sku: 'SPRT-008', stock: 3, reorderPoint: 20, status: 'Critical', warehouse: 'WH-B', lastUpdated: '2025-06-12' },
  { id: 4, product: 'Mechanical Keyboard', sku: 'ELEC-005', stock: 32, reorderPoint: 10, status: 'In Stock', warehouse: 'WH-A', lastUpdated: '2025-06-09' },
  { id: 5, product: 'Canvas Tote Bag', sku: 'FASH-004', stock: 200, reorderPoint: 50, status: 'In Stock', warehouse: 'WH-C', lastUpdated: '2025-06-08' },
  { id: 6, product: 'Yoga Mat Pro', sku: 'SPRT-006', stock: 88, reorderPoint: 30, status: 'In Stock', warehouse: 'WH-B', lastUpdated: '2025-06-10' },
];

export const categoryData = [
  { name: 'Electronics', value: 142, fill: '#6366f1' },
  { name: 'Fashion', value: 89, fill: '#f97316' },
  { name: 'Home & Living', value: 67, fill: '#10b981' },
  { name: 'Sports', value: 54, fill: '#f59e0b' },
  { name: 'Books', value: 231, fill: '#8b5cf6' },
  { name: 'Beauty', value: 78, fill: '#ec4899' },
];
