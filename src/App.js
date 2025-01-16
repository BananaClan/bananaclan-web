import React from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import SellerProfilePage from "./pages/SellerProfilePage";
import ProductDetailPage from "./pages/ProductDetailsPage";
import BagPage from "./pages/BagPage";
import ShippingPage from "./pages/ShippingPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import { Footer } from "./components/common/Footer";
import { CartProvider } from "./context/CartContext";
import OrderConfirmation from "./pages/OrderConfirmation";
import NavBar from "./components/common/NavBar";

import AuthPage from "./pages/AuthPage";
import MobileProductDetailPage from "./pages/MBProductDeatailsPage";
import ProductListingPage from "./pages/ProductListingPage";

const App = () => {
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    console.error("Missing Publishable Key");
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <CartProvider>
          <NavBar />
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              <Routes>
                {/* Public routes that don't require authentication */}
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/" element={<ProductListingPage />} /> */}

                {/* <Route path="/productdetail" element={<ProductDetailPage />} /> */}
                <Route path="/auth" element={<AuthPage />} />

                {/* Update the product detail route to accept an ID parameter */}
                <Route
                  path="/product/:productId"
                  element={
                    window.innerWidth <= 440 && window.innerWidth >= 320 ? (
                      <MobileProductDetailPage />
                    ) : (
                      <ProductDetailPage />
                    )
                  }
                />

                {/* Protected routes that require authentication */}
                <Route
                  path="/bag"
                  element={
                    <SignedIn>
                      <BagPage />
                    </SignedIn>
                  }
                />
                <Route
                  path="/shipping"
                  element={
                    <SignedIn>
                      <ShippingPage />
                    </SignedIn>
                  }
                />
                <Route
                  path="/order-success"
                  element={
                    <SignedIn>
                      <OrderSuccessPage />
                    </SignedIn>
                  }
                />
                <Route
                  path="/order-confirmation"
                  element={
                    <SignedIn>
                      <OrderConfirmation />
                    </SignedIn>
                  }
                />
              </Routes>
            </main>
            {/* <Footer /> */}
          </div>
        </CartProvider>
      </Router>
    </ClerkProvider>
  );
};

export default App;
