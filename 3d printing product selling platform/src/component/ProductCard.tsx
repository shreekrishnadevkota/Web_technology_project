import React from "react";
import Btn from "./button";

const ProductCard = () => {
  return (
    <div>
      <div className="bg-[#FFFFFF] flex flex-col justify-between h-[460px] w-[320px] rounded-3xl px-4 py-4">
        <div className="bg-gray-500 h-[288px] w-[288px] rounded-2xl ">
          <figure>
            <img src="" alt="" />
          </figure>
        </div>
        <div className="flex justify-between">
          <div>relastic pickachu</div>
          <div>Rs.100</div>
        </div>
        <div className="flex justify-between">
          <Btn btnTitle="Add to cart"/>
          <Btn/>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
