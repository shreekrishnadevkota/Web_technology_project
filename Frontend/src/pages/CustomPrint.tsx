import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../axios/axios";
import { CameraIcon, UserIcon } from "../component/Icons";

interface Seller {
  _id: string;
  name: string;
  sellerProfile?: {
    shopName?: string;
    bio?: string;
  };
}

function CustomPrint() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loadingSellers, setLoadingSellers] = useState(true);
  const [selectedSellerId, setSelectedSellerId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Load sellers who currently accept custom print orders
  useEffect(() => {
    api
      .get<{ sellers: Seller[] }>("/auth/custom-print-sellers")
      .then((res) => setSellers(res.data.sellers))
      .catch(() => setSellers([]))
      .finally(() => setLoadingSellers(false));
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedSellerId) {
      setError("Please choose a seller from the panel on the right.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError("Please fill in a title and description for your request.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("sellerId", selectedSellerId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("material", material);
      formData.append("dimensions", dimensions);
      if (referenceFile) {
        formData.append("referenceImage", referenceFile);
      }

      // The request lands directly in the chosen seller's Profile,
      // under their "Custom Print Requests" section.
      await api.post("/custom-orders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setTitle("");
      setDescription("");
      setMaterial("");
      setDimensions("");
      setReferenceFile(null);
      setPreviewUrl("");
      setSelectedSellerId("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to submit request.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <h1 className="text-2xl font-bold">Request Sent!</h1>
        <p className="max-w-md text-gray-500">
          Your custom print request has been sent to the seller. They'll
          review it and send you a price quote.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setSuccess(false)}
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Send Another Request
          </button>
          <Link
            to="/profile"
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold hover:bg-gray-100"
          >
            View My Requests
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          Bring your idea to life
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Request a Custom 3D Print
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Describe what you want printed, choose a seller who accepts custom
          orders, and they'll get back to you with a price quote.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">

          <div>
            <label className="mb-2 block text-sm font-medium">Reference Image (optional)</label>
            <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
              {previewUrl ? (
                <img src={previewUrl} alt="Reference preview" className="h-full w-full rounded-xl object-contain" />
              ) : (
                <>
                  <CameraIcon className="h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm font-medium">Upload a reference image</p>
                  <p className="text-xs text-gray-400">PNG, JPG or JPEG</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Request Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Custom Chess Piece Set"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe exactly what you'd like printed..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Preferred Material</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. PLA, Resin"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Dimensions</label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="e.g. 10cm x 5cm x 5cm"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending Request..." : "Send Request to Seller"}
          </button>

        </form>

        {/* Seller Panel */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Choose a Seller</h2>
          <p className="mt-1 text-xs text-gray-500">
            Sellers below currently accept custom print requests.
          </p>

          <div className="mt-4 space-y-3">
            {loadingSellers && (
              <p className="text-sm text-gray-400">Loading sellers...</p>
            )}

            {!loadingSellers && sellers.length === 0 && (
              <p className="text-sm text-gray-400">
                No sellers are accepting custom orders right now.
              </p>
            )}

            {sellers.map((seller) => (
              <button
                type="button"
                key={seller._id}
                onClick={() => setSelectedSellerId(seller._id)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                  selectedSellerId === seller._id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {seller.sellerProfile?.shopName || seller.name}
                  </p>
                  {seller.sellerProfile?.bio && (
                    <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
                      {seller.sellerProfile.bio}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

    </main>
  );
}

export default CustomPrint;
