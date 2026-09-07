function CustomPrint() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Custom 3D Printing
          </h1>

          <p className="mt-2 text-gray-500">
            Have your own idea? Send us your design and printing requirements.
          </p>
        </div>


        {/* Form */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm sm:p-8">

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

      </div>

    </div>
  );
}

export default CustomPrint;
