import React from 'react'
import { FlagUzIcon } from '@/assets/icons'

const useLanguageItems = () => {
  const languageItems = [
    {
      label: (
        <div className="flex items-center gap-3">
          <span>
            <FlagUzIcon />
          </span>
          <span>Uzbek</span>
        </div>
      ),
      id: 'uz',
      selected: true,
    },
  ]

  return languageItems
}

export default useLanguageItems
