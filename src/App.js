import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
// import SellerProfilePage from "./pages/SellerProfilePage";
import ProductDetailPage from "./pages/Sneaker Marketplace Product Detail Page";
import BagPage from "./pages/BagPage";
import ShippingPage from "./pages/ShippingPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import { Footer } from "./components/common/Footer";
import { CartProvider } from "./context/CartContext";
import OrderConfirmation from "./pages/OrderConfirmation";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
              <Route path="/porductdetail" element={<ProductDetailPage />} />
          
              <Route path="/" element={<LandingPage />} />
              <Route path="/bag" element={<BagPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route
                path="/order-conformation"
                element={<OrderConfirmation />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;