import { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Custom Printed T-Shirt",
      price: 1200,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Personalized Mug",
      price: 650,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
  ]);

  // Increase quantity
  const increaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove product
  const removeItem = (id: number) => {
    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );
  };

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your items before checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some products to your cart.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">

            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >

                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />

                  {/* Product Information */}
                  <div className="flex-1">
                    <h2 className="font-semibold">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-gray-500">
                      Rs. {item.price}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-md border"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-md border"
                    >
                      +
                    </button>

                  </div>

                  {/* Price */}
                  <div className="font-semibold">
                    Rs. {item.price * item.quantity}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-3">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    Rs. {total}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>

                  <span>Free</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>

                    <span>
                      Rs. {total}
                    </span>
                  </div>
                </div>

              </div>

              {/* Checkout Button */}
              <button className="mt-6 w-full rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800">
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;