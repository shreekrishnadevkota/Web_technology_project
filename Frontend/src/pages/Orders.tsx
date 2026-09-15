import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios/axios";
import type { Order } from "../types";
import { PLACEHOLDER_IMAGE } from "../types";
import { PackageIcon } from "../component/Icons";

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-50 text-yellow-700",
  processing: "bg-blue-50 text-blue-700",
  shipped: "bg-indigo-50 text-indigo-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ orders: Order[] }>("/orders/mine")
      .then((res) => setOrders(res.data.orders))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="mb-8 text-2xl font-bold sm:text-3xl">My Orders</h1>

      {loading && <p className="text-sm text-gray-400">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Browse Products
          </Link>
        </div>
      )}

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order._id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <p className="text-xs text-gray-400">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {order.items.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={item.image || PLACEHOLDER_IMAGE}
                    alt={item.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      Qty {item.quantity} × Rs. {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
              <span className="text-gray-500">
                Cash on Delivery • {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
              </span>
              <span className="font-bold">Total: Rs. {order.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>

      {!loading && orders.length === 0 && (
        <div className="mt-10 flex justify-center text-gray-300">
          <PackageIcon className="h-16 w-16" />
        </div>
      )}
    </main>
  );
}

export default Orders;
