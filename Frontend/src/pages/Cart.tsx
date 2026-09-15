import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../axios/axios";
import type { Cart as CartType } from "../types";
import { PLACEHOLDER_IMAGE } from "../types";
import { PlusIcon, MinusIcon, TrashIcon, CartIcon } from "../component/Icons";

function Cart() {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  // Checkout form
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const loadCart = () => {
    setLoading(true);
    api
      .get<{ cart: CartType }>("/cart")
      .then((res) => setCart(res.data.cart))
      .catch((err: unknown) => {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setNotLoggedIn(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      const res = await api.put<{ cart: CartType }>(`/cart/items/${itemId}`, {
        quantity,
      });
      setCart(res.data.cart);
    } catch {
      setError("Failed to update quantity");
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await api.delete<{ cart: CartType }>(`/cart/items/${itemId}`);
      setCart(res.data.cart);
    } catch {
      setError("Failed to remove item");
    }
  };

  const items = cart?.items || [];

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.trim() || !contactPhone.trim()) {
      setError("Please fill in your shipping address and phone number.");
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");

      // This moves the cart's contents into a new order under the
      // buyer's profile (Cash on Delivery — no payment gateway).
      await api.post("/orders", { shippingAddress, contactPhone });

      setOrderSuccess(true);
      setShowCheckout(false);
      loadCart(); // cart is now empty on the backend
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to place order.");
      }
    } finally {
      setPlacingOrder(false);
    }
  };

  if (notLoggedIn) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <h1 className="text-2xl font-bold">Please log in</h1>
        <p className="text-gray-500">Log in to view your cart.</p>
        <Link
          to="/auth"
          className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  if (orderSuccess) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <h1 className="text-2xl font-bold">Order Placed!</h1>
        <p className="max-w-md text-gray-500">
          Your order has been placed as Cash on Delivery. You can track it in
          your profile's order history.
        </p>
        <div className="flex gap-3">
          <Link
            to="/profile"
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            View My Orders
          </Link>
          <Link
            to="/shop"
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold hover:bg-gray-100"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">

      <h1 className="mb-8 flex items-center gap-2 text-2xl font-bold sm:text-3xl">
        <CartIcon className="h-6 w-6" /> Your Cart
      </h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && <p className="text-sm text-gray-400">Loading your cart...</p>}

      {!loading && items.length === 0 && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Browse Products
          </Link>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid gap-8 md:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 md:col-span-2">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
              >
                <img
                  src={item.product.image || PLACEHOLDER_IMAGE}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Rs. {item.product.price}
                  </p>

                  <div className="mt-2 flex w-fit items-center rounded-lg border border-gray-200">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center hover:bg-gray-100"
                    >
                      <MinusIcon className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center hover:bg-gray-100"
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    Rs. {item.product.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="mt-3 flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                  >
                    <TrashIcon className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Order Summary</h2>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>Rs. {total}</span>
            </div>

            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Delivery</span>
              <span>Cash on Delivery</span>
            </div>

            <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 font-bold">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>

            {!showCheckout ? (
              <button
                onClick={() => setShowCheckout(true)}
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Buy Now
              </button>
            ) : (
              <form onSubmit={handlePlaceOrder} className="mt-6 space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Shipping Address
                  </label>
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    rows={2}
                    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={placingOrder}
                  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {placingOrder ? "Placing Order..." : "Confirm Order (COD)"}
                </button>
              </form>
            )}
          </div>

        </div>
      )}

    </main>
  );
}

export default Cart;
