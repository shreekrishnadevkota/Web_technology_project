import { Link } from "react-router-dom";

function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About Us", path: "/about" },
  ];

  const categories = [
    "Home & Decoration",
    "Accessories",
    "Toys & Figures",
    "Custom Products",
    "Office Items",
  ];

  const supportLinks = [
    "Contact Us",
    "Shipping Information",
    "Returns & Refunds",
    "Privacy Policy",
    "Terms & Conditions",
  ];

  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              Print<span className="text-blue-500">Shop</span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Discover creative and unique products made with modern
              3D printing technology. Turn your ideas into reality.
            </p>

            <p className="mt-4 text-sm text-gray-400">
              Kathmandu, Nepal
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold">
              Categories
            </h3>

            <ul className="mt-4 space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to="/categories"
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold">
              Customer Support
            </h3>

            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PrintShop. All rights reserved.
          </p>

          <div className="flex gap-5 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-white"
            >
              Facebook
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-white"
            >
              Instagram
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-white"
            >
              Twitter
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;