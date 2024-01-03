import React, { FC } from 'react'
import { ChevronIcon } from '@/assets/icons'

type Props = {
  currentPage: number
  totalCount: number
  pageSize: number
  onPageChange: (page: number) => void
}

const Pagination: FC<Props> = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize)

  const handleClick = (page: number) => {
    onPageChange(page)
  }

  const renderPageNumber = (page: number) => (
    <button
      key={page}
      className={`p-2 text-sm font-semibold relative ${
        currentPage === page
          ? "text-green-primary after:absolute after:left-0 after:-bottom-[2.5px] after:content-[''] after:rounded-sm after:w-full after:h-[3px] after:bg-green-primary"
          : ''
      } duration-200`}
      onClick={() => handleClick(page)}
    >
      {page}
    </button>
  )

  const renderEllipsis = (key: string) => (
    <span key={key} className="p-2 animate-fade-in">
      ...
    </span>
  )

  return (
    <div className="flex items-center justify-center gap-2 border-b-[0.5px] border-gray-primary">
      {currentPage !== 1 && (
        <button
          className={`p-2 rotate-90 animate-fade-in`}
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronIcon />
        </button>
      )}

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
        if (page <= 3 || page === totalPages || Math.abs(currentPage - page) <= 1) {
          return renderPageNumber(page)
        }

        if (page === 4) {
          return renderEllipsis('ellipsis_start')
        }

        if (page === totalPages - 1) {
          return renderEllipsis('ellipsis_end')
        }

        return null
      })}

      {currentPage !== totalPages && (
        <button className="p-2 -rotate-90 animate-fade-in" onClick={() => handleClick(currentPage + 1)}>
          <ChevronIcon />
        </button>
      )}
    </div>
  )
}

export default Pagination
