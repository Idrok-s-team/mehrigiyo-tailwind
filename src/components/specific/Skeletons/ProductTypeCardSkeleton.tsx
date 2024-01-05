import { FC } from 'react'

const ProductTypeCardSkeleton: FC = () => {
  return (
    <div className="w-[188px] h-[150px] animate-pulse bg-white shadow-primary rounded-2xl p-4 flex flex-col justify-between">
      <div className="bg-gray-300 rounded-lg h-2/3 mb-4"></div>
      <div className="bg-gray-300 rounded h-6 w-3/4"></div>
    </div>
  )
}

export default ProductTypeCardSkeleton
