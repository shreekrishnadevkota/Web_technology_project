interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      
      {/* Product Image */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-1 font-semibold">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold">
            Rs. {product.price}
          </span>

          <button className="rounded-lg bg-black px-3 py-2 text-sm text-white hover:bg-gray-800">
            Add
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;