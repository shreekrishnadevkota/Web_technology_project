import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import heroImage from "../assets/hero.png";
import ProductDetails from "../component/ProductDetails";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

function Home() {

  // Product slider
  const productSlider = useRef<HTMLDivElement>(null);

  // Selected product for product details
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);


  // Products
  const products: Product[] = [
    {
      id: 1,
      name: "Dragon Figurine",
      price: 1200,
      category: "Figures",
      image:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820",
      description:
        "A beautiful 3D printed dragon figurine. Perfect for decoration, collectors and fantasy lovers.",
    },

    {
      id: 2,
      name: "Modern Lamp",
      price: 1500,
      category: "Home",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
      description:
        "A modern 3D printed lamp designed to give your room a stylish and creative look.",
    },

    {
      id: 3,
      name: "Plant Pot",
      price: 800,
      category: "Decoration",
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
      description:
        "A simple and stylish plant pot suitable for small indoor plants and home decoration.",
    },

    {
      id: 4,
      name: "Phone Stand",
      price: 500,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1603313011108-4e1b5c6c3f5e",
      description:
        "A compact 3D printed phone stand perfect for your desk, office or study table.",
    },

    {
      id: 5,
      name: "Desk Organizer",
      price: 950,
      category: "Office",
      image:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
      description:
        "Keep your workspace clean and organized with this practical 3D printed desk organizer.",
    },

    {
      id: 6,
      name: "Gaming Stand",
      price: 1400,
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8",
      description:
        "A useful gaming stand designed to keep your gaming setup clean and organized.",
    },
  ];


  // Product slider
  const scrollProducts = (direction: "left" | "right") => {

    if (!productSlider.current) return;

    productSlider.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });

  };


  return (
    <main className="bg-[#f8f9fc]">


      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden bg-[#07152f] text-white">

        {/* Background Glow */}

        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />


        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:px-10">


          {/* Hero Text */}

          <div className="z-10 max-w-xl">

            <div className="mb-5 flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-blue-300">

              <span className="h-px w-7 bg-blue-400" />

              CREATE • PRINT • ENJOY

            </div>


            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">

              Bring Your Ideas

              <br />

              to Life with{" "}

              <span className="text-blue-500">
                3D Printing
              </span>

            </h1>


            <p className="mt-6 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">

              Unique, useful and creative products made for
              modern life. Discover something different or
              bring your own idea to reality.

            </p>


            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                to="/shop"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Shop Now →
              </Link>


              <Link
                to="/categories"
                className="rounded-lg border border-slate-600 bg-white/5 px-6 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Explore Categories
              </Link>

            </div>


            {/* Stats */}

            <div className="mt-9 grid max-w-md grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">

              <div className="px-4 py-4">

                <p className="text-lg font-bold">
                  500+
                </p>

                <p className="text-xs text-slate-400">
                  Products
                </p>

              </div>


              <div className="border-x border-white/10 px-4 py-4">

                <p className="text-lg font-bold">
                  100+
                </p>

                <p className="text-xs text-slate-400">
                  Customers
                </p>

              </div>


              <div className="px-4 py-4">

                <p className="text-lg font-bold">
                  Custom
                </p>

                <p className="text-xs text-slate-400">
                  Designs
                </p>

              </div>

            </div>

          </div>


          {/* Hero Image */}

          <div className="relative flex justify-center lg:justify-end">

            <div className="absolute h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">

              <img
                src={heroImage}
                alt="3D printed product"
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[470px]"
              />


              <div className="absolute inset-0 bg-gradient-to-t from-[#07152f]/50 via-transparent to-transparent" />


              <div className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-black/40 px-4 py-3">

                <p className="text-[10px] tracking-widest text-blue-300">
                  MADE FOR YOU
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Custom 3D Designs
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Curved Bottom */}

        <div className="absolute -bottom-1 left-0 h-8 w-full rounded-[50%_50%_0_0] bg-[#f8f9fc]" />

      </section>



      {/* ================= TRENDING PRODUCTS ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">


        {/* Header */}

        <div className="mb-6 flex items-end justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Popular right now
            </p>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Trending Products
            </h2>

          </div>


          <Link
            to="/shop"
            className="hidden text-xs font-semibold text-blue-600 sm:block"
          >
            See All →
          </Link>

        </div>


        {/* Product Slider */}

        <div className="relative">


          {/* Left Arrow */}

          <button
            onClick={() => scrollProducts("left")}
            className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-lg shadow-md sm:flex"
          >
            ←
          </button>


          {/* Products */}

          <div
            ref={productSlider}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >

            {products.map((product) => (

              <div
                key={product.id}
                className="w-[230px] min-w-[230px] cursor-pointer sm:w-[250px] sm:min-w-[250px]"
                onClick={() => setSelectedProduct(product)}
              >

                <ProductCard
                  product={product}
                />

              </div>

            ))}

          </div>


          {/* Right Arrow */}

          <button
            onClick={() => scrollProducts("right")}
            className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-lg shadow-md sm:flex"
          >
            →
          </button>

        </div>


        {/* Mobile See All */}

        <div className="mt-2 text-center sm:hidden">

          <Link
            to="/shop"
            className="text-sm font-semibold text-blue-600"
          >
            See All Products →
          </Link>

        </div>

      </section>



      {/* ================= SHOP BY CATEGORY ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        <div className="mb-6">

          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Find your style
          </p>

          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
            Shop by Category
          </h2>

        </div>


        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          <CategoryCard
            title="Home & Decor"
            icon="🏠"
            path="/categories"
          />

          <CategoryCard
            title="Accessories"
            icon="🎧"
            path="/categories"
          />

          <CategoryCard
            title="Figures & Toys"
            icon="🐉"
            path="/categories"
          />

          <CategoryCard
            title="Office"
            icon="💻"
            path="/categories"
          />

        </div>

      </section>



      {/* ================= WHY PRINTORA ================= */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <Feature
              icon="✨"
              title="Unique Designs"
              description="Creative products you won't find everywhere."
            />

            <Feature
              icon="🎨"
              title="Custom Products"
              description="Turn your ideas into something real."
            />

            <Feature
              icon="⚡"
              title="Quality Printing"
              description="Made using reliable modern printing technology."
            />

            <Feature
              icon="🚚"
              title="Easy Delivery"
              description="Simple and convenient delivery experience."
            />

          </div>

        </div>

      </section>



      {/* ================= CTA ================= */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-12 text-center text-white sm:px-12">

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10" />

          <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-white/10" />


          <div className="relative">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              Your idea. Your design.
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Have Something in Mind?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm text-blue-100 sm:text-base">
              Discover our products or create something
              completely unique with 3D printing.
            </p>


            <Link
              to="/categories"
              className="mt-7 inline-block rounded-xl bg-white px-7 py-3 text-sm font-bold text-blue-600"
            >
              Explore Products →
            </Link>

          </div>

        </div>

      </section>



      {/* ================= PRODUCT DETAILS POPUP ================= */}

      {selectedProduct && (

        <ProductDetails
          product={selectedProduct}
          closeDetails={() => setSelectedProduct(null)}
        />

      )}

    </main>
  );
}



/* ================= CATEGORY CARD ================= */

function CategoryCard({
  title,
  icon,
  path,
}: {
  title: string;
  icon: string;
  path: string;
}) {

  return (

    <Link
      to={path}
      className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-bold sm:text-base">
        {title}
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        Explore products →
      </p>

    </Link>

  );
}



/* ================= FEATURE ================= */

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {

  return (

    <div className="flex gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl">
        {icon}
      </div>

      <div>

        <h3 className="text-sm font-bold">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>

      </div>

    </div>

  );
}


export default Home;