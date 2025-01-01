import React from "react";

import NavBar from "./NavBar";

export const SearchBar = () => {
  return (
    <div className="flex flex-row w-full justify-between items-center h-[62.3px]">
      <NavBar></NavBar>

      <div className="flex flex-row gap-2 items-center justify-center">
        {/* <img src="/assets/icons/GroupIcon.svg" className="rounded-full w-10 h-10 border p-1 border-black"  alt="GroupIcon" /> */}
      </div>
    </div>
  );
};
