import React, { FC } from 'react'

const Loader: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-b-2 rounded-full border-green-primary animate-spin"></div>
    </div>
  )
}

export default Loader
