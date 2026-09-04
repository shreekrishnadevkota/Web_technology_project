import { useState } from "react";

function SellProduct() {
  const [productName, setProductName] = useState("");
  const [caption, setCaption] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // Image upload
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Submit product
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log({
      productName,
      caption,
      price,
      category,
      image,
    });

    alert("Product listed successfully!");

    // Clear form
    setProductName("");
    setCaption("");
    setPrice("");
    setCategory("");
    setImage("");
  };

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
                      <div className="text-4xl">
                        📷
                      </div>

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


              {/* Price */}

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


              {/* Submit Button */}

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                List Product
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
                    <div className="text-5xl">
                      📦
                    </div>

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

                  <button className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white">
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