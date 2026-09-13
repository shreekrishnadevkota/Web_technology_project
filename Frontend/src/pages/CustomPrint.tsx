import { useState } from "react";

function CustomPrint() {
  const [search, setSearch] = useState("");
  const [selectedSeller, setSelectedSeller] = useState("");

  const sellers = [
    {
      id: 1,
      name: "Print Studio Nepal",
      location: "Kathmandu",
    },
    {
      id: 2,
      name: "3D Maker Hub",
      location: "Lalitpur",
    },
    {
      id: 3,
      name: "Creative Prints",
      location: "Bhaktapur",
    },
    {
      id: 4,
      name: "Nepal 3D Works",
      location: "Kathmandu",
    },
  ];

  const filteredSellers = sellers.filter((seller) =>
    seller.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

      {/* Heading */}
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Custom 3D Printing
        </h1>

        <p className="mt-2 text-gray-500">
          Have your own idea? Send your design and choose a seller.
        </p>
      </div>


      {/* Main Content */}
      <div className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-3">


        {/* =========================
            CUSTOM PRINT FORM
        ========================== */}

        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:col-span-2">

          <h2 className="text-xl font-semibold text-gray-900">
            Submit Your Request
          </h2>


          {/* Description */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              What do you want to print?
            </label>

            <textarea
              placeholder="Describe your 3D printing idea..."
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {/* Material */}
          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Material
            </label>

            <select
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option>Select material</option>
              <option>PLA</option>
              <option>ABS</option>
              <option>PETG</option>
              <option>Resin</option>
            </select>

          </div>


          {/* Dimensions */}
          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Dimensions (mm)
            </label>

            <div className="grid grid-cols-3 gap-3">

              <input
                type="number"
                placeholder="Length"
                className="rounded-xl border border-gray-300 px-3 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="number"
                placeholder="Width"
                className="rounded-xl border border-gray-300 px-3 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="number"
                placeholder="Height"
                className="rounded-xl border border-gray-300 px-3 py-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>


          {/* Upload */}
          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Upload Design
            </label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.stl,.obj"
              className="w-full rounded-xl border border-dashed border-gray-300 p-4"
            />

            <p className="mt-2 text-xs text-gray-500">
              Upload an image or 3D model of your design.
            </p>

          </div>


          {/* Submit */}
          <button
            className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Custom Request
          </button>

        </div>


        {/* =========================
            SELLER SELECTION
        ========================== */}

        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

          <h2 className="text-xl font-semibold text-gray-900">
            Choose a Seller
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select who you want to print your design.
          </p>


          {/* Search */}
          <div className="mt-5">

            <input
              type="text"
              placeholder="Search seller..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {/* Seller List */}
          <div className="mt-5 space-y-3">

            {filteredSellers.length > 0 ? (

              filteredSellers.map((seller) => (

                <label
                  key={seller.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    selectedSeller === seller.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >

                  <input
                    type="radio"
                    name="seller"
                    value={seller.name}
                    checked={selectedSeller === seller.name}
                    onChange={() =>
                      setSelectedSeller(seller.name)
                    }
                    className="h-4 w-4"
                  />


                  <div>
                    <h3 className="font-medium text-gray-900">
                      {seller.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {seller.location}
                    </p>
                  </div>

                </label>

              ))

            ) : (

              <p className="py-5 text-center text-sm text-gray-500">
                No seller found.
              </p>

            )}

          </div>


          {/* Selected Seller */}
          {selectedSeller && (
            <div className="mt-5 rounded-xl bg-gray-100 p-4">

              <p className="text-sm text-gray-500">
                Selected Seller
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {selectedSeller}
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default CustomPrint;