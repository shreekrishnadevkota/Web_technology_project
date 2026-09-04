import { Link } from "react-router-dom";

function About() {
  const features = [
    {
      title: "Creative Products",
      description:
        "Discover unique products designed with creativity and modern technology.",
      icon: "🎨",
    },
    {
      title: "Quality Materials",
      description:
        "We focus on using reliable materials to create durable products.",
      icon: "⭐",
    },
    {
      title: "Custom Designs",
      description:
        "Bring your imagination to life with personalized 3D printed products.",
      icon: "🧩",
    },
    {
      title: "Customer Focused",
      description:
        "We work to provide a simple and enjoyable shopping experience.",
      icon: "❤️",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            About PrintShop
          </p>

          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Turning Creative Ideas Into Real Products
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-gray-300">
            PrintShop is a platform built to connect creativity, technology,
            and imagination through modern 3D printing.
          </p>

        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758"
              alt="3D Printing"
              className="h-[350px] w-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Built For Creativity
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              We believe that every great product starts with an idea.
              Our platform was created to make creative and customized
              products more accessible through modern 3D printing technology.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              From home decorations and accessories to personalized designs,
              we aim to give people the opportunity to discover and create
              products that are truly unique.
            </p>
          </div>

        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-gray-50 p-8">
            <p className="text-sm font-semibold text-blue-600">
              OUR MISSION
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Make Creativity Accessible
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our mission is to make creative and personalized products
              accessible to everyone by connecting ideas with modern
              manufacturing technology.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-950 p-8 text-white">
            <p className="text-sm font-semibold text-blue-400">
              OUR VISION
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              A Future Built With Imagination
            </h2>

            <p className="mt-4 leading-7 text-gray-300">
              We imagine a future where anyone can transform their ideas
              into physical products and share their creativity with the world.
            </p>
          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 text-center md:grid-cols-4">

          <div>
            <h3 className="text-3xl font-bold text-blue-600">
              500+
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Products
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">
              100+
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Customers
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">
              50+
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Custom Designs
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">
              24/7
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Support
            </p>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Designed For Creative People
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="text-3xl">
                  {feature.icon}
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-16 text-center text-white">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready To Explore Something Creative?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Discover unique products and bring your imagination to life.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-semibold text-blue-600 transition hover:scale-105"
          >
            Explore Products
          </Link>

        </div>
      </section>

    </main>
  );
}

export default About;