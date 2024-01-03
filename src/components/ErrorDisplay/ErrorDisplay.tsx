import React from 'react'
import { WarningIcon } from '@/assets/icons'

const ErrorDisplay = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <WarningIcon />
      </div>
      <p className="mt-2 text-gray-primary">Nimadur xato bo'ldi. Iltimos sahifani yangilang!</p>
    </div>
  )
}

export default ErrorDisplay
