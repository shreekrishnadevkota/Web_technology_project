import { useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface ProductSectionProps {
  title: string;
  description: string;
  products: Product[];
}

function ProductSection({
  title,
  description,
  products,
}: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-14">
      {/* Section Heading */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore
          </p>

          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
            {title}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        </div>

        {/* Slider Buttons */}
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-lg transition hover:bg-black hover:text-white"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-lg transition hover:bg-black hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      {/* Product Slider */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[220px] sm:min-w-[240px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  const famousProducts: Product[] = [
    {
      id: 1,
      name: "Modern Table Lamp",
      price: 1200,
      category: "Home Decoration",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    },
    {
      id: 2,
      name: "Custom Phone Stand",
      price: 500,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
    {
      id: 3,
      name: "Miniature Statue",
      price: 1500,
      category: "Miniatures",
      image:
        "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342",
    },
    {
      id: 4,
      name: "Creative Flower Pot",
      price: 800,
      category: "Home Decoration",
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    },
    {
      id: 5,
      name: "Desk Organizer",
      price: 950,
      category: "Office",
      image:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
    },
  ];

  const trendingProducts: Product[] = [
    {
      id: 6,
      name: "Gaming Controller Stand",
      price: 1400,
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    },
    {
      id: 7,
      name: "Custom Keychain",
      price: 250,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    },
    {
      id: 8,
      name: "Headphone Stand",
      price: 1100,
      category: "Office",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 9,
      name: "3D Printed Figure",
      price: 2000,
      category: "Figures",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    },
    {
      id: 10,
      name: "Modern Wall Art",
      price: 1800,
      category: "Decoration",
      image:
        "https://images.unsplash.com/photo-1549490349-8643362247b5",
    },
  ];

  const materialProducts: Product[] = [
    {
      id: 11,
      name: "PLA Printed Product",
      price: 900,
      category: "PLA Material",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      id: 12,
      name: "PETG Printed Product",
      price: 1300,
      category: "PETG Material",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
    },
    {
      id: 13,
      name: "ABS Printed Product",
      price: 1500,
      category: "ABS Material",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    },
    {
      id: 14,
      name: "Flexible TPU Product",
      price: 1100,
      category: "TPU Material",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
  ];

  const bestSellingProducts: Product[] = [
    {
      id: 15,
      name: "Custom Name Plate",
      price: 1000,
      category: "Custom Product",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
    {
      id: 16,
      name: "Mobile Holder",
      price: 450,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      id: 17,
      name: "Cable Organizer",
      price: 350,
      category: "Office",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766",
    },
    {
      id: 18,
      name: "Custom Trophy",
      price: 2500,
      category: "Awards",
      image:
        "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad",
    },
    {
      id: 19,
      name: "Creative Plant Pot",
      price: 700,
      category: "Decoration",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 px-4 py-16 text-white sm:py-20">
        
        {/* Background Decoration */}
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>

        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-purple-600 opacity-20 blur-3xl"></div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">

          {/* Hero Content */}
          <div>
            

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Turn Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Imagination Into Reality
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
              Discover unique products created with modern 3D printing
              technology. From creative home decorations to custom designs,
              everything starts with an idea.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105 hover:bg-gray-200"
              >
                Explore Products →
              </Link>

              <Link
                to="/categories"
                className="rounded-xl border border-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Browse Categories
              </Link>
            </div>

            {/* Statistics */}
            <div className="mt-10 flex gap-8">
              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-sm text-gray-400">
                  Unique Products
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">100+</h3>
                <p className="text-sm text-gray-400">
                  Happy Customers
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">24/7</h3>
                <p className="text-sm text-gray-400">
                  Support
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">

      

            {/* Main Image */}
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758"
                alt="3D Printing"
                className="h-[350px] w-full object-cover sm:h-[450px]"
              />
            </div>

           

          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="border-b border-gray-200 bg-white px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-8 sm:grid-cols-3">

          <div className="text-center">
            <h3 className="font-semibold">
              🚚 Fast Delivery
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Safe and reliable delivery.
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-semibold">
              🎨 Custom Designs
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create products your way.
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-semibold">
              ⭐ Quality Products
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Made with premium materials.
            </p>
          </div>

        </div>
      </section>

      {/* ================= PRODUCT SECTIONS ================= */}

      <div className="mx-auto max-w-6xl px-4 py-8">

        <ProductSection
          title="Famous Products"
          description="Products loved by our customers."
          products={famousProducts}
        />

        <ProductSection
          title="Trending Now"
          description="Discover what everyone is talking about."
          products={trendingProducts}
        />

        <ProductSection
          title="Shop by Material"
          description="Explore products made from different materials."
          products={materialProducts}
        />

        <ProductSection
          title="Best Selling"
          description="Our most popular products."
          products={bestSellingProducts}
        />

      </div>

      {/* ================= CTA SECTION ================= */}

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-14 text-center text-white sm:px-12">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">
            Custom 3D Printing
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Have Something Unique In Mind?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Bring your imagination to life. Create personalized products
            designed specifically for you.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-semibold text-blue-600 transition hover:scale-105"
          >
            Start Creating →
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Home;