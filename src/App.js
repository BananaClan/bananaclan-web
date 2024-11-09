import React from "react";
import ExpandableBrandCollections from "./ExpandableBrandCollections";
import FAQSection from "./FaqComponent";
import ProfileDrawer from "./ProfileDrawer";
import CartDrawer from "./CartDrawer";

function App() {
  return (
    <div className="App w-full min-h-screen">
      <ProfileDrawer />
      <CartDrawer />
      <ExpandableBrandCollections />
      <FAQSection />
    </div>
  );
}

export default App;
