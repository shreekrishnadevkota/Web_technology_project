import { useState } from "react";
import axios from "axios";
import api from "../axios/axios";

interface BecomeSellerModalProps {
  onClose: () => void;
  onSuccess: (role: "buyer" | "seller") => void;
}

// One-time seller registration form (FR-02). Shown only the first time
// a buyer tries to switch to the seller role. After this is submitted
// once, role switching becomes a single click with no form.
function BecomeSellerModal({ onClose, onSuccess }: BecomeSellerModalProps) {
  const [shopName, setShopName] = useState("");
  const [bio, setBio] = useState("");
  const [customPrintEnabled, setCustomPrintEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shopName.trim()) {
      setError("Shop / seller name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/become-seller", {
        shopName,
        bio,
        customPrintEnabled,
      });

      onSuccess(response.data.user.role);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to register as a seller.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">Become a Seller</h2>
        <p className="mt-1 text-sm text-gray-500">
          One-time setup. After this you can switch between Buyer and Seller
          with a single click.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Shop / Seller Name
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="e.g. Print Studio Nepal"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Short Bio (optional)
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell customers a bit about what you print..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={customPrintEnabled}
              onChange={(e) => setCustomPrintEnabled(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            I want to accept custom print requests from customers
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-1/2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Setting up..." : "Start Selling"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BecomeSellerModal;
