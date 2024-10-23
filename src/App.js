import React from "react";
import ExpandableBrandCollections from "./ExpandableBrandCollections";
import FAQSection from "./FaqComponent";

function App() {
  return (
    <div className="App w-full min-h-screen">
      <ExpandableBrandCollections />
      <FAQSection />
    </div>
  );
}

export default App;
