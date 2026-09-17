import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../axios/axios";
import type { Order, Product, CustomOrder } from "../types";
import { PLACEHOLDER_IMAGE, PRODUCT_CATEGORIES, sellerDisplayName } from "../types";
import { EditIcon, TrashIcon, PackageIcon } from "../component/Icons";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: "buyer" | "seller";
}

interface UserResponse {
  user: User;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Buyer data
  const [orders, setOrders] = useState<Order[]>([]);
  const [myCustomOrders, setMyCustomOrders] = useState<CustomOrder[]>([]);

  // Seller data
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [receivedCustomOrders, setReceivedCustomOrders] = useState<CustomOrder[]>([]);
  const [sellerOrders, setSellerOrders] = useState<Order[]>([]);

  useEffect(() => {
    api
      .get<UserResponse>("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Unable to load profile.");
        } else {
          setError("An unexpected error occurred.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loadMyProducts = () => {
    api
      .get<{ products: Product[] }>("/products/mine")
      .then((res) => setMyProducts(res.data.products))
      .catch(() => setMyProducts([]));
  };

  const loadReceivedCustomOrders = () => {
    api
      .get<{ customOrders: CustomOrder[] }>("/custom-orders/seller")
      .then((res) => setReceivedCustomOrders(res.data.customOrders))
      .catch(() => setReceivedCustomOrders([]));
  };

  // Orders placed by buyers that contain this seller's products
  const loadSellerOrders = () => {
    api
      .get<{ orders: Order[] }>("/orders/seller")
      .then((res) => setSellerOrders(res.data.orders))
      .catch(() => setSellerOrders([]));
  };

  // Load buyer + seller data once we know who's logged in
  useEffect(() => {
    if (!user) return;

    api
      .get<{ orders: Order[] }>("/orders/mine")
      .then((res) => setOrders(res.data.orders))
      .catch(() => setOrders([]));

    api
      .get<{ customOrders: CustomOrder[] }>("/custom-orders/mine")
      .then((res) => setMyCustomOrders(res.data.customOrders))
      .catch(() => setMyCustomOrders([]));

    if (user.role === "seller") {
      loadMyProducts();
      loadReceivedCustomOrders();
      loadSellerOrders();
    }
  }, [user]);

  const handleEditProfile = async () => {
    if (!user) return;
    setEditName(user.name);
    setEditPhone(user.phone || "");
    setEditLocation(user.location || "");
    setMessage("");
    setIsEditing(true);
  };

  const handleUpdateProfile = async () => {
    if (!editName.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const response = await api.put<UserResponse>("/auth/profile", {
        name: editName,
        phone: editPhone,
        location: editLocation,
      });

      setUser(response.data.user);
      setIsEditing(false);
      setMessage("Profile updated successfully.");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Failed to update profile.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Remove this product from your shop?")) return;
    try {
      await api.delete(`/products/${id}`);
      setMyProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setMessage("Failed to remove product.");
    }
  };

  // Seller approves an incoming order — marks it as delivered/Done
  const approveOrder = async (orderId: string) => {
    try {
      const res = await api.put<{ order: Order }>(`/orders/${orderId}/status`, {
        status: "delivered",
      });
      setSellerOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data.order : o))
      );
    } catch {
      setMessage("Failed to approve order.");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">User not found.</p>
      </main>
    );
  }

  const completedOrders = orders.filter((o) => o.status === "delivered").length;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            My Account
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Profile</h1>
          <p className="mt-2 text-gray-500">
            Manage your account and view your recent activity.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ================= SIDEBAR ================= */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
              <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
              <p className="text-sm capitalize text-gray-500">{user.role}</p>
            </div>

