import React from "react";
import { ClerkProvider ,SignedIn,SignedOut} from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import SellerProfilePage from "./pages/SellerProfilePage";
import ProductDetailPage from "./pages/Sneaker Marketplace Product Detail Page";
import BagPage from "./pages/BagPage";
import ShippingPage from "./pages/ShippingPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import { Footer } from "./components/common/Footer";
import { CartProvider } from "./context/CartContext";
import OrderConfirmation from "./pages/OrderConfirmation";
import NavBar from "./components/common/NavBar";

import AuthPage from "./pages/AuthPage";

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
                <Route path="/productdetail" element={<ProductDetailPage />} />
                <Route path="/auth" element={<AuthPage />} />

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
