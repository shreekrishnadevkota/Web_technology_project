import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">

        {/* Top Navbar */}
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold sm:text-2xl"
          >
            Print<span className="text-blue-600">Shop</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden flex-1 px-6 lg:block">
            <div className="relative mx-auto max-w-sm">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm outline-none focus:border-blue-600"
              />

              <span className="absolute right-3 top-2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Cart and Profile */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/cart"
              className="text-sm font-medium hover:text-blue-600"
            >
              Cart
            </Link>

            <Link
              to="/profile"
              className="text-sm font-medium hover:text-blue-600"
            >
              Profile
            </Link>
          </div>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-3 md:hidden">

            <Link
              to="/cart"
              className="text-sm font-medium"
            >
              Cart
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>

        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm outline-none focus:border-blue-600"
            />

            <span className="absolute right-3 top-2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="flex flex-col px-4 py-3">

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            {/* Profile */}
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Profile
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;