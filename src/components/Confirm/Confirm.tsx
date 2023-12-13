'use client'

import React, { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CloseRoundIcon } from '@/assets/icons'
import Button from '../Button'

interface IConfirmProps {
  isOpen: boolean
  disabled?: boolean
  confirmText?: string
  submitButtonText?: string
  onSubmit: () => void
  onClose: () => void
}

const Confirm: FC<IConfirmProps> = ({
  confirmText = "O'chirishga ishonchingiz komilmi?",
  isOpen,
  disabled,
  submitButtonText = 'Tasdiqlash',
  onSubmit,
  onClose,
}) => {
  useEffect(() => {
    const body = document.body
    const originalStyle = window.getComputedStyle(body).overflow

    if (isOpen) {
      body.style.overflow = 'hidden'
    }

    return () => {
      body.style.overflow = originalStyle
    }
  }, [isOpen])

  if (!isOpen) return null

  const modalRoot = document.body

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-gray-600 bg-opacity-50 animate-fade-in">
      <div className="p-4 bg-white rounded-lg animate-scale-in shadow-primary">
        <section className="flex items-center justify-between gap-10 whitespace-nowrap">
          <h6 className="font-medium">{confirmText}</h6>
          <button onClick={onClose} aria-label="Close modal">
            <CloseRoundIcon width={30} height={30} />
          </button>
        </section>
        <section className="flex justify-end">
          <div className="flex mt-7 gap-2">
            <Button
              onClick={onClose}
              size="sm"
              disabled={disabled}
              className="text-sm !text-black mr-2 px-4 py-2 !bg-gray-primary/40 hover:bg-gray-primary"
            >
              Bekor qilish
            </Button>
            <Button onClick={onSubmit} size="sm" className="text-sm" disabled={disabled}>
              {submitButtonText}
            </Button>
          </div>
        </section>
      </div>
    </div>,
    modalRoot,
  )

  // return (
  //   <div className="relative flex items-center">
  //     <div onClick={() => setShow(true)}>{children}</div>
  //     {show && (
  //       <div className="absolute w-auto top-full left-0 p-4 bg-white rounded-lg animate-scale-in shadow-primary">
  //         <div className="flex items-center justify-between gap-10 whitespace-nowrap">
  //           <h6 className="font-medium">{confirmText}</h6>
  //           <button onClick={handleClose} aria-label="Close modal">
  //             <CloseRoundIcon width={30} height={30} />
  //           </button>
  //         </div>
  //         <div className="flex justify-end">
  //           <div className="flex mt-7 gap-2">
  //             <Button
  //               onClick={handleClose}
  //               size="sm"
  //               className="whitespace-nowrap text-sm !text-black mr-2 px-4 py-2 !bg-gray-primary/40 hover:bg-gray-primary"
  //             >
  //               Bekor qilish
  //             </Button>
  //             <Button onClick={handleSubmit} size="sm" className="text-sm">
  //               Tasdiqlash
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // )
}

export default Confirm
