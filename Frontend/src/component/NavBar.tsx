import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios/axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "buyer" | "seller";
}

interface UserResponse {
  user: User;
}

function NavBar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Custome-Print", path: "/customPrint" },
    { name: "About", path: "/about" },
  ];


  // Get logged-in user
  useEffect(() => {
    getUser();
  }, []);


  const getUser = async () => {
    try {
      const response =
        await api.get<UserResponse>("/auth/me");

      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    }
  };


  // Search products
  const handleSearch = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(search)}`
    );
  };


  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null);

      navigate("/");
    } catch (error) {
      console.log("Logout failed");
    }
  };


  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">

      <div className="mx-auto max-w-6xl px-4">

        {/* Top Navbar */}

        <div className="flex h-16 items-center justify-between">


          {/* Logo */}

          <Link
            to="/"
            className="pr-6 text-xl font-bold sm:text-2xl"
          >
            Print<span className="text-blue-600">Shop</span>
          </Link>


          {/* Desktop Navigation */}

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

          <form
            onSubmit={handleSearch}
            className="hidden flex-1 px-6 lg:block"
          >

            <div className="relative mx-auto max-w-sm">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm outline-none focus:border-blue-600"
              />

              <button
                type="submit"
                className="absolute right-3 top-2 text-gray-400 hover:text-blue-600"
              >
                🔍
              </button>

            </div>

          </form>


          {/* Cart + User */}

          <div className="hidden items-center gap-4 md:flex">

            <Link
              to="/cart"
              className="text-sm font-medium hover:text-blue-600"
            >
              Cart
            </Link>


            {user ? (
              <>

                <Link
                  to="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  {user.name}
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Logout
                </button>

              </>
            ) : (

              <Link
                to="/auth"
                className="text-sm font-medium hover:text-blue-600"
              >
                Login
              </Link>

            )}

          </div>


          {/* Mobile Right Section */}

          <div className="flex items-center gap-3 md:hidden">

            <Link
              to="/cart"
              className="text-sm font-medium"
            >
              Cart
            </Link>

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="text-2xl"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>

        </div>


        {/* Mobile Search */}

        <form
          onSubmit={handleSearch}
          className="pb-3 md:hidden"
        >

          <div className="relative">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm outline-none focus:border-blue-600"
            />

            <button
              type="submit"
              className="absolute right-3 top-2 text-gray-400"
            >
              🔍
            </button>

          </div>

        </form>

      </div>


      {/* Mobile Menu */}

      {menuOpen && (

        <div className="border-t border-gray-200 bg-white md:hidden">

          <div className="flex flex-col px-4 py-3">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                to={link.path}
                onClick={() =>
                  setMenuOpen(false)
                }
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {link.name}
              </Link>

            ))}


            {/* User */}

            {user ? (

              <>
                <Link
                  to="/profile"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  {user.name}
                </Link>

                <button
                  onClick={handleLogout}
                  className="py-3 text-left text-sm font-medium text-red-500"
                >
                  Logout
                </button>
              </>

            ) : (

              <Link
                to="/auth"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

            )}

          </div>

        </div>

      )}

    </nav>
  );
}

export default NavBar;