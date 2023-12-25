'use client'

import { PropsWithChildren, type FC, useEffect } from 'react'
import clsx from 'clsx'
import { CloseRoundIcon } from '@/assets/icons'
import ActionButton from '../ActionButton'
import Button from '../Button'

interface IProps extends PropsWithChildren {
  buttonText?: string
  isOpen: boolean
  onSubmit: () => void
  onClose: () => void
}

const Drawer: FC<IProps> = ({ children, isOpen, onClose, onSubmit, buttonText = 'Tasdiqlash' }) => {
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

  const closeDrawer = () => {
    onClose()
  }

  const backdropClasses = clsx('fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300', {
    'opacity-0 pointer-events-none': !isOpen,
    'opacity-100': isOpen,
  })

  const drawerClasses = clsx(
    'flex flex-col justify-between fixed bottom-0 left-0 right-0 z-40 w-full px-12 py-10 overflow-x-hidden overflow-y-auto transition-transform duration-200 bg-white h-[80vh] rounded-t-[30px]',
    {
      'translate-y-0': isOpen,
      'translate-y-full': !isOpen,
    },
  )

  return (
    <>
      {isOpen && <div className={backdropClasses} onClick={closeDrawer}></div>}

      <div id="drawer-bottom-example" className={drawerClasses} tabIndex={-1} aria-labelledby="drawer-bottom-label">
        <header className="flex justify-end">
          <ActionButton onClick={closeDrawer}>
            <CloseRoundIcon />
          </ActionButton>
        </header>

        <main className="overflow-auto flex-1">{children}</main>

        <footer className="flex justify-end pt-5">
          <div className="w-48">
            <Button onClick={onSubmit}>{buttonText}</Button>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Drawer
