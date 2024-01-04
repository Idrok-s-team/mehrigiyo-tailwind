import { FC } from 'react'

const ProductTypeCardSkeleton: FC = () => {
  return (
    <div className="w-[188px] h-[150px] animate-pulse bg-white shadow-primary rounded-2xl p-5">
      <div className="bg-gray-300 rounded w-full h-2/3"></div>
      <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  )
}

export default ProductTypeCardSkeleton
