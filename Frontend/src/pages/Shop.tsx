import { useState } from "react";
import ProductCard from "../component/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const products: Product[] = [
    {
      id: 1,
      name: "Modern Table Lamp",
      price: 1200,
      category: "Home Decoration",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    },
    {
      id: 2,
      name: "Custom Phone Stand",
      price: 500,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
    {
      id: 3,
      name: "Miniature Statue",
      price: 1500,
      category: "Miniatures",
      image:
        "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342",
    },
    {
      id: 4,
      name: "Creative Flower Pot",
      price: 800,
      category: "Home Decoration",
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    },
    {
      id: 5,
      name: "Desk Organizer",
      price: 950,
      category: "Office",
      image:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
    },
    {
      id: 6,
      name: "Gaming Controller Stand",
      price: 1400,
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    },
    {
      id: 7,
      name: "Custom Keychain",
      price: 250,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    },
    {
      id: 8,
      name: "Headphone Stand",
      price: 1100,
      category: "Office",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 9,
      name: "3D Printed Figure",
      price: 2000,
      category: "Miniatures",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    },
    {
      id: 10,
      name: "Custom Name Plate",
      price: 1000,
      category: "Custom",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
    {
      id: 11,
      name: "Cable Organizer",
      price: 350,
      category: "Office",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766",
    },
    {
      id: 12,
      name: "Creative Plant Pot",
      price: 700,
      category: "Home Decoration",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    },
  ];

  const categories = [
    "All",
    "Home Decoration",
    "Accessories",
    "Miniatures",
    "Office",
    "Gaming",
    "Custom",
  ];

  // Filter products
  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sort === "low-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "name") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <section className="border-b bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Our Collection
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Explore Our Products
          </h1>

          <p className="mt-3 max-w-xl text-gray-500">
            Discover creative, useful and unique products made with
            modern 3D printing technology.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="mx-auto max-w-6xl px-4 py-10">

        {/* Search and Sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

         

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
          >
            <option value="default">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>

        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <p className="mb-6 text-sm text-gray-500">
          Showing {filteredProducts.length} products
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          /* No Product Found */
          <div className="rounded-xl bg-white py-16 text-center">
            <h2 className="text-xl font-semibold">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or category.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}

export default Shop;