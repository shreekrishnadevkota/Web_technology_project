import { Link } from "react-router-dom";

function NavBar() {
  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white px-4 py-3">
      <div className="mx-auto max-w-6xl">

        {/* Top Section */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            Hello
          </Link>

          {/* Mobile Menu Button */}
          <button className="text-2xl md:hidden">
            ☰
          </button>

          {/* Middle Navigation Links - Desktop */}
          <div className="hidden gap-5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-blue-500"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Cart and Profile - Desktop */}
          <div className="hidden gap-4 md:flex">
            <Link
              to="/cart"
              className="hover:text-blue-500"
            >
              Cart
            </Link>

            <Link
              to="/profile"
              className="hover:text-blue-500"
            >
              Profile
            </Link>
          </div>

        </div>

       

      </div>
    </nav>
  );
}

export default NavBar;