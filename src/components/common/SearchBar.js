import React from 'react'
import CartDrawer from './CartDrawer'

export const SearchBar = () => {
  return (
    <div className='flex flex-row w-full justify-between items-center h-[62.3px]'>
        <div className='font-bebasNeue font-normal text-[30.726px]'>
          <div>NON</div>
          <div>ORIGINALS</div>
        </div> 



        <div className='px-4 py-2 h-[34px] rounded-[32px] bg-zinc-100 flex items-center justify-start w-[374px] '>
            <div className='flex flex-row gap-3'>
            <div className='flex items-center justify-center' ><img src="/assets/icons/searchicon.svg" className='' alt='search'/></div>
            <div  className='font-satoshi font-normal text-base text-[#8A8A8A] '>Search for your dunks </div>
            </div>
        </div>


        <div className='flex flex-row gap-2 items-center justify-center'>

        {/* <img src="/assets/icons/GroupIcon.svg" className="rounded-full w-10 h-10 border p-1 border-black"  alt="GroupIcon" /> */}

        <CartDrawer/>
        <img src="/assets/icons/usericon.svg" className="rounded-full w-8 h-8"  alt="User" />

 

        </div>

    </div>
  )
}
