import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="duration-300 animate-pulse">
      <section className="w-full h-[278px] bg-gray-300 rounded-[18px]"></section>
      <section className="w-4/5 h-6 mt-4 bg-gray-300 rounded-[18px]"></section>
      <section className="w-3/5 h-6 mt-2 bg-gray-300 rounded-[18px]"></section>
      <div className="flex items-center justify-between gap-5 mt-5">
        <section className="w-3/5 h-6 mt-2 bg-gray-300 rounded-[18px]"></section>
        <section className="w-11 h-11 mt-2 bg-gray-300 rounded-2xl"></section>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
