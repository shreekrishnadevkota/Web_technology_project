function Orders() {
  const orders = [
    {
      id: "ORD-001",
      product: "Dragon Figurine",
      image: "/dragon.jpg",
      quantity: 1,
      price: 1200,
      status: "Delivered",
      date: "September 5, 2026",
    },
    {
      id: "ORD-002",
      product: "Modern Lamp",
      image: "/lamp.jpg",
      quantity: 1,
      price: 1500,
      status: "Processing",
      date: "September 6, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

      {/* Heading */}
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Check your recent orders and their status.
        </p>
      </div>


      {/* Orders */}
      <div className="mx-auto mt-8 max-w-6xl space-y-5">

        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl bg-white p-4 shadow-sm sm:p-6"
          >

            {/* Order Header */}
            <div className="flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row">

              <div>
                <p className="font-semibold text-gray-900">
                  Order {order.id}
                </p>

                <p className="text-sm text-gray-500">
                  {order.date}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-4 py-1 text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>

            </div>


            {/* Product */}
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">

              <img
                src={order.image}
                alt={order.product}
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">
                  {order.product}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {order.quantity}
                </p>

                <p className="mt-1 font-semibold">
                  Rs. {order.price}
                </p>
              </div>

              <button
                className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-100"
              >
                View Details
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Orders;