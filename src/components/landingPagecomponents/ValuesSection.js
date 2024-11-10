import React from "react";

export const ValuesSection = () => {
  return (
    <div className="w-full bg-black py-12 h-[631px] mt-[72px] flex flex-col items-center ">
      <div className="w-[1512px]">
        <div className="px-24 h-[69px] flex justify-between items-center">
          <div className="font-futura text-white text-6xl font-medium">
            WHAT WE STAND FOR
          </div>
          <button className="font-futura text-white text-xl font-medium border border-white rounded-full px-8 py-3 flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 group">
            READ MORE
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-1 group-hover:stroke-black"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full h-[466px] px-20 py-12  flex gap-4 justify-center items-center">
        <div className="w-[445.33px] h-[370px] p-6 flex flex-col gap-10">
          <div className="w-28 h-28 bg-lime-500">1</div>
          <div className="flex flex-col">
            <div className="font-futura text-4xl font-medium my-3 text-white">
              SNEAKERS FOR ALL
            </div>
            <div className="my-3 text-base text-slate-500 font-medium">
              Lorem ipsum dolor sit amet consectetur. Fermentum vitae posuere
              massa elementum quis. Sit in arcu fermentum ut. Lorem ipsum dolor
              sit amet Fermentum vitae posuere massa elementum quis. Sit in arcu
              fermentum ut.
            </div>
          </div>
        </div>
        <div className="w-[445.33px] h-[370px] p-6 flex flex-col gap-10">
          <div className="w-28 h-28 bg-lime-500">1</div>
          <div className="flex flex-col">
            <div className="font-futura text-4xl font-medium my-3 text-white">
              WEAR THE LOOK, NOT THE PRICE TAG
            </div>
            <div className="my-3 text-base text-slate-500 font-medium">
              Lorem ipsum dolor sit amet consectetur. Fermentum vitae posuere
              massa elementum quis. Sit in arcu fermentum ut fcscjajsfchjs
              bbdbbbbbbbbbbasbavdbsgdvsgsvcas.
            </div>
          </div>
        </div>
        <div className="w-[445.33px] h-[370px] p-6 flex flex-col gap-10">
          <div className="w-28 h-28 bg-lime-500">1</div>
          <div className="flex flex-col">
            <div className="font-futura text-4xl font-medium my-3 text-white">
              SNEAKERS FOR ALL
            </div>
            <div className="my-3 text-base text-slate-500 font-medium">
              Lorem ipsum dolor sit amet consectetur. Fermentum vitae posuere
              massa elementum quis. Sit in arcu fermentum ut. Lorem ipsum dolor
              sit amet Fermentum vitae posuere massa elementum quis. Sit in arcu
              fermentum ut.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