            {!isEditing ? (
              <div className="mt-6 space-y-4 border-t pt-6">
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="mt-1 text-sm font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="mt-1 text-sm font-medium">
                    {user.phone || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="mt-1 text-sm font-medium">
                    {user.location || "Not provided"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4 border-t pt-6">
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-500">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-500">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Email cannot be changed.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-500">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-500">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white"
                    placeholder="Enter your location"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  disabled={saving}
                  className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setMessage("");
                  }}
                  disabled={saving}
                  className="w-full rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}

            {message && (
              <p
                className={`mt-4 text-center text-sm ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            {!isEditing && (
              <button
                type="button"
                onClick={handleEditProfile}
                className="mt-6 w-full rounded-lg bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="mt-2 text-2xl font-bold">{orders.length}</h3>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Delivered</p>
                <h3 className="mt-2 text-2xl font-bold">{completedOrders}</h3>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  {user.role === "seller" ? "Products Listed" : "Custom Requests"}
                </p>
                <h3 className="mt-2 text-2xl font-bold">
                  {user.role === "seller" ? myProducts.length : myCustomOrders.length}
                </h3>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Recent Orders</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Your latest purchases.
                  </p>
                </div>
                <Link
                  to="/order"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {orders.length === 0 && (
                  <p className="text-sm text-gray-400">No orders yet.</p>
                )}

                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold">
                        {order.items.map((i) => i.name).join(", ")}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        #{order._id.slice(-6).toUpperCase()} •{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-6 sm:justify-end">
                      <p className="font-semibold">Rs. {order.totalAmount}</p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SELLER: My Listed Products */}
            {user.role === "seller" && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">My Products</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Products you've listed for sale.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {myProducts.length === 0 && (
                    <div className="flex flex-col items-center gap-2 py-6 text-center text-gray-400">
                      <PackageIcon className="h-10 w-10" />
                      <p className="text-sm">
                        You haven't listed any products yet.
                      </p>
                    </div>
                  )}

                  {myProducts.map((product) => (
                    <SellerProductRow
                      key={product._id}
                      product={product}
                      onDeleted={() => deleteProduct(product._id)}
                      onUpdated={(updated) =>
                        setMyProducts((prev) =>
                          prev.map((p) => (p._id === updated._id ? updated : p))
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* SELLER: Orders to Fulfill (buyer purchases containing my products) */}
            {user.role === "seller" && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div>
                  <h2 className="text-xl font-bold">Orders to Fulfill</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Orders customers have placed for your products.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {sellerOrders.length === 0 && (
                    <p className="text-sm text-gray-400">
                      No orders yet.
                    </p>
                  )}

                  {sellerOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold">
                          {order.items.map((i) => i.name).join(", ")}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          #{order._id.slice(-6).toUpperCase()} •{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="font-semibold">Rs. {order.totalAmount}</p>

                        {order.status === "delivered" ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                            Done
                          </span>
                        ) : (
                          <>
                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium capitalize text-yellow-700">
                              {order.status}
                            </span>
                            <button
                              onClick={() => approveOrder(order._id)}
                              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                            >
                              Approve
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SELLER: Custom Print Requests Received */}
            {user.role === "seller" && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div>
                  <h2 className="text-xl font-bold">Custom Print Requests</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Requests customers have sent you.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {receivedCustomOrders.length === 0 && (
                    <p className="text-sm text-gray-400">
                      No custom print requests yet.
                    </p>
                  )}

                  {receivedCustomOrders.map((request) => (
                    <CustomRequestSellerRow
                      key={request._id}
                      request={request}
                      onUpdated={(updated) =>
                        setReceivedCustomOrders((prev) =>
                          prev.map((r) => (r._id === updated._id ? updated : r))
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* My sent custom print requests — buyers only */}
            {user.role === "buyer" && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div>
                  <h2 className="text-xl font-bold">My Custom Print Requests</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Requests you've sent to sellers.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {myCustomOrders.length === 0 && (
                    <p className="text-sm text-gray-400">
                      You haven't sent any custom print requests.
                    </p>
                  )}

                  {myCustomOrders.map((request) => (
                    <div
                      key={request._id}
                      className="flex flex-col gap-2 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold">{request.title}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          To: {sellerDisplayName(request.seller)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {request.quotedPrice != null && (
                          <span className="text-sm font-semibold">
                            Rs. {request.quotedPrice}
                          </span>
                        )}
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                          {request.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


// --- Seller: editable product row ---
function SellerProductRow({
  product,
  onDeleted,
  onUpdated,
}: {
  product: Product;
  onDeleted: () => void;
  onUpdated: (p: Product) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState(String(product.stock));
  const [category, setCategory] = useState(product.category);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await api.put<{ product: Product }>(`/products/${product._id}`, {
        name,
        price: Number(price),
        stock: Number(stock),
        category,
      });
      onUpdated(res.data.product);
      setEditing(false);
    } catch {
      // Keep it simple: silently keep editing state open on failure
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            placeholder="Product name"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            placeholder="Price"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            placeholder="Stock"
          />
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
      <img
        src={product.image || PLACEHOLDER_IMAGE}
        alt={product.name}
        className="h-14 w-14 rounded-lg object-cover"
      />
      <div className="flex-1">
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-500">
          {product.category} • Stock: {product.stock}
        </p>
      </div>
      <p className="font-semibold">Rs. {product.price}</p>
      <div className="flex gap-2">
        <button
          onClick={() => setEditing(true)}
          aria-label="Edit product"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <EditIcon className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onDeleted}
          aria-label="Delete product"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50"
        >
          <TrashIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}


// --- Seller: custom print request row with quoting ---
function CustomRequestSellerRow({
  request,
  onUpdated,
}: {
  request: CustomOrder;
  onUpdated: (r: CustomOrder) => void;
}) {
  const [quoting, setQuoting] = useState(false);
  const [price, setPrice] = useState("");
  const [saving, setSaving] = useState(false);

  const customerName =
    typeof request.customer === "string" ? "Customer" : request.customer.name;

  const sendQuote = async () => {
    if (!price || Number(price) < 0) return;
    try {
      setSaving(true);
      const res = await api.put<{ customOrder: CustomOrder }>(
        `/custom-orders/${request._id}/quote`,
        { quotedPrice: Number(price) }
      );
      onUpdated(res.data.customOrder);
      setQuoting(false);
    } catch {
      // no-op, keep form open
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{request.title}</p>
          <p className="mt-1 text-sm text-gray-500">
            From: {customerName} • {request.material || "No material specified"}
          </p>
        </div>
        <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
          {request.status.replace("_", " ")}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-600">{request.description}</p>

      {request.status === "pending" && !quoting && (
        <button
          onClick={() => setQuoting(true)}
          className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
        >
          Send Price Quote
        </button>
      )}

      {quoting && (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Quoted price (Rs.)"
            className="w-40 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <button
            onClick={sendQuote}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Sending..." : "Send"}
          </button>
          <button
            onClick={() => setQuoting(false)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}

      {request.quotedPrice != null && !quoting && (
        <p className="mt-3 text-sm font-semibold">
          Quoted: Rs. {request.quotedPrice}
        </p>
      )}
    </div>
  );
}

export default Profile;
