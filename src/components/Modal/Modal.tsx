'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useEventListener } from 'usehooks-ts'
import { CloseRoundIcon } from '@/assets/icons'
import Button from '../Button'

interface IProps extends React.PropsWithChildren {
  isOpen: boolean
  disabled?: boolean
  buttonText?: string
  onSubmit: () => void
  onClose: () => void
}

const Modal: React.FC<IProps> = ({
  isOpen,
  onSubmit,
  onClose,
  disabled = false,
  buttonText = 'Tizimga kirish',
  children,
}) => {
  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onClose()
    }
  })

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
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-gray-600 bg-opacity-50 animate-fade-in">
      <div className="w-[536px] min-h-[100px] flex flex-col gap-5 justify-between p-5 bg-white rounded-3xl animate-scale-in pb-[50px]">
        <header className="flex justify-end">
          <button onClick={onClose} aria-label="Close modal">
            <CloseRoundIcon width={30} height={30} />
          </button>
        </header>
        <main>{children}</main>
        <footer className='mt-4'>
          <Button onClick={onSubmit} disabled={disabled} type='submit'>
            {buttonText}
          </Button>
        </footer>
      </div>
    </div>,
    modalRoot,
  )
}

export default Modal
