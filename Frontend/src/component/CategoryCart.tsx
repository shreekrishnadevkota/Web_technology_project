import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { HomeIcon, AccessoryIcon, FigureIcon, OfficeIcon, ArrowRightIcon } from "./Icons";

const CategoryCart = () => {
  return (
    <section className="mx-auto max-w-7xl  py-10 sm:px-8 lg:px-10">

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          <CategoryCard
            title="Home & Decor"
            icon={<HomeIcon className="h-6 w-6" />}
          />

          <CategoryCard
            title="Accessories"
            icon={<AccessoryIcon className="h-6 w-6" />}
          />

          <CategoryCard
            title="Figures & Toys"
            icon={<FigureIcon className="h-6 w-6" />}
          />

          <CategoryCard
            title="Office"
            icon={<OfficeIcon className="h-6 w-6" />}
          />

        </div>

      </section>
  )


}


function CategoryCard({
  title,
  icon,
}: {
  title: string;
  icon: ReactNode;
}) {

  return (

    <Link
      to={`/shop?category=${encodeURIComponent(title)}`}
      className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-bold sm:text-base">
        {title}
      </h3>

      <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
        Explore products <ArrowRightIcon className="h-3 w-3" />
      </p>

    </Link>

  );
}

export default CategoryCart;
