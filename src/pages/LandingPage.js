import React from "react";
import { TopBar } from "../components/common/TopBar";
import { NavandSearchSection } from "../components/layout/NavandSearchSection";
import { HeroImageContainer } from "../components/layout/HeroImageContainer";
import { NewArrivals } from "../components/layout/NewArrivals";
import { WeRecommendSection } from "../components/layout/WeRecommendSection";
import { TimelessClassics } from "../components/layout/TimelessClassics";
import { LatestArrivals } from "../components/layout/LatestArrivals";
import { SellerStores } from "../components/layout/SellerStores";
import FAQSection from "../components/landingPagecomponents/FAQSection";
import { ValuesSection } from "../components/landingPagecomponents/ValuesSection";
import ExpandableBrandCollections from "../components/layout/ExpandableBrandCollections";
import { Footer } from "../components/common/Footer";
import { CaptionSection } from "../components/common/CaptionSection";

export const LandingPage = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center ">
      <TopBar />
      <div className="mt-[40px] h-[650px] mb-22">
        <NavandSearchSection />
        <HeroImageContainer />
      </div>

      <div className="flex flex-col justify-center items-center">
        <NewArrivals />
        <ExpandableBrandCollections />

        <WeRecommendSection />
        {/* <TimelessClassics /> */}
        <LatestArrivals />
        <ValuesSection />
        <FAQSection />
        <SellerStores />
        {/* <Footer /> */}
      </div>
    </div>
  );
};
