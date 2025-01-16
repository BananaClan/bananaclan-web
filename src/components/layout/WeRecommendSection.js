import React, { useState, useEffect } from "react";
import { ProductCard } from "../common/ProductCard";
import { productApi } from "../../api/productApi";

export const WeRecommendSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getRecommendedProducts(8);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mx-24 w-[1320px] min-h-[578px] mt-[72px] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="mx-24 w-[1320px] min-h-[578px] mt-[72px] flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }
  return (
    <div className="mx-24 w-[1320px] h-fit min-h-[528px] mt-[72px] flex flex-col gap-3">
      <div className="flex relative gap-2  flex-row py-[11.5px] justify-between items-center">
        <div className=" text-[40px] font-normal font-helvetica leading-[46px]">
          We Recommend
        </div>

        <div className="flex flex-row gap-5 w-[227px] h-[40px] items-end justify-end ">
          <button className="font-satoshi font-normal text-black hover:text-white text-base leading-[21.6px] rounded-4xl border py-2 px-5 border-black hover:bg-black transition-colors duration-300 flex items-center w-28 h-[38px]">
            View ALL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            productId={product._id}
            imageUrl={product.imageUrls[0].url}
            productName={product.name}
            price={`₹ ${product.price}`}
            storeName={product.seller?.name || "v2shoestore"} // Add seller name if available
          />
        ))}
      </div>
    </div>
  );
};
