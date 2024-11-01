import React from "react";
import { TopBar } from "../components/common/TopBar";
import { NavandSearchSection } from "../components/layout/NavandSearchSection";
import { HeroImageContainer } from "../components/layout/HeroImageContainer";
import { NewArrivals } from "../components/layout/NewArrivals";
import { WeRecommendSection } from "../components/layout/WeRecommendSection";
import { TimelessClassics } from "../components/layout/TimelessClassics";
import { LatestArrivals } from "../components/layout/LatestArrivals";
import { SellerStores } from "../components/layout/SellerStores";

export const LandingPage = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center ">
      <TopBar />
      <div className="mt-[40px] h-[750px]">
      <NavandSearchSection/>
      <HeroImageContainer/>
      </div>
      <NewArrivals/>
      <WeRecommendSection/>
      <TimelessClassics/>
      <LatestArrivals/>
      <SellerStores/>
    </div>
  );
};
