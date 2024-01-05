import { FC } from 'react'

const DoctorTypeCardSkeleton: FC = () => {
  return (
    <div className="w-[188px] h-[122px] animate-pulse bg-white shadow-primary rounded-2xl p-5 py-4 flex flex-col items-center justify-between">
      <div className="w-full flex items-center justify-center">
        <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mt-1"></div>
    </div>
  )
}

export default DoctorTypeCardSkeleton
