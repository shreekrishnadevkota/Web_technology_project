import { useEffect, useState } from "react";
import CategoryCart from "../component/CategoryCart";
import ProductCard from "../component/ProductCard";
import ProductDetails from "../component/ProductDetails";
import api from "../axios/axios";
import type { Product } from "../types";

function Categories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    api
      .get<{ products: Product[] }>("/products?sort=newest&limit=8")
      .then((res) => setProducts(res.data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Explore Categories
          </h1>

          <p className="mt-3 text-gray-500">
            Discover our collection of unique 3D printed products.
          </p>
        </div>

        <CategoryCart/>

        {/* Product Grid */}
        {loading && (
          <p className="py-10 text-center text-sm text-gray-400">Loading products...</p>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}

        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            closeDetails={() => setSelectedProduct(null)}
          />
        )}

      </div>
    </main>
  );
}

export default Categories;
