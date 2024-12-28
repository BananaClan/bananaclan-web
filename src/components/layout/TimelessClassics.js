import React from 'react'

import { TimelessClassicsProducts } from '../../services/products';
import SlidingCards from '../common/SlidingCards';



export const TimelessClassics = () => {
  return (
<div className='mx-24 w-[1320px] h-[726px] mt-[72px] mb-4 flex flex-col gap-3'>
      
      <SlidingCards
        name="Timeless Classics"
        cardData={TimelessClassicsProducts}
        cardWidth="327.94px"
        cardHeight="520px"
      />

    </div>
  )
}
