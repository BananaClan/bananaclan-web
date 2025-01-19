import React, { useState, useEffect } from "react";
import { TopBar } from "../components/common/TopBar";
import { ProductCard } from "../components/common/ProductCard";
import { productApi } from "../api/productApi";
import ProductListingHeader from "../components/common/ProductListingHeader";
import Pagination from "../components/common/Pagination";
import { ProductSlider } from "../components/common/ProductSlider";
import { NewArrivalproducts } from "../services/products";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Lowest Price");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getLatestArrivals(30);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    // Implement sorting logic here
    const sortedProducts = [...products];
    switch (newSort) {
      case "Lowest Price":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "Highest Price":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of product grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <div className="min-h-screen bg-white flex flex-col justify-center items-center pt-20">
      <div className="px-6 lg:px-24 xl:px-0 max-w-[1512px] mx-auto">
        <ProductListingHeader
          totalProducts={products.length}
          onSortChange={handleSortChange}
        />
        <div className=" flex items-center justify-center py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {currentProducts.map((product) => (
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
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
        {/* Recently Viewed */}
                <section className="mt-20 max-w-[1320px] w-full mx-auto">
                  <ProductSlider
                    sectionTitle="Recently Viewed"
                    products={NewArrivalproducts}
                    viewAllLink="/new-arrivals"
                  />
                </section>
    </div>
  );
};
export default ProductListingPage;
