import React from "react";

const ProductCard = ({productName="defult_product_name", price="$00.0"}: {productName: string, price: string}) => {
  return (
    <div className="w-[320px] h-[460px] bg-white rounded-[24px] p-4 flex flex-col justify-between">

      {/* Product Image */}
      <div className="w-[288px] h-[288px] rounded-[16px] overflow-hidden">
        <img
          src="../public/641968.jpg"
          alt="Realistic Pikachu"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Name & Price */}
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] text-gray-700">
          {productName}
        </h3>

        <p className="text-[16px] font-semibold text-gray-800">
          {price}
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="flex items-center gap-[12px]">

        {/* Add to Cart */}
        <button
          className="
            w-[216px]
            h-[48px]
            rounded-[24px]
            bg-indigo-600
            text-white
            text-[16px]
            flex
            items-center
            justify-center
            hover:bg-indigo-700
            transition
          "
        >
          Add to cart
        </button>

        {/* Favorite Button */}
        <button
          className="
            w-[48px]
            h-[48px]
            rounded-full
            bg-gray-300
            flex
            items-center
            justify-center
            hover:bg-gray-400
            transition
          "
        >
          <span className="text-[24px]">
            ♡
          </span>
        </button>

      </div>
    </div>
  );
};

export default ProductCard;