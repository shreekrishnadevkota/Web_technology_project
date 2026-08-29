import { useRef } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="min-w-[220px] overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Product Image */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-1 font-semibold">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold">
            Rs. {product.price}
          </span>

          <button className="rounded-lg bg-black px-3 py-2 text-sm text-white hover:bg-gray-800">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
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
    <section className="mt-12">
      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Explore our latest collection
          </p>
        </div>

        {/* Arrow Buttons */}
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-xl hover:bg-gray-100"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-xl hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Product List */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

function Home() {
  /* Famous Products */
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

  /* Trending Products */
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

  /* Material Products */
  const materialProducts: Product[] = [
    {
      id: 11,
      name: "PLA Material Product",
      price: 900,
      category: "PLA",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      id: 12,
      name: "PETG Material Product",
      price: 1300,
      category: "PETG",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
    },
    {
      id: 13,
      name: "ABS Material Product",
      price: 1500,
      category: "ABS",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    },
    {
      id: 14,
      name: "Flexible TPU Product",
      price: 1100,
      category: "TPU",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
  ];

  /* Best Selling Products */
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
      name: "Plant Pot",
      price: 700,
      category: "Decoration",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-black px-4 py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

          {/* Hero Text */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-400">
              CUSTOM 3D PRINTING PRODUCTS
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Turn Your Ideas Into Reality
            </h1>

            <p className="mt-5 max-w-xl text-gray-300">
              Discover unique, creative and customizable products made with
              modern 3D printing technology.
            </p>

            <div className="mt-7 flex gap-4">
              <Link
                to="/shop"
                className="rounded-lg bg-white px-6 py-3 font-medium text-black hover:bg-gray-200"
              >
                Shop Now
              </Link>

              <Link
                to="/categories"
                className="rounded-lg border border-gray-500 px-6 py-3 font-medium hover:bg-gray-900"
              >
                Explore Categories
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758"
              alt="3D Printing"
              className="h-[300px] w-full object-cover md:h-[450px]"
            />
          </div>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-6xl px-4 py-10">

        {/* Famous Section */}
        <ProductSection
          title="Famous Products"
          products={famousProducts}
        />

        {/* Trending Section */}
        <ProductSection
          title="Trending Now"
          products={trendingProducts}
        />

        {/* Material Section */}
        <ProductSection
          title="Shop by Material"
          products={materialProducts}
        />

        {/* Best Selling Section */}
        <ProductSection
          title="Best Selling"
          products={bestSellingProducts}
        />

      </div>

      {/* CALL TO ACTION */}
      <section className="bg-black px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Have Your Own Idea?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Create your own custom product and bring your imagination to life
            with our 3D printing service.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-medium text-black hover:bg-gray-200"
          >
            Create Custom Product
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Home;