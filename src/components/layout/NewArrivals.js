import React from "react";
import { ProductCard } from "../common/ProductCard";
import { NewArrivalproducts } from "../../services/products";

export const NewArrivals = () => {
  return (
    <div className="mt-40 flex flex-col gap-3">
      <div className="flex gap-2 flex-row py-[11.5px] justify-between items-center">
        <div className=" text-[40px] font-normal font-helvetica ">
          New Arrivals
        </div>
        <div className="flex flex-row gap-5  w-[227px] h-[40px] justify-between items-center ">
          <div className="font-satoshi font-normal text-[16px] rounded-4xl border py-2 px-5 border-black flex items-center w-[111px] h-[38px]">
            View ALL
          </div>
          <div className="flex gap-4">
            <div className="border rounded-3xl border-black p-3 w-[40px] h-[40px] flex items-center justify-center">
              <img
                src="/assets/icons/buttonIcon1.png"
                className=""
                alt="backwardbutton"
              />
            </div>
            <div className="border rounded-3xl border-black p-3 w-[40px] h-[40px] flex items-center justify-center">
              <img
                src="/assets/icons/buttonIcon2.png"
                className=""
                alt="forwardbutton"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NewArrivalproducts.map((NewArrivalproducts) => (
          <ProductCard
            key={NewArrivalproducts.id}
            imageUrl={NewArrivalproducts.imageUrl}
            productName={NewArrivalproducts.productName}
            price={NewArrivalproducts.price}
          />
        ))}
      </div>
    </div>
  );
};
