import React from 'react'
import { CaptionSection } from '../common/CaptionSection'

export const HeroImageContainer = () => {
  return (<>
    <div className='relative  bg-black'>
           <img src="/assets/images/HeroImageNew.png" className="flex object-cover mt-[30.67px] w-full" alt="Hero" />
           <div class="absolute inset-0 flex items-end justify-center">
    <h1 class="text-white font-bebasNeue text-[171.876px] font-normal"><p >NON ORIGINALS</p></h1>
   </div>


    </div>
    <CaptionSection/>
    </>
  )
}
