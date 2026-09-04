import { useState } from "react";

function Profile() {
  const [user] = useState({
    name: "Shree Krishna",
    email: "shree@example.com",
    phone: "+977 9800000000",
    location: "Kathmandu, Nepal",
  });

  const recentOrders = [
    {
      id: "#ORD-1024",
      product: "Modern Table Lamp",
      date: "August 20, 2026",
      status: "Delivered",
      price: 1200,
    },
    {
      id: "#ORD-1025",
      product: "Custom Phone Stand",
      date: "August 15, 2026",
      status: "Processing",
      price: 500,
    },
    {
      id: "#ORD-1026",
      product: "Creative Plant Pot",
      date: "August 10, 2026",
      status: "Delivered",
      price: 700,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account and view your recent activity.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Profile Card */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

            {/* Profile Image */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
                {user.name.charAt(0)}
              </div>

              <h2 className="mt-4 text-xl font-bold">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500">
                Customer
              </p>
            </div>

            {/* Profile Information */}
            <div className="mt-6 space-y-4 border-t pt-6">

              <div>
                <p className="text-xs text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium">
                  {user.phone}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium">
                  {user.location}
                </p>
              </div>

            </div>

            {/* Edit Button */}
            <button className="mt-6 w-full rounded-lg bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800">
              Edit Profile
            </button>

          </div>

          {/* Right Section */}
          <div className="space-y-6 lg:col-span-2">

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  12
                </h3>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Completed
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  10
                </h3>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Wishlist
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  5
                </h3>
              </div>

            </div>

            {/* Recent Orders */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    Recent Orders
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your latest purchases.
                  </p>
                </div>

                <button className="text-sm font-medium text-blue-600">
                  View All
                </button>
              </div>

              <div className="mt-6 space-y-4">

                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div>
                      <p className="font-semibold">
                        {order.product}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.id} • {order.date}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-6 sm:justify-end">

                      <p className="font-semibold">
                        Rs. {order.price}
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
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

            {/* Account Settings */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold">
                Account Settings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your account preferences.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <button className="rounded-xl border border-gray-200 p-4 text-left transition hover:border-black">
                  <h3 className="font-semibold">
                    Saved Addresses
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your delivery addresses.
                  </p>
                </button>

                <button className="rounded-xl border border-gray-200 p-4 text-left transition hover:border-black">
                  <h3 className="font-semibold">
                    Payment Methods
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your payment options.
                  </p>
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default Profile;