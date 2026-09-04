import CategoryCart from "../component/CategoryCart";
import ProductCard from "../component/ProductCard";

function Categories() {
  const products = [
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
  ];

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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </main>
  );
}

export default Categories;