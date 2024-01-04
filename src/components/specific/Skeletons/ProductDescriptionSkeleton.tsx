import { FC } from 'react'

const ProductDescriptionSkeleton: FC = () => {
  return (
    <div className="animate-pulse">
      <div className="flex gap-10">
        <div className="w-2/5 h-[550px] bg-gray-300 rounded-lg"></div>
        <div className="flex-1 space-y-6">
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="flex justify-between">
            <div className="h-12 bg-gray-300 rounded w-1/2"></div>
            <div className="space-x-4 flex">
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-300 rounded w-32"></div>
            <div className="flex items-center gap-2">
              <div className="h-10 bg-gray-300 rounded w-24"></div>
              <div className="h-10 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
          <div className="h-32 bg-gray-300 rounded"></div>
          <div className="flex justify-end">
            <div className="w-56 h-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDescriptionSkeleton
