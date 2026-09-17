# 🛍️ ShopSphere AI — Intelligent Commerce Platform

A full-featured, portfolio-quality e-commerce + admin dashboard built with **React + Vite + TailwindCSS**.

## ✨ Features

- **10+ Pages** — Landing, Products, Product Details, Cart, Checkout, Login, Register, User Dashboard, and full Admin Panel
- **Admin Dashboard** with 10 modules: Products, Categories, Inventory, Orders, Coupons, Featured Products, Users, Analytics, AI Analyzer
- **AI Product Analyzer** — upload a product image and get AI-powered category, rating, quality score, and tags
- **Real-time Cart** with Context API (add, remove, update qty, coupon codes)
- **Recharts** — revenue charts, bar charts, pie charts for analytics
- **Fully Responsive** — mobile-first, works on all screen sizes
- **Dark Admin Sidebar** with collapsible navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# 1. Navigate into the project
cd shopsphere-ai

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔐 Demo Credentials

| Role  | Email                     | Password   |
|-------|---------------------------|------------|
| Admin | admin@shopsphere.com      | admin123   |
| User  | user@shopsphere.com       | user123    |

> Tip: Use the pre-fill buttons on the Login page for quick access.

## 📁 Project Structure

```
shopsphere-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── admin/          # AdminLayout, AdminSidebar, StatCard
│   │   ├── common/         # Navbar, Footer, Notification
│   │   └── product/        # ProductCard
│   ├── context/
│   │   └── AppContext.jsx  # Cart, Auth, Wishlist, Notifications
│   ├── data/
│   │   └── mockData.js     # Products, orders, users, analytics data
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── ProductListingPage.jsx
│   │   ├── ProductDetailsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── UserDashboard.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── ProductManagement.jsx
│   │       ├── CategoriesPage.jsx
│   │       ├── InventoryManagement.jsx
│   │       ├── OrdersPage.jsx
│   │       ├── CouponsManagement.jsx
│   │       ├── FeaturedProducts.jsx
│   │       ├── UsersPage.jsx
│   │       ├── AnalyticsDashboard.jsx
│   │       └── AIProductAnalyzer.jsx
│   ├── App.jsx             # Router + layout config
│   ├── main.jsx
│   └── index.css           # TailwindCSS + custom design tokens
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🛠️ Tech Stack

| Technology    | Version | Purpose              |
|---------------|---------|----------------------|
| React         | 18      | UI Framework         |
| Vite          | 5       | Build tool / Dev server |
| TailwindCSS   | 3       | Utility-first styling|
| React Router  | 6       | Client-side routing  |
| Recharts      | 2       | Data visualization   |
| Lucide React  | Latest  | Icon library         |

## 📦 Build for Production

```bash
npm run build
# Output in ./dist
```

## 🗺️ Routes

| Path                    | Page                    |
|-------------------------|-------------------------|
| `/`                     | Landing Page            |
| `/products`             | Product Listing         |
| `/products/:id`         | Product Details         |
| `/cart`                 | Shopping Cart           |
| `/checkout`             | Checkout (3 steps)      |
| `/login`                | Login                   |
| `/register`             | Register                |
| `/dashboard`            | User Dashboard          |
| `/admin`                | Admin Dashboard         |
| `/admin/products`       | Product Management      |
| `/admin/categories`     | Categories              |
| `/admin/inventory`      | Inventory Management    |
| `/admin/orders`         | Orders                  |
| `/admin/coupons`        | Coupons Management      |
| `/admin/featured`       | Featured Products       |
| `/admin/users`          | Users                   |
| `/admin/analytics`      | Analytics Dashboard     |
| `/admin/ai-analyzer`    | AI Product Analyzer     |

## 🎨 Design System

- **Primary**: Indigo (#6366f1) — actions, links, highlights
- **Accent**: Orange (#f97316) — badges, discounts
- **Surface**: Slate greys — backgrounds, borders
- **Typography**: Inter (Google Fonts)
- **Radius**: xl/2xl/3xl throughout
- **Shadows**: `card` and `card-hover` utility classes

---

Built with ❤️ for internship/placement portfolios. MIT License.
