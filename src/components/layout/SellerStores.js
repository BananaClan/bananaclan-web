import React from 'react'
import SlidingCards from '../common/SlidingCards'
import { SellerStoresCollection } from '../../services/products'


export const SellerStores = () => {
  return (
<div className='mx-24 w-[1320px] h-[598px] mt-[72px] mb-4 flex flex-col gap-3'>
<SlidingCards
        name="Sellers"
        cardData={SellerStoresCollection}
        cardWidth="327.94px"
        cardHeight="520px"
      />

    </div>
  )
}
