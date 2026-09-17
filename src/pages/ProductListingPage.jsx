import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import api from "../services/api";
import { getCategoryByName } from "../services/categoryService";
import { getFriendlyErrorMessage } from "../utils/errorMessage";

export default function ProductListingPage() {

    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get("category") || "";

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const [categoryInfo, setCategoryInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Keep the search box in sync if the user navigates here via the navbar search
        setSearch(searchParams.get("q") || "");
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryParam]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {

            const response = await api.get("/products");

            const formattedProducts = response.data.map(product => ({
                id: product.productId,
                name: product.productName,
                description: product.productDescription,
                price: product.productPrice,
                stock: product.productQuantity,
                category: product.productCategory?.name,
                categoryId: product.productCategory?.id ?? product.productCategory?.categoryId,
                rating: product.productRating,
                image: product.imageUrl
            }));

            setProducts(formattedProducts);

            if (categoryParam) {
                try {
                    const catResponse = await getCategoryByName(categoryParam);
                    setCategoryInfo(catResponse.data);
                } catch (catErr) {
                    // Category lookup failed (e.g. not found) - fall back to
                    // matching products by the name in the URL instead.
                    setCategoryInfo(null);
                }
            } else {
                setCategoryInfo(null);
            }

        } catch (error) {

            console.error(error);
            setError(getFriendlyErrorMessage(error, "We couldn't load products right now."));

        } finally {
            setLoading(false);
        }

    };

    const filteredProducts = useMemo(() => {
        let list = products;

        if (categoryParam) {
            const targetName = (categoryInfo?.name || categoryParam).toLowerCase();
            const targetId = categoryInfo?.id ?? categoryInfo?.categoryId;
            list = list.filter(p =>
                (targetId != null && p.categoryId === targetId) ||
                (p.category || '').toLowerCase() === targetName
            );
        }

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            list = list.filter(p =>
                p.name?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            );
        }

        return list;
    }, [products, categoryParam, categoryInfo, search]);

    const heading = categoryParam ? (categoryInfo?.name || categoryParam) : 'All Products';

  return (
<div className="bg-surface-50 min-h-screen">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

    <div className="mb-8 text-center sm:text-left">
        <p className="section-eyebrow">Collection</p>
        <h1 className="section-title">
            {heading}
        </h1>

        {categoryParam && (
            <Link to="/products" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 mt-1.5">
                <X className="w-3 h-3" /> Clear category filter
            </Link>
        )}

        <p className="text-surface-300 mt-1.5 text-sm">
            {loading ? 'Loading products…' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} found`}
        </p>
    </div>

    <div className="flex flex-col gap-8">

        <div className="flex flex-wrap gap-3 mb-2">

            <div className="relative flex-1 min-w-48">

                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />

                <input
                    type="text"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="input-field pl-10"
                />

            </div>

            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-surface-200 rounded-2xl text-sm font-semibold text-surface-800 hover:bg-primary-50 transition-colors">
                <SlidersHorizontal className="w-4 h-4 text-primary-400" /> Filters
            </button>

        </div>

        {/* Main */}
        {loading ? (

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-surface-100 rounded-3xl h-80 animate-pulse" />
                ))}
            </div>

        ) : error ? (

            <div className="card p-16 text-center">
                <p className="text-5xl mb-4">⚠️</p>
                <h3 className="font-display font-semibold text-surface-800 text-lg mb-1">
                    Something went wrong
                </h3>
                <p className="text-surface-300 text-sm mb-4">{error}</p>
                <button onClick={fetchProducts} className="btn-primary">
                    Try Again
                </button>
            </div>

        ) : filteredProducts.length === 0 ? (

            <div className="card p-16 text-center">

                <p className="text-5xl mb-4">🌸</p>

                <h3 className="font-display font-semibold text-surface-800 text-lg mb-1">
                    {categoryParam ? `No products found in ${heading}` : 'No products found'}
                </h3>
                <p className="text-surface-300 text-sm">Try browsing a different category.</p>

            </div>

        ) : (

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

                {filteredProducts.map(product => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        )}

    </div>

</div>
</div>

);
}
