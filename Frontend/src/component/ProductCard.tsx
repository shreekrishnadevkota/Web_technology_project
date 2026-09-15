import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../axios/axios";
import type { Product } from "../types";
import { PLACEHOLDER_IMAGE, sellerDisplayName } from "../types";
import { UserIcon, CartIcon } from "./Icons";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    // Don't trigger the card's onClick (open details) when clicking Add
    e.stopPropagation();

    try {
      setAdding(true);
      await api.post("/cart/items", { productId: product._id, quantity: 1 });
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
    <div
      onClick={onClick}
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${
        onClick ? "cursor-pointer" : ""
      }`}
    >

      {/* Product Image */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image || PLACEHOLDER_IMAGE}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-1 font-semibold line-clamp-1">
          {product.name}
        </h3>

        {/* Uploaded by — seller name */}
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
          <UserIcon className="h-3.5 w-3.5" />
          {sellerDisplayName(product.seller)}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold">
            Rs. {product.price}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="flex items-center gap-1 rounded-lg bg-black px-3 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-60"
          >
            <CartIcon className="h-4 w-4" />
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;
