import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../axios/axios";
import BecomeSellerModal from "./BecomeSellerModal";
import { SearchIcon, UserIcon, MenuIcon, CloseIcon, CartIcon } from "./Icons";

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
  const [switchingRole, setSwitchingRole] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [roleError, setRoleError] = useState("");

  const navigate = useNavigate();

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Custome-Print", path: "/customPrint" },
    { name: "About", path: "/about" },
  ];


  const getUser = async () => {
    try {
      const response =
        await api.get<UserResponse>("/auth/me");

      setUser(response.data.user);
    } catch {
      setUser(null);
    }
  };


  // Get logged-in user
  useEffect(() => {
    getUser();
  }, []);


  // ONE-CLICK ROLE SWITCH (Buyer <-> Seller)
  //
  // If this is the user's first time becoming a seller, the backend
  // responds with needsSellerRegistration:true and we show the
  // one-time seller form instead. Every switch after that is a
  // single click, both directions.
  const handleSwitchRole = async () => {
    if (!user || switchingRole) return;

    try {
      setSwitchingRole(true);
      setRoleError("");

      const response = await api.put("/auth/switch-role");

      setUser({ ...user, role: response.data.role });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.needsSellerRegistration) {
          setShowSellerModal(true);
        } else {
          setRoleError(error.response?.data?.message || "Failed to switch role.");
        }
      } else {
        setRoleError("An unexpected error occurred.");
      }
    } finally {
      setSwitchingRole(false);
    }
  };


  const handleSellerRegistered = (role: "buyer" | "seller") => {
    if (user) {
      setUser({ ...user, role });
    }
    setShowSellerModal(false);
    navigate("/ProductList");
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
    } catch {
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

            {/* Sell link only visible to users currently in the seller role */}
            {user?.role === "seller" && (
              <Link
                to="/ProductList"
                className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
              >
                Sell
              </Link>
            )}

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
                aria-label="Search"
                className="absolute right-3 top-2 text-gray-400 hover:text-blue-600"
              >
                <SearchIcon className="h-4 w-4" />
              </button>

            </div>

          </form>


          {/* Cart + User */}

          <div className="hidden items-center gap-4 md:flex">

            <Link
              to="/cart"
              className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-600"
            >
              <CartIcon className="h-5 w-5" />
              Cart
            </Link>


            {user ? (
              <>

                {/* One-click Buyer <-> Seller switch */}
                <button
                  type="button"
                  onClick={handleSwitchRole}
                  disabled={switchingRole}
                  title={
                    user.role === "buyer"
                      ? "Switch to Seller"
                      : "Switch to Buyer"
                  }
                  className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {switchingRole
                    ? "Switching..."
                    : user.role === "buyer"
                    ? "Switch to Seller"
                    : "Switch to Buyer"}
                </button>

                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 text-sm font-medium hover:border-2 hover:border-gray-400 bg-bg-white px-2 py-1 rounded-3xl"
                >
                  <UserIcon className="h-4 w-4" />
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
              className="flex items-center text-sm font-medium"
            >
              <CartIcon className="h-5 w-5" />
            </Link>

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>

          </div>

        </div>


        {/* Role switch error banner */}
        {roleError && (
          <div className="mb-3 rounded-lg bg-red-50 px-4 py-2 text-xs text-red-600">
            {roleError}
          </div>
        )}


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
              aria-label="Search"
              className="absolute right-3 top-2 text-gray-400"
            >
              <SearchIcon className="h-4 w-4" />
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

            {user?.role === "seller" && (
              <Link
                to="/ProductList"
                onClick={() => setMenuOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Sell
              </Link>
            )}


            {/* User */}

            {user ? (

              <>
                <button
                  type="button"
                  onClick={() => {
                    handleSwitchRole();
                    setMenuOpen(false);
                  }}
                  disabled={switchingRole}
                  className="border-b border-gray-100 py-3 text-left text-sm font-medium text-blue-600"
                >
                  {switchingRole
                    ? "Switching..."
                    : user.role === "buyer"
                    ? "Switch to Seller"
                    : "Switch to Buyer"}
                </button>

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


      {/* One-time seller registration modal */}
      {showSellerModal && (
        <BecomeSellerModal
          onClose={() => setShowSellerModal(false)}
          onSuccess={handleSellerRegistered}
        />
      )}

    </nav>
  );
}

export default NavBar;
