'use client'

import React, { FC, PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useEventListener } from 'usehooks-ts'
import clsx from 'clsx'
import { CloseRoundIcon } from '@/assets/icons'
import Button from '../Button'

interface IProps extends PropsWithChildren {
  isOpen: boolean
  disabled?: boolean
  buttonText?: string
  closeText?: string | null
  onSubmit: () => void
  onClose: () => void
  className?: string
}

const Modal: FC<IProps> = ({
  isOpen,
  onSubmit,
  onClose,
  disabled = false,
  closeText = null,
  buttonText = 'Tizimga kirish',
  children,
  className,
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

  const modalClasses = clsx(
    'w-[536px] min-h-[100px] flex flex-col gap-5 justify-between p-5 bg-white rounded-3xl animate-scale-in pb-[50px]',
    className,
  )

  return createPortal(
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-gray-600 bg-opacity-50 animate-fade-in">
      <div className={modalClasses}>
        <header className="flex justify-end">
          <button onClick={onClose} aria-label="Close modal">
            <CloseRoundIcon width={30} height={30} />
          </button>
        </header>
        <main>{children}</main>
        <footer className="mt-4 flex gap-5">
          {closeText && (
            <Button onClick={onClose} disabled={disabled} type="button" buttonType="secondary">
              {closeText}
            </Button>
          )}
          <Button onClick={onSubmit} disabled={disabled} type="submit">
            {buttonText}
          </Button>
        </footer>
      </div>
    </div>,
    modalRoot,
  )
}

export default Modal
