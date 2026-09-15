import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon } from "./Icons";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

// Reusable search bar: typing + Enter, or clicking the search icon,
// both navigate to /shop?search=... . If it's already on the Shop
// page, it keeps the existing category/sort filters in the URL.
function SearchBar({ className = "", placeholder = "Search products..." }: SearchBarProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  const runSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    navigate(`/shop?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch();
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-1 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
      />

      <button
        type="submit"
        aria-label="Search"
        className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
    </form>
  );
}

export default SearchBar;
