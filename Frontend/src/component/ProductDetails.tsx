interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductDetailsProps {
  product: Product;
  closeDetails: () => void;
}

function ProductDetails({
  product,
  closeDetails,
}: ProductDetailsProps) {
  return (
    /* Background */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      {/* Floating Window */}
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Close Button */}
        <button
          onClick={closeDetails}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-md hover:bg-gray-100"
        >
          ×
        </button>

        {/* Product Content */}
        <div className="grid md:grid-cols-2">

          {/* Product Image */}
          <div className="flex min-h-[350px] items-center justify-center bg-gray-100 p-6 md:min-h-[500px]">

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[450px] w-full rounded-2xl object-contain"
            />

          </div>


          {/* Product Information */}
          <div className="p-6 sm:p-8">

            {/* Category */}
            <p className="text-sm font-semibold text-blue-600">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="mt-2 text-3xl font-bold">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">

              <span className="text-yellow-500">
                ★★★★★
              </span>

              <span className="text-sm text-gray-500">
                4.8 (24 reviews)
              </span>

            </div>

            {/* Price */}
            <p className="mt-6 text-3xl font-bold">
              Rs. {product.price}
            </p>

            {/* Description */}
            <div className="mt-6">

              <h2 className="text-lg font-bold">
                Product Description
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {product.description}
              </p>

            </div>


            {/* Product Information */}
            <div className="mt-6 border-y border-gray-200 py-5">

              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-500">
                  Material
                </span>

                <span className="font-medium">
                  PLA
                </span>
              </div>

              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-500">
                  Availability
                </span>

                <span className="font-medium text-green-600">
                  In Stock
                </span>
              </div>

              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-medium">
                  2-4 Days
                </span>
              </div>

            </div>


            {/* Quantity */}
            <div className="mt-6">

              <p className="mb-2 text-sm font-medium">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-lg border border-gray-200">

                <button className="px-4 py-2 text-lg hover:bg-gray-100">
                  -
                </button>

                <span className="px-4">
                  1
                </span>

                <button className="px-4 py-2 text-lg hover:bg-gray-100">
                  +
                </button>

              </div>

            </div>


            {/* Buttons */}
            <div className="mt-7 flex gap-3">

              <button className="flex-1 rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800">
                Add to Cart
              </button>

              <button className="rounded-xl border border-gray-300 px-5 text-xl hover:bg-gray-100">
                ♡
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;