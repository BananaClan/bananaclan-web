import React from 'react'
import { WeRecommendedProducts } from '../../services/products';
import { ProductCard } from '../common/ProductCard';

export const WeRecommendSection = () => {
  return (
    <div className='mx-24 w-[1320px]  min-h-[578px] mt-[72px] flex flex-col gap-3'>
        <div className='flex gap-2 flex-row py-[11.5px] justify-between items-center'>
        <div className=' text-[40px] font-normal font-helvetica '>We Recommend</div>

            <div className='flex flex-row gap-5 w-[227px] h-[40px] items-end justify-end '>
                <div className='font-satoshi font-normal text-[16px] rounded-4xl border py-2 px-5 border-black flex items-center w-[111px] h-[38px]'>View ALL</div>
            
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {WeRecommendedProducts.map((WeRecommendedProducts) => (
        <ProductCard
          key={WeRecommendedProducts.id}
          imageUrl={WeRecommendedProducts.imageUrl}
          productName={WeRecommendedProducts.productName}
          price={WeRecommendedProducts.price}
        />
      ))}
    </div>

        </div>
  )
}
