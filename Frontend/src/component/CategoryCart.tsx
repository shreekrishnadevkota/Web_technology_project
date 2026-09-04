import React from 'react'
import { Link } from "react-router-dom";

const CategoryCart = () => {
  return (
    <section className="mx-auto max-w-7xl  py-10 sm:px-8 lg:px-10">

        


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
  )

  
}


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

export default CategoryCart