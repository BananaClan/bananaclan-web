import React from 'react'

export const ProductCard = ({ imageUrl, productName, price,width = 318, height = 425 }) => {
  // Calculate image height (80% of total height)
  const imageHeight = Math.round(height * 0.8);
  
  // Calculate content height (20% of total height)
  const contentHeight = height - imageHeight;
  return (
    <div className={`py-4`} style={{ width: `${width}px`, height: `${height}px` }}>
     <img src={imageUrl} alt={productName} className="object-cover w-full" style={{ height: `${imageHeight}px` }}  />
     <div className='p-4 flex gap-3 justify-between' style={{ height: `${contentHeight}px` }}>
     <div>
       <h2 className="font-satoshi text-base font-medium mb-2">{productName}</h2>
       <p className="font-helvetica font-medium text-[20px] leading-7 ">{price}</p>
       </div>
       <div className=' flex items-center justify-center'>
        <div className='w-8 h-8 rounded-full border border-blue-700 flex items-center justify-center'>
<p>{'>'}</p>
        </div>
       </div>
      </div>
      
    </div>
  )
}
