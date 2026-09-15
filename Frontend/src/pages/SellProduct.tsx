import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../axios/axios";
import { CameraIcon, PackageIcon } from "../component/Icons";

interface User {
  _id: string;
  name: string;
  role: "buyer" | "seller";
}

function SellProduct() {
  // Auth / role gate
  const [user, setUser] = useState<User | null>(null);
  const [checkingUser, setCheckingUser] = useState(true);

  // Form fields
  const [productName, setProductName] = useState("");
  const [caption, setCaption] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("1");
  const [productType, setProductType] = useState<"finished_product" | "raw_material">(
    "finished_product"
  );
  const [image, setImage] = useState(""); // local preview only (object URL)
  const [imageFile, setImageFile] = useState<File | null>(null);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Only sellers may reach this page — check the logged-in user first.
  useEffect(() => {
    api
      .get<{ user: User }>("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setCheckingUser(false));
  }, []);

  // Image upload — kept as a File and sent as multipart/form-data;
  // the backend streams it to ImageKit and stores the hosted URL.
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  // Submit product to the backend (seller-only endpoint)
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!price || Number(price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", caption);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock || "0");
      formData.append("type", productType);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Product listed successfully! It's now visible on the Home and Shop pages.");

      // Clear form
      setProductName("");
      setCaption("");
      setPrice("");
      setCategory("");
      setStock("1");
      setImage("");
      setImageFile(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to list product.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <h1 className="text-2xl font-bold">Please log in</h1>
        <p className="text-gray-500">You need an account to list products.</p>
        <Link
          to="/auth"
          className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  // Logged in but still a buyer — only sellers can post (per the request)
  if (user.role !== "seller") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <h1 className="text-2xl font-bold">Sellers Only</h1>
        <p className="max-w-md text-gray-500">
          Only sellers can list products. Use the{" "}
          <span className="font-semibold">"Switch to Seller"</span> button in
          the navbar to become a seller, then come back here.
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="mx-auto max-w-5xl">

        {/* Heading */}

        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            SELLER CENTER
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            List Your Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add your product details and make it available
            to customers.
          </p>
        </div>


        {/* Feedback messages */}

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}


        {/* Main Content */}

        <div className="grid gap-8 md:grid-cols-2">

          {/* ================= FORM ================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Product Information
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              {/* Product Image */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Image
                </label>

                <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">

                  {image ? (
                    <img
                      src={image}
                      alt="Product preview"
                      className="h-full w-full rounded-xl object-contain"
                    />
                  ) : (
                    <>
                      <CameraIcon className="h-10 w-10 text-gray-400" />

                      <p className="mt-2 text-sm font-medium">
                        Upload Product Image
                      </p>

                      <p className="text-xs text-gray-400">
                        PNG, JPG or JPEG
                      </p>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />

                </label>
              </div>


              {/* Product Name */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Name
                </label>

                <input
                  type="text"
                  value={productName}
                  onChange={(e) =>
                    setProductName(e.target.value)
                  }
                  placeholder="Example: Dragon Figurine"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>


              {/* Caption */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Caption
                </label>

                <textarea
                  value={caption}
                  onChange={(e) =>
                    setCaption(e.target.value)
                  }
                  placeholder="Write something about your product..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>


              {/* Category */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Home & Decor">
                    Home & Decor
                  </option>

                  <option value="Figures & Toys">
                    Figures & Toys
                  </option>

                  <option value="Office">
                    Office
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>
                </select>
              </div>


              {/* Type: finished product or raw material */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Listing Type
                </label>

                <select
                  value={productType}
                  onChange={(e) =>
                    setProductType(
                      e.target.value as "finished_product" | "raw_material"
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                >
                  <option value="finished_product">Finished 3D Printed Product</option>
                  <option value="raw_material">Raw Printing Material</option>
                </select>
              </div>


              {/* Price + Stock */}

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Price
                  </label>

                  <div className="flex">

                    <span className="flex items-center rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 px-4 text-sm font-medium">
                      Rs.
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value)
                      }
                      placeholder="1200"
                      className="w-full rounded-r-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />

                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Stock Quantity
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="10"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                    required
                  />
                </div>

              </div>


              {/* Submit Button */}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Listing..." : "List Product"}
              </button>

            </form>

          </div>


          {/* ================= PREVIEW ================= */}

          <div>

            <h2 className="mb-4 text-xl font-bold">
              Product Preview
            </h2>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

              {/* Image */}

              <div className="flex h-64 items-center justify-center bg-gray-100">

                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <PackageIcon className="mx-auto h-12 w-12" />

                    <p className="mt-2 text-sm">
                      Product image preview
                    </p>
                  </div>
                )}

              </div>


              {/* Product Details */}

              <div className="p-6">

                <p className="text-xs font-semibold uppercase text-blue-600">
                  {category || "Category"}
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {productName || "Your Product Name"}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {caption ||
                    "Your product description will appear here."}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <p className="text-xl font-bold">
                    Rs. {price || "0"}
                  </p>

                  <button
                    type="button"
                    disabled
                    className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white opacity-60"
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SellProduct;
