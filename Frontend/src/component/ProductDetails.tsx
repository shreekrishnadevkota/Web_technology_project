import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../axios/axios";
import type { Product } from "../types";
import { PLACEHOLDER_IMAGE, sellerDisplayName } from "../types";
import { CloseIcon, StarIcon, HeartIcon, UserIcon, PlusIcon, MinusIcon } from "./Icons";

interface ProductDetailsProps {
  product: Product;
  closeDetails: () => void;
}

function ProductDetails({
  product,
  closeDetails,
}: ProductDetailsProps) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await api.post("/cart/items", { productId: product._id, quantity });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        navigate("/auth");
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    /* Background */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      {/* Floating Window */}
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Close Button */}
        <button
          onClick={closeDetails}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Product Content */}
        <div className="grid md:grid-cols-2">

          {/* Product Image */}
          <div className="flex min-h-[350px] items-center justify-center bg-gray-100 p-6 md:min-h-[500px]">

            <img
              src={product.image || PLACEHOLDER_IMAGE}
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

            {/* Uploaded by */}
            <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
              <UserIcon className="h-4 w-4" />
              Sold by <span className="font-medium text-gray-700">{sellerDisplayName(product.seller)}</span>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
              <span className="ml-1 text-sm text-gray-500">New listing</span>
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
                  Type
                </span>

                <span className="font-medium">
                  {product.type === "raw_material" ? "Raw Material" : "Finished Product"}
                </span>
              </div>

              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-500">
                  Availability
                </span>

                <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
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

                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center hover:bg-gray-100"
                >
                  <MinusIcon className="h-3.5 w-3.5" />
                </button>

                <span className="px-4">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center hover:bg-gray-100"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                </button>

              </div>

            </div>


            {/* Buttons */}
            <div className="mt-7 flex gap-3">

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
              >
                {added ? "Added to Cart" : adding ? "Adding..." : "Add to Cart"}
              </button>

              <button
                onClick={() => setLiked((v) => !v)}
                aria-label="Save to wishlist"
                className="rounded-xl border border-gray-300 px-5 text-gray-700 hover:bg-gray-100"
              >
                <HeartIcon className="h-5 w-5" filled={liked} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
