import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import api from "../services/api";

export default function ProductListingPage() {

    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState(searchParams.get("q") || "");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const response = await api.get("/products");
            console.log(response.data);

            const formattedProducts = response.data.map(product => ({
                id: product.productId,
                name: product.productName,
                description: product.productDescription,
                price: product.productPrice,
                stock: product.productQuantity,
                category: product.productCategory.name,
                rating: product.productRating,
                image: product.imageUrl
            }));

            setProducts(formattedProducts);
            console.log(formattedProducts);

        } catch (error) {

            console.error(error);

        }

    };

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

    <div className="mb-8">
        <h1 className="section-title">
            All Products
        </h1>

        <p className="text-slate-500 mt-1">
            {products.length} products found
        </p>
    </div>

    <div className="flex flex-col gap-8">

        <div className="flex flex-wrap gap-3 mb-6">

            <div className="relative flex-1 min-w-48">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                    type="text"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="input-field pl-9"
                />

            </div>

        </div>

        {/* Main */}
                {products.length === 0 ? (

            <div className="card p-16 text-center">

                <p className="text-5xl mb-4">🔍</p>

                <h3 className="font-semibold text-slate-700 text-lg mb-1">
                    No products found
                </h3>

            </div>

        ) : (

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

                {products.map(product => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        )}

    </div>

</div>

);
}