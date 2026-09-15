import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import ProductDetails from "../component/ProductDetails";
import SearchBar from "../component/SearchBar";
import api from "../axios/axios";
import type { Product } from "../types";
import { PRODUCT_CATEGORIES } from "../types";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);

    api
      .get<{ products: Product[] }>(`/products?${params.toString()}`)
      .then((res) => setProducts(res.data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [search, category, sort]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          Browse the catalog
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Shop</h1>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <SearchBar className="w-full sm:max-w-sm" />

        <div className="flex flex-wrap items-center gap-2">

          <select
            value={category}
            onChange={(e) => updateParam("category", e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          >
            <option value="">All Categories</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>

        </div>

      </div>

      {/* Active filter chips */}
      {(search || category) && (
        <div className="mb-6 flex flex-wrap gap-2 text-xs">
          {search && (
            <span className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700">
              Search: "{search}"
              <button onClick={() => updateParam("search", "")}>×</button>
            </span>
          )}
          {category && (
            <span className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700">
              {category}
              <button onClick={() => updateParam("category", "")}>×</button>
            </span>
          )}
        </div>
      )}

      {/* Products Grid */}
      {loading && (
        <p className="py-16 text-center text-sm text-gray-400">
          Loading products...
        </p>
      )}

      {!loading && products.length === 0 && (
        <p className="py-16 text-center text-sm text-gray-400">
          No products found. Try a different search or category.
        </p>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {/* Product Details Popup */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          closeDetails={() => setSelectedProduct(null)}
        />
      )}

    </main>
  );
}

export default Shop;
