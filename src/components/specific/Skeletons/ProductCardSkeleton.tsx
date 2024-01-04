import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="w-[240px] h-[378px] animate-pulse bg-white border border-[#E2E2E2] shadow-secondary rounded-[18px] p-3.5">
      <section className="h-[175px] bg-gray-300 rounded-t-[14px]"></section>

      <section className="mt-3 h-[60px]">
        <div className="w-4/5 h-6 bg-gray-300 rounded-[14px]"></div>
        <div className="w-3/5 h-6 mt-2 bg-gray-300 rounded-[14px]"></div>
      </section>

      <div className="flex items-center justify-between mt-5">
        <section className="w-3/5 h-6 bg-gray-300 rounded-[14px]"></section>
        <section className="w-11 h-11 bg-gray-300 rounded-2xl"></section>
      </div>

      <section className="flex items-center justify-center text-[#BDBDBD] mt-3">
        <div className="w-24 h-3 bg-gray-300 rounded-full"></div>
      </section>
    </div>
  )
}

export default ProductCardSkeleton
