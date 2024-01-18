// SortOptions.tsx
import React from 'react'
import { sortOptions } from '@/constants'
import { SortCriteriaType } from '@/types'

interface SortOptionsProps {
  sortCriteria: SortCriteriaType
  setSortCriteria: (sortCriteria: SortCriteriaType) => void
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortCriteria, setSortCriteria }) => {
  return (
    <nav className="flex gap-5 my-3">
      <span className="text-sm">Saralash:</span>
      <ul className="flex items-center gap-5 flex-wrap">
        {sortOptions.map(({ label, value }, i) => (
          <li
            key={label}
            className={`text-sm cursor-pointer text-gray-primary duration-200 ${
              sortCriteria === value ? 'text-green-primary underline font-medium' : ''
            }`}
            onClick={() => setSortCriteria(value)}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SortOptions
