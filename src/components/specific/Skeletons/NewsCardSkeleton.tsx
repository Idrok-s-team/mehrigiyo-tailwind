import React from 'react'

const NewsCardSkeleton = () => {
  return (
    <div className="w-[347px] h-[543px] animate-pulse flex flex-col shadow-card rounded-3xl bg-white">
      <div className="w-full h-[249px] bg-gray-300 rounded-t-3xl"></div>

      <div className="flex-1 p-5 pb-8">
        <div className="flex items-center gap-1 text-sm">
          <div className="w-20 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <div className="w-20 h-3 bg-gray-300 rounded-full"></div>
        </div>

        <div className="mt-2 h-[78%]">
          <div className="w-3/5 h-6 bg-gray-300 rounded-2xl mt-2"></div>
          <div className="w-full h-10 bg-gray-300 rounded-2xl mt-4"></div>
          <div className="w-2/5 h-10 bg-gray-300 rounded-2xl mt-2"></div>
          <div className="w-3/5 h-10 bg-gray-300 rounded-2xl mt-2"></div>
        </div>

        <div className="flex items-center gap-3 mt-3 text-sm">
          <div className="w-24 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default NewsCardSkeleton
