import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import ProductDetails from "../component/ProductDetails";
import CategoryCart from "../component/CategoryCart";
import api from "../axios/axios";
import type { Product } from "../types";
import HeroImage from "../assets/3d_printer.jpg";
import { ArrowLeftIcon, ArrowRightIcon, SparkleIcon, PaletteIcon, BoltIcon, TruckIcon } from "../component/Icons";

function Home() {

  // Product slider
  const productSlider = useRef<HTMLDivElement>(null);

  // Selected product for product details
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  // Products fetched from the database (real sellers' listings)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ products: Product[] }>("/products?sort=newest&limit=10")
      .then((res) => setProducts(res.data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);


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


      {/*  HERO SECTION */}

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
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Shop Now <ArrowRightIcon className="h-4 w-4" />
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
                  {products.length}+
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
                src={HeroImage}
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



      {/* TRENDING PRODUCTS (live, from the database)*/}

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
            className="hidden items-center gap-1 text-xs font-semibold text-blue-600 sm:flex"
          >
            See All <ArrowRightIcon className="h-3 w-3" />
          </Link>

        </div>


        {loading && (
          <p className="py-10 text-center text-sm text-gray-400">
            Loading products...
          </p>
        )}

        {!loading && products.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-400">
            No products listed yet. Be the first seller to list one!
          </p>
        )}

        {!loading && products.length > 0 && (

          <div className="relative">


            {/* Left Arrow */}

            <button
              onClick={() => scrollProducts("left")}
              aria-label="Scroll left"
              className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md sm:flex"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>


            {/* Products */}

            <div
              ref={productSlider}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >

              {products.map((product) => (

                <div
                  key={product._id}
                  className="w-[230px] min-w-[230px] sm:w-[250px] sm:min-w-[250px]"
                >

                  <ProductCard
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />

                </div>

              ))}

            </div>


            {/* Right Arrow */}

            <button
              onClick={() => scrollProducts("right")}
              aria-label="Scroll right"
              className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md sm:flex"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>

          </div>

        )}


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



      {/*WHY section */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <Feature
              icon={<SparkleIcon className="h-5 w-5" />}
              title="Unique Designs"
              description="Creative products you won't find everywhere."
            />

            <Feature
              icon={<PaletteIcon className="h-5 w-5" />}
              title="Custom Products"
              description="Turn your ideas into something real."
            />

            <Feature
              icon={<BoltIcon className="h-5 w-5" />}
              title="Quality Printing"
              description="Made using reliable modern printing technology."
            />

            <Feature
              icon={<TruckIcon className="h-5 w-5" />}
              title="Easy Delivery"
              description="Simple and convenient delivery experience."
            />

          </div>

        </div>

      </section>

      <CategoryCart/>



      {/*  CTA */}

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
              to="/customPrint"
              className="mt-7 inline-flex items-center gap-1.5 rounded-xl bg-white px-7 py-3 text-sm font-bold text-blue-600"
            >
              Request Custom Print <ArrowRightIcon className="h-4 w-4" />
            </Link>

          </div>

        </div>

      </section>



      {/* PRODUCT DETAILS POPUP */}

      {selectedProduct && (

        <ProductDetails
          product={selectedProduct}
          closeDetails={() => setSelectedProduct(null)}
        />

      )}

    </main>
  );
}


/* FEATURE  */

function Feature({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {

  return (

    <div className="flex gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-blue-600">
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
