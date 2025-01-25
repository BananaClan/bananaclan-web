import React, { useState } from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { AnimatePresence } from "framer-motion";
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
import LoginModal from "./components/common/LoginModal";
import LoadingPage from "./pages/LoadingPage";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    console.error("Missing Publishable Key");
    return null;
  }

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <CartProvider>
          <AnimatePresence>
            {isLoading && (
              <LoadingPage
                onLoadingComplete={() => {
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 100);
                }}
              />
            )}
          </AnimatePresence>
          {!isLoading && (
            <>
              <NavBar />
              <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
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
              </div>
            </>
          )}
        </CartProvider>
      </Router>
    </ClerkProvider>
  );
};

export default App;
