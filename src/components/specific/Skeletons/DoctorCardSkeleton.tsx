import { FC } from 'react'

const DoctorCardSkeleton: FC = () => {
  return (
    <div className="w-[200px] h-[250px] animate-pulse bg-white border border-[#E2E2E2] shadow-secondary rounded-[18px] p-4">
      <div className="flex items-start justify-between">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
      <div className="mt-2.5 h-[60px]">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>
      <div className="mt-1">
        <div className="h-10 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  )
}

export default DoctorCardSkeleton
